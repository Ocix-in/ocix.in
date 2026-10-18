import { articles } from '../content';

const noteTitle=(title:string)=>title.split(':')[0].split('?')[0]+(title.includes('?')?'?':'');

// Both views share the same fridge, note order and placement. Only the close-up has links.
export function RecipeFridge({ miniature = false }: { miniature?: boolean }) {
  return <div className={`recipe-fridge ${miniature ? 'fridge-miniature' : 'fridge-closeup'}`} style={miniature ? undefined : {viewTransitionName:'fridge'}}>
    <picture className="fridge-art"><source type="image/avif" srcSet="/assets/kitchen/scene-fridge.avif 1x, /assets/kitchen/scene-fridge@2x.avif 2x"/><img src="/assets/kitchen/scene-fridge.webp" srcSet="/assets/kitchen/scene-fridge.webp 1x, /assets/kitchen/scene-fridge@2x.webp 2x" alt={miniature ? '' : 'The kitchen’s navy fridge, with a brass handle, lower freezer drawer and colourful recipe notes on its glass door'} width="197" height="415" fetchPriority="high"/></picture>
    <div className="fridge-notes" aria-hidden={miniature || undefined}>{articles.map(item=>miniature ? <span className="sticky-note" key={item.slug}>{noteTitle(item.title)}</span> : <a className="sticky-note" data-article-open aria-label={item.title} href={`/blog/${item.slug}`} key={item.slug}><h2>{noteTitle(item.title)}</h2></a>)}</div>
  </div>;
}

export function ArticleDialog(){return <dialog id="recipe-reader" className="article-dialog" aria-labelledby="reader-title"><div className="reader-paper"><header className="reader-toolbar"><span className="eyebrow">From the OCIX recipe fridge</span><button className="reader-close neu" type="button" data-dialog-close aria-label="Close article">×</button></header><div className="reader-content"><h2 id="reader-title">Opening the recipe…</h2></div></div></dialog>}
