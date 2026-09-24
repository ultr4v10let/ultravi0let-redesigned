import { Fragment } from 'react'

/* Headings in content.json mark their light-weight words as [light]...[/light]. */
export function Rich({ text }: { text: string }) {
  return text.split(/\[light\](.*?)\[\/light\]/).map((part, i) =>
    i % 2 ? <span key={i} className="light">{part}</span> : <Fragment key={i}>{part}</Fragment>,
  )
}
