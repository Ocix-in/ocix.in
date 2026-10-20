const links = [['/blog','Recipes'],['/tools','Free tastings'],['/services/websites','For businesses'],['/about','The cook']];
function NavLink({href,label,path}:{href:string;label:string;path:string}){
  const active=path===href||path.startsWith(`${href}/`);
  return <a href={active?'/':href} data-current-page={active||undefined} aria-label={active?`${label} is open. Return to the kitchen.`:undefined} title={active?'Return to the kitchen':undefined}>{label}{active&&<span className="nav-return" aria-hidden="true">↩</span>}</a>;
}
export function SiteHeader({ home = false, path = '/' }: { home?: boolean; path?:string }) {
  return <header className="site-header">
    <div className="header-brand"><a className="brand neu" href="/" aria-label="OCIX home"><img src="/assets/ocix-logo.webp" alt="OCIX" width="188" height="96" /></a>{!home&&<a className="kitchen-back neu" href="/" aria-label="Back to the kitchen" title="Back to the kitchen"><span aria-hidden="true">←</span></a>}</div>
    <nav className="desktop-nav neu" aria-label="Primary navigation">{links.map(([href,label])=><NavLink href={href} label={label} path={path} key={href}/>)}</nav>
    {home&&<span className="kitchen-open neu-in"><i className="dot"/>Kitchen open</span>}
    {path==='/services/websites'&&<a className="kitchen-open order-status neu-in" href="#enquiry" data-service-open="enquiry" aria-haspopup="dialog" aria-label="Taking orders. Discuss your website."><i className="dot"/><span><span className="order-long">Taking </span>orders</span><span className="order-arrow" aria-hidden="true">↗</span></a>}
    <details className="mobile-menu"><summary className="neu" aria-label="Open kitchen menu"><span aria-hidden="true">☰</span></summary><nav className="glass" aria-label="Mobile navigation">{[...links,['/contact','Contact'],['/privacy','Privacy'],['/terms','Terms']].map(([href,label])=><NavLink href={href} label={label} path={path} key={href}/>)}</nav></details>
  </header>;
}
