import { useState } from 'react'

export type PhotoVariant =
  | 'terminal'
  | 'lumen'
  | 'blueprint'
  | 'atelier'
  | 'clinical'
  | 'scholar'

/* Per-variant classes live in facet.css: facet-photo-*, facet-initial-*, facet-glabel-*, facet-ggrid-*, facet-gcell-*. */

export function ProfilePhoto({
  src,
  name,
  variant,
  className = '',
}: {
  src: string
  name: string
  variant: PhotoVariant
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const initial = name.trim().charAt(0).toUpperCase() || '?'

  if (!src.trim() || failed) {
    return (
      <div className={`facet-initial-${variant} ${className}`}>{initial}</div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      width={112}
      height={112}
      loading="lazy"
      decoding="async"
      className={`facet-photo-${variant} ${className}`}
      style={{ color: 'transparent' }}
      onError={() => setFailed(true)}
    />
  )
}

export function PhotoGallery({
  urls,
  variant,
  label = 'Gallery',
}: {
  urls: string[]
  variant: PhotoVariant
  label?: string
}) {
  const photos = urls.map((u) => u.trim()).filter(Boolean)
  if (!photos.length) return null

  const prefix = variant === 'terminal' ? '$ ls ./gallery' : null

  return (
    <div>
      {prefix ? (
        <p className={`facet-glabel-${variant}`}>{prefix}</p>
      ) : (
        <p className={`facet-glabel-${variant}`}>{label}</p>
      )}
      <div className={`facet-ggrid-${variant}`}>
        {photos.map((url, i) => (
          <GalleryImage
            key={`${url}-${i}`}
            url={url}
            alt={`${label} ${i + 1}`}
            className={`facet-gcell-${variant}`}
          />
        ))}
      </div>
    </div>
  )
}

function GalleryImage({
  url,
  alt,
  className,
}: {
  url: string
  alt: string
  className: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={`${className} facet-gcell-failed`}>—</div>
  }

  return (
    <div className={className}>
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="facet-gimg"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
