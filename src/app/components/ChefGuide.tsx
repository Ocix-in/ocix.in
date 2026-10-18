export function ChefGuide(){return <aside className="chef-guide" aria-label="Chef OCIX’s kitchen guide">
  <div id="chef-welcome" popover="auto" role="dialog" aria-labelledby="chef-welcome-title">
    <header><span className="eyebrow">Chef OCIX</span><button className="guide-close neu" type="button" popoverTarget="chef-welcome" popoverTargetAction="hide" aria-label="Close chef’s greeting">×</button></header>
    <h2 id="chef-welcome-title" data-chef-greeting>Hello there!</h2>
    <p>Welcome to the kitchen. Looking for something to try? Vigilante is ready to be served.</p><p>Turn your real GitHub work into a little world to rebuild.</p>
    <a className="pop pop-amber" href="/products/vigilante">Taste Vigilante →</a><a className="guide-recipes" href="/blog">Or pick a recipe from the fridge ↗</a>
  </div>
  <button className="chef-launcher neu" type="button" popoverTarget="chef-welcome" aria-label="Open Chef OCIX’s welcome"><span className="chef-avatar"><img src="/assets/kitchen/home-chef-head.webp" alt="" width="110" height="129"/></span><span className="guide-dot" aria-hidden="true"/></button>
 </aside>}
