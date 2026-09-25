import { ExternalLink } from 'lucide-react'
import type { FacetPortfolio } from './facet'
import { FACET_FIELD_CONFIG, FACET_THEMES } from './facet'
import { PhotoGallery, ProfilePhoto } from './PortfolioImages'
import { Github, Linkedin } from './icons'

function splitLines(value?: string) {
  return (value ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

function externalUrl(value: string) {
  const v = value.trim()
  if (!v) return '#'
  return v.startsWith('http') ? v : `https://${v}`
}

type FieldDef = (typeof FACET_FIELD_CONFIG)[keyof typeof FACET_FIELD_CONFIG]['fields'][number]

type TemplateProps = { data: FacetPortfolio; fieldLabel: string; themeName: string }

export function PortfolioPreview({ data }: { data: FacetPortfolio }) {
  const fieldLabel = FACET_FIELD_CONFIG[data.field].label
  const themeName = FACET_THEMES[data.field].find((t) => t.id === data.theme)?.name ?? ''

  if (data.field === 'cs') {
    return data.theme === 'a' ? (
      <CsTerminal data={data} fieldLabel={fieldLabel} themeName={themeName} />
    ) : (
      <CsLumen data={data} fieldLabel={fieldLabel} themeName={themeName} />
    )
  }
  if (data.field === 'architecture') {
    return data.theme === 'a' ? (
      <ArchBlueprint data={data} fieldLabel={fieldLabel} themeName={themeName} />
    ) : (
      <ArchAtelier data={data} fieldLabel={fieldLabel} themeName={themeName} />
    )
  }
  return data.theme === 'a' ? (
    <MedClinical data={data} fieldLabel={fieldLabel} themeName={themeName} />
  ) : (
    <MedScholar data={data} fieldLabel={fieldLabel} themeName={themeName} />
  )
}

function MetaBar({
  fieldLabel,
  themeName,
  className = '',
}: {
  fieldLabel: string
  themeName: string
  className?: string
}) {
  return (
    <div className={`facet-meta ${className}`}>
      {fieldLabel} · {themeName} template
    </div>
  )
}

/* ─── Computer Science · Terminal ─────────────────────────────────────────── */

function CsTerminal({ data, fieldLabel, themeName }: TemplateProps) {
  const fields = FACET_FIELD_CONFIG.cs.fields

  return (
    <div className="facet-t-root">
      <div className="facet-t-bar">
        <div className="facet-t-dots">
          <span className="facet-t-dot facet-t-dot-rose" />
          <span className="facet-t-dot facet-t-dot-amber" />
          <span className="facet-t-dot facet-t-dot-emerald" />
        </div>
      </div>
      <div className="facet-pp-wrap">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} className="facet-t-meta" />
        <div className="facet-t-head">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="terminal" />
          <div className="facet-grow">
            <p className="facet-t-green">$ whoami</p>
            <h1 className="facet-t-name">{data.name}</h1>
            <p className="facet-t-headline">{data.headline}</p>
          </div>
        </div>
        <p className="facet-t-bio">{data.bio}</p>
        <div className="facet-mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="terminal" />
        </div>

        <div className="facet-t-fields">
          {fields.map((field) => (
            <CsTerminalField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CsTerminalField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null

  if (field.key === 'github' || field.key === 'linkedin') {
    const Icon = field.key === 'github' ? Github : Linkedin
    return (
      <div>
        <p className="facet-t-green">$ open {field.key}</p>
        <a href={externalUrl(value)} className="facet-t-link">
          <Icon size={14} /> {value}
        </a>
      </div>
    )
  }

  if (field.key === 'languages') {
    const langs = value
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean)
    return (
      <div>
        <p className="facet-t-green">$ cat languages.txt</p>
        <div className="facet-t-langs">
          {langs.map((l) => (
            <span key={l} className="facet-t-chip">
              {l}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (field.key === 'projects') {
    const lines = splitLines(value)
    return (
      <div>
        <p className="facet-t-green">$ ls ./projects</p>
        <ul className="facet-t-projects">
          {lines.map((p) => (
            <li key={p} className="facet-t-project">
              {p}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="facet-t-other">
      <p className="facet-t-green"># {field.label}</p>
      <p className="facet-t-other-val">{value}</p>
    </div>
  )
}

/* ─── Computer Science · Lumen ──────────────────────────────────────────── */

function CsLumen({ data, fieldLabel, themeName }: TemplateProps) {
  const fields = FACET_FIELD_CONFIG.cs.fields

  return (
    <div className="facet-l-root" style={{ fontFamily: 'var(--facet-sans)' }}>
      <div className="facet-pp-wrap">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} />
        <div className="facet-pp-head facet-mt-6">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="lumen" />
          <div className="facet-grow">
            <h1 className="facet-l-name" style={{ fontFamily: 'var(--facet-display)' }}>
              {data.name}
            </h1>
            <p className="facet-l-headline">{data.headline}</p>
          </div>
        </div>
        <p className="facet-l-bio">{data.bio}</p>
        <div className="facet-mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="lumen" label="Gallery" />
        </div>

        <div className="facet-l-fields">
          {fields.map((field) => (
            <CsLumenField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CsLumenField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null

  if (field.key === 'github' || field.key === 'linkedin') {
    return (
      <div>
        <h2 className="facet-l-h2">{field.label}</h2>
        <a href={externalUrl(value)} className="facet-l-link">
          {value}
        </a>
      </div>
    )
  }

  if (field.key === 'languages') {
    const langs = value
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean)
    return (
      <div>
        <h2 className="facet-l-h2">{field.label}</h2>
        <div className="facet-l-langs">
          {langs.map((l) => (
            <span key={l} className="facet-l-chip">
              {l}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (field.key === 'projects') {
    const lines = splitLines(value)
    return (
      <div>
        <h2 className="facet-l-h2">{field.label}</h2>
        <div className="facet-l-projects">
          {lines.map((p, i) => (
            <div key={p} className="facet-l-card">
              <div className="facet-l-num">0{i + 1}</div>
              <p className="facet-l-card-text">{p}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="facet-l-h2">{field.label}</h2>
      <p className="facet-l-other">{value}</p>
    </div>
  )
}

/* ─── Architecture · Blueprint ────────────────────────────────────────── */

function ArchBlueprint({ data, fieldLabel, themeName }: TemplateProps) {
  const fields = FACET_FIELD_CONFIG.architecture.fields

  return (
    <div
      className="facet-b-root"
      style={{
        background: '#1E3A5F',
        backgroundImage:
          'linear-gradient(rgba(147,197,253,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="facet-pp-wrap">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} className="facet-b-meta" />
        <div className="facet-pp-head facet-mt-8">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="blueprint" />
          <div className="facet-grow">
            <h1 className="facet-b-name" style={{ fontFamily: 'var(--facet-display)' }}>
              {data.name}
            </h1>
            <p className="facet-b-headline">{data.headline}</p>
          </div>
        </div>
        <p className="facet-b-bio">{data.bio}</p>
        <div className="facet-mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="blueprint" label="Project imagery" />
        </div>

        <div className="facet-b-fields">
          {fields.map((field) => (
            <ArchBlueprintField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ArchBlueprintField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null

  if (field.type === 'url') {
    return (
      <div className="facet-b-box">
        <div className="facet-b-label">{field.label}</div>
        <span className="facet-b-url">
          <ExternalLink size={14} /> {value}
        </span>
      </div>
    )
  }

  if (field.key === 'projects') {
    const lines = splitLines(value)
    return (
      <div className="facet-b-projects">
        <div className="facet-b-label">{field.label}</div>
        {lines.map((p, i) => (
          <div key={p} className="facet-b-sheet">
            <div className="facet-b-sheet-num">Sheet {String(i + 1).padStart(2, '0')}</div>
            <p className="facet-b-sheet-text">{p}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="facet-b-box">
      <div className="facet-b-label">{field.label}</div>
      <p className="facet-b-val">{value}</p>
    </div>
  )
}

/* ─── Architecture · Atelier ──────────────────────────────────────────── */

function ArchAtelier({ data, fieldLabel, themeName }: TemplateProps) {
  const fields = FACET_FIELD_CONFIG.architecture.fields

  return (
    <div className="facet-a-root" style={{ fontFamily: 'var(--facet-display)' }}>
      <div className="facet-a-wrap">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} />
        <div className="facet-a-head">
          <ProfilePhoto
            src={data.profilePhoto}
            name={data.name}
            variant="atelier"
            className="facet-shrink-0"
          />
          <div className="facet-a-headtext">
            <h1 className="facet-a-name">{data.name}</h1>
            <p className="facet-a-headline">{data.headline}</p>
          </div>
        </div>
        <p className="facet-a-bio">{data.bio}</p>
        <div className="facet-mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="atelier" label="Selected work" />
        </div>

        <div className="facet-a-fields">
          {fields.map((field) => (
            <ArchAtelierField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ArchAtelierField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null

  if (field.key === 'projects') {
    const lines = splitLines(value)
    return (
      <div>
        <p className="facet-a-label">{field.label}</p>
        <div className="facet-a-projects">
          {lines.map((p) => (
            <article key={p} className="facet-a-article">
              <p className="facet-a-article-text">{p}</p>
            </article>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="facet-a-label">{field.label}</p>
      <p className="facet-a-val">{value}</p>
    </div>
  )
}

/* ─── Medical · Clinical ────────────────────────────────────────────────── */

function MedClinical({ data, fieldLabel, themeName }: TemplateProps) {
  const fields = FACET_FIELD_CONFIG.medical.fields

  return (
    <div className="facet-c-root" style={{ fontFamily: 'var(--facet-sans)' }}>
      <div className="facet-c-top">
        <div className="facet-c-top-in">
          <div className="facet-c-row">
            <ProfilePhoto src={data.profilePhoto} name={data.name} variant="clinical" />
            <div className="facet-grow">
              <h1 className="facet-c-name">{data.name}</h1>
              <p className="facet-c-headline">{data.headline}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="facet-c-body">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} />
        <p className="facet-c-bio">{data.bio}</p>
        <div className="facet-mt-8">
          <PhotoGallery urls={data.galleryPhotos} variant="clinical" label="Practice & environment" />
        </div>

        <div className="facet-c-fields">
          {fields.map((field) => (
            <MedClinicalField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function MedClinicalField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null

  if (field.type === 'textarea') {
    const lines = splitLines(value)
    return (
      <section className="facet-c-card">
        <h2 className="facet-c-h2">{field.label}</h2>
        <ul className="facet-c-list">
          {lines.map((line) => (
            <li key={line} className="facet-c-li">
              <span className="facet-c-check">✓</span> {line}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section className="facet-c-card">
      <h2 className="facet-c-h2">{field.label}</h2>
      <p className="facet-c-val">{value}</p>
    </section>
  )
}

/* ─── Medical · Scholar ─────────────────────────────────────────────────── */

function MedScholar({ data, fieldLabel, themeName }: TemplateProps) {
  const fields = FACET_FIELD_CONFIG.medical.fields

  return (
    <div className="facet-s-root" style={{ fontFamily: 'var(--facet-display)' }}>
      <div className="facet-s-wrap">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} className="facet-s-meta" />
        <p className="facet-s-cv">Curriculum vitae</p>
        <div className="facet-pp-head facet-mt-6">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="scholar" />
          <div className="facet-grow">
            <h1 className="facet-s-name">{data.name}</h1>
            <p className="facet-s-headline">{data.headline}</p>
          </div>
        </div>
        <p className="facet-s-bio">{data.bio}</p>
        <div className="facet-mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="scholar" label="Clinical photography" />
        </div>

        <div className="facet-s-fields">
          {fields.map((field) => (
            <MedScholarField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function MedScholarField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null

  if (field.type === 'textarea') {
    const lines = splitLines(value)
    const List = field.key === 'publications' ? 'ol' : 'ul'
    return (
      <div className="facet-s-block">
        <h2 className="facet-s-h2">{field.label}</h2>
        <List className={`facet-s-list ${List === 'ol' ? 'facet-s-ol' : ''}`}>
          {lines.map((line) => (
            <li key={line} className="facet-lh-relaxed">
              {line}
            </li>
          ))}
        </List>
      </div>
    )
  }

  return (
    <div className="facet-s-box">
      <h2 className="facet-s-h2">{field.label}</h2>
      <p className="facet-s-val">{value}</p>
    </div>
  )
}
