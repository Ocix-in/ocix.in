import type { CSSProperties } from 'react';
import { articles } from '../content';

const shortTitles:Record<string,string>={
 'building-in-public-from-india':'Building in public',
 'read-your-contribution-graph':'Your GitHub graph',
 'solo-side-project-production-lessons':'Production lessons',
 'daily-commit-target':'Daily coding targets',
 'designing-a-game-economy-that-cant-be-bought':'A game money can’t buy',
 'charging-in-rupees-and-dollars':'Rupees & dollars',
 'accountability-systems-compared':'Habit systems',
 'streaks-without-burnout':'Streaks without burnout',
};
const noteTitle=(item:typeof articles[number])=>shortTitles[item.slug] || item.title.split(':')[0];
// A seeded shuffle gives 28 small-note spaces. Both views keep the same scattered layout.
let seed=73;
const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const slots=Array.from({length:28},(_,i)=>i);
for(let i=slots.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[slots[i],slots[j]]=[slots[j],slots[i]]}
const noteStyles=slots.map(slot=>({
 left:`${1+(slot%4)*24.5+random()*.8}%`,
 top:`${1+Math.floor(slot/4)*13.9+random()*1.2}%`,
 '--note-angle':`${random()*14-7}deg`,
 '--note-width':`${21+random()*1.5}%`,
} as CSSProperties));

// Both views share the same fridge, note order and placement. Only the close-up has links.
export function RecipeFridge({ miniature = false }: { miniature?: boolean }) {
  return <div className={`recipe-fridge ${miniature ? 'fridge-miniature' : 'fridge-closeup'}`} style={miniature ? undefined : {viewTransitionName:'fridge'}}>
    <picture className="fridge-art"><source type="image/avif" srcSet="/assets/kitchen/scene-fridge.avif 1x, /assets/kitchen/scene-fridge@2x.avif 2x"/><img src="/assets/kitchen/scene-fridge.webp" srcSet="/assets/kitchen/scene-fridge.webp 1x, /assets/kitchen/scene-fridge@2x.webp 2x" alt={miniature ? '' : 'The kitchen’s navy fridge, with a brass handle, lower freezer drawer and colourful recipe notes on its glass door'} width="197" height="415" fetchPriority="high"/></picture>
    <div className="fridge-notes" aria-hidden={miniature || undefined}>{articles.map((item,index)=>miniature ? <span className="sticky-note" style={noteStyles[index%noteStyles.length]} key={item.slug}>{noteTitle(item)}</span> : <a className="sticky-note" style={noteStyles[index%noteStyles.length]} data-article-open aria-label={item.title} href={`/blog/${item.slug}`} key={item.slug}><h2>{noteTitle(item)}</h2></a>)}</div>
  </div>;
}

export function ArticleDialog(){return <dialog id="recipe-reader" className="article-dialog" aria-labelledby="reader-title"><div className="reader-paper"><header className="reader-toolbar"><span className="eyebrow">From the OCIX recipe fridge</span><button className="reader-close neu" type="button" data-dialog-close aria-label="Close article">×</button></header><div className="reader-content"><h2 id="reader-title">Opening the recipe…</h2></div></div></dialog>}
