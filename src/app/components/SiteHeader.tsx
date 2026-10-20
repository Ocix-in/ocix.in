const links = [['/blog','Recipes'],['/tools','Free tastings'],['/services/websites','For businesses'],['/about','The cook']];
export function SiteHeader({ home = false, path = '/' }: { home?: boolean; path?:string }) {
  return <header className="site-header">
    <a className="brand neu" href="/" aria-label="OCIX home"><img src="/assets/ocix-logo.webp" alt="OCIX" width="188" height="96" /></a>
    <nav className="desktop-nav neu" aria-label="Primary navigation">{links.map(([href,label])=><a href={href} key={href} aria-current={path===href?'page':undefined}>{label}</a>)}</nav>
    {home ? <span className="kitchen-open neu-in"><i className="dot"/>Kitchen open</span> : <a className="back neu" href="/">← Back to the kitchen</a>}
    <details className="mobile-menu"><summary className="neu" aria-label="Open kitchen menu"><span aria-hidden="true">☰</span></summary><nav className="glass" aria-label="Mobile navigation">{links.map(([href,label])=><a href={href} key={href} aria-current={path===href?'page':undefined}>{label}</a>)}<a href="/contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav></details>
  </header>;
}
