import { ImagePlus, Upload, X } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { FACET_IMAGE_ACCEPT, FacetImageError, processImageFile } from './facet-images'
import { FACET_SHELL } from './facet-shell'

type ShellProps = {
  border?: string
  paper?: string
  ink?: string
  inkMuted?: string
  accent?: string
}

function useImageUpload(
  onChange: (dataUrl: string) => void,
  options: { maxWidth: number; maxHeight: number },
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function openPicker() {
    if (!busy) inputRef.current?.click()
  }

  async function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const dataUrl = await processImageFile(file, options)
      onChange(dataUrl)
    } catch (err) {
      setError(err instanceof FacetImageError ? err.message : 'Upload failed. Try another image.')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  /* The visible buttons open the file inputs, so the inputs stay out of the tab order (not in the original). */
  const input = (
    <input
      ref={inputRef}
      type="file"
      aria-label="Upload profile photo"
      tabIndex={-1}
      accept={FACET_IMAGE_ACCEPT}
      className="facet-sr-only"
      onChange={(e) => void handleFiles(e.target.files)}
    />
  )

  return { inputRef, input, openPicker, busy, error, setError, handleFiles }
}

export function ProfileImageUploader({
  value,
  onChange,
  name,
  shell = FACET_SHELL,
}: {
  value: string
  onChange: (dataUrl: string) => void
  name: string
  shell?: ShellProps
}) {
  const hintId = useId()
  const { input, openPicker, busy, error } = useImageUpload(onChange, {
    maxWidth: 512,
    maxHeight: 512,
  })

  const initial = name.trim().charAt(0).toUpperCase() || '?'

  return (
    <div className="facet-mt-2">
      {input}
      <button
        type="button"
        onClick={openPicker}
        disabled={busy}
        aria-describedby={hintId}
        className="facet-profile-upload"
        style={{ borderColor: shell.border, background: shell.paper }}
      >
        {value.trim() ? (
          <>
            <img src={value} alt="Profile" className="facet-cover" />
            <span className="facet-upload-overlay">
              <Upload size={18} className="facet-text-white" />
              <span className="facet-upload-overlay-text">
                {busy ? 'Uploading…' : 'Change'}
              </span>
            </span>
          </>
        ) : (
          <span className="facet-upload-empty">
            <span
              className="facet-upload-initial"
              style={{ background: `${shell.accent}18`, color: shell.accent }}
            >
              {initial}
            </span>
            <span className="facet-upload-cta" style={{ color: shell.inkMuted }}>
              <ImagePlus size={12} />
              {busy ? 'Uploading…' : 'Upload photo'}
            </span>
          </span>
        )}
      </button>
      <p id={hintId} className="facet-hint" style={{ color: shell.inkMuted }}>
        Click to upload · JPG, PNG, WebP, GIF & other images
      </p>
      {error ? <p className="facet-hint-error">{error}</p> : null}
    </div>
  )
}

export function GalleryImageUploader({
  values,
  onChange,
  maxPhotos = 6,
  shell = FACET_SHELL,
}: {
  values: string[]
  onChange: (photos: string[]) => void
  maxPhotos?: number
  shell?: ShellProps
}) {
  const addInputRef = useRef<HTMLInputElement>(null)
  const replaceInputRef = useRef<HTMLInputElement>(null)
  const replaceIndexRef = useRef<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function ingest(file: File, index?: number) {
    setBusy(true)
    setError(null)
    try {
      const dataUrl = await processImageFile(file, { maxWidth: 1200, maxHeight: 900 })
      if (index === undefined) {
        onChange([...values, dataUrl])
      } else {
        const next = [...values]
        next[index] = dataUrl
        onChange(next)
      }
    } catch (err) {
      setError(err instanceof FacetImageError ? err.message : 'Upload failed. Try another image.')
    } finally {
      setBusy(false)
      if (addInputRef.current) addInputRef.current.value = ''
      if (replaceInputRef.current) replaceInputRef.current.value = ''
      replaceIndexRef.current = null
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div className="facet-mt-2">
      <input
        ref={addInputRef}
        type="file"
        aria-label="Add gallery photo"
        tabIndex={-1}
        accept={FACET_IMAGE_ACCEPT}
        className="facet-sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void ingest(file)
        }}
      />
      <input
        ref={replaceInputRef}
        type="file"
        aria-label="Replace gallery photo"
        tabIndex={-1}
        accept={FACET_IMAGE_ACCEPT}
        className="facet-sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          const index = replaceIndexRef.current
          if (file && index !== null) void ingest(file, index)
        }}
      />

      <div className="facet-gallery-grid">
        {values.map((src, i) => (
          <div
            key={`${i}-${src.slice(0, 24)}`}
            className="facet-gallery-cell"
            style={{ borderColor: shell.border }}
          >
            <button
              type="button"
              onClick={() => {
                replaceIndexRef.current = i
                replaceInputRef.current?.click()
              }}
              disabled={busy}
              className="facet-fill"
              aria-label={`Replace gallery image ${i + 1}`}
            >
              <img src={src} alt={`Gallery ${i + 1}`} className="facet-cover" />
              <span className="facet-gallery-overlay">
                <Upload size={16} className="facet-text-white" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="facet-gallery-remove"
              aria-label={`Remove gallery image ${i + 1}`}
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {values.length < maxPhotos ? (
          <button
            type="button"
            onClick={() => addInputRef.current?.click()}
            disabled={busy}
            className="facet-gallery-add"
            style={{ borderColor: shell.border, color: shell.inkMuted, background: shell.paper }}
          >
            <ImagePlus size={18} style={{ color: shell.accent }} />
            {busy ? 'Uploading…' : 'Add photo'}
          </button>
        ) : null}
      </div>

      <p className="facet-hint" style={{ color: shell.inkMuted }}>
        Click a photo to replace it · up to {maxPhotos} images
      </p>
      {error ? <p className="facet-hint-error">{error}</p> : null}
    </div>
  )
}
