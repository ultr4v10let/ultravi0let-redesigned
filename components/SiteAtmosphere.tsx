export function SiteAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="uv-orb uv-orb-a animate-drift-1" />
      <div className="uv-orb uv-orb-b animate-drift-2" />
      <div className="uv-orb uv-orb-c animate-drift-3" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,rgba(109,40,217,0.16),transparent_58%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-[radial-gradient(ellipse_75%_55%_at_50%_100%,rgba(167,139,250,0.14),transparent_68%)]" />
    </div>
  );
}
