import { ScriptOnce } from '@tanstack/react-router'
import { ui } from '../content/content'

/* The sun/moon switch (BEHAVIOUR §1). The prerendered HTML is the light state; an inline script after the menu sets
   the real state before first paint (see ThemeSync), and motion/theme.ts owns it from then on. */
export function ThemeSwitch({ id }: { id: string }) {
  return (
    <button id={id} className="switch" type="button" role="switch" aria-checked="false" aria-label={ui.switchToDark} suppressHydrationWarning>
      <span className="sw-track"><span className="sw-stars" /><span className="sw-line" /></span>
      <span className="sw-knob"><span className="sw-ring" /></span>
    </button>
  )
}

/* Runs during parsing, right after both switches exist, so a dark visitor never sees the light switch flip. */
const SYNC = `(function(){var k=document.documentElement.getAttribute('data-theme')==='dark';document.querySelectorAll('.switch').forEach(function(s){s.setAttribute('aria-checked',k?'true':'false');s.setAttribute('aria-label',k?${JSON.stringify(ui.switchToLight)}:${JSON.stringify(ui.switchToDark)})})})()`

export function ThemeSync() {
  return <ScriptOnce>{SYNC}</ScriptOnce>
}
