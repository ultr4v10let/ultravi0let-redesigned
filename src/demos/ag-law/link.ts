/* Spread on every in-demo <Link>. TanStack's default marks a link to /demos/ag-law as the current page on every page
   below it (a prefix match), so Practice, Insights and the brand were all announced as "current" on the attorneys
   page, and it adds an unprefixed "active" class. Next's <Link> did neither: here a link is current only on its own
   page and anchor, and gets no class. */
export const exact = { activeOptions: { exact: true, includeHash: true }, activeProps: {} } as const
