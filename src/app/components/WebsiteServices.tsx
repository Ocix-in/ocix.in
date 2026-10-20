import { ServiceBell } from './ServiceBell';

export function WebsiteServices() {
  return <article className="website-services">
    <section className="service-hero wrap" aria-labelledby="service-title">
      <div className="service-words">
        <p className="eyebrow service-eyebrow"><ServiceBell id="service-eyebrow"/>Made to order</p>
        <h1 id="service-title">A better website<br/>for your <em>business.</em></h1>
        <p className="service-lead">Your first website. Or a fresh start for the one you have.</p>
        <p className="service-intro">We design and build websites for local businesses. A little personality, clear information and an easy way for your next customer to get in touch.</p>
        <div className="service-choices" aria-label="What would you like to make?">
          <a className="neu" href="#enquiry" data-website-kind="new"><span aria-hidden="true">＋</span>Build a new website</a>
          <a className="neu" href="#enquiry" data-website-kind="refresh"><span aria-hidden="true">↻</span>Refresh my website</a>
        </div>
        <div className="service-actions"><a className="pop pop-amber" href="#enquiry">Discuss my website <span aria-hidden="true">→</span></a><a className="service-text-link" href="#how-it-works">See how it works <span aria-hidden="true">↘</span></a></div>
      </div>
      <figure className="service-art">
        <picture className="service-shop"><source type="image/avif" srcSet="/assets/services/shop.avif 768w, /assets/services/shop@2x.avif 1536w" sizes="(max-width:600px) calc(100vw - 32px), 50vw"/><img src="/assets/services/shop.webp" srcSet="/assets/services/shop.webp 768w, /assets/services/shop@2x.webp 1536w" sizes="(max-width:600px) calc(100vw - 32px), 50vw" width="768" height="512" fetchPriority="high" alt="A miniature shop with a teal awning, its website on a computer and phone, and a service bell."/></picture>
        <div className="service-chef" aria-hidden="true"><picture><source type="image/avif" srcSet="/assets/kitchen/chef.avif 600w, /assets/kitchen/chef@2x.avif 1200w" sizes="(max-width:600px) 45vw, 24vw"/><img src="/assets/kitchen/chef.webp" srcSet="/assets/kitchen/chef.webp 600w, /assets/kitchen/chef@2x.webp 1200w" sizes="(max-width:600px) 45vw, 24vw" width="600" height="700" alt=""/></picture><img className="service-chef-mark" src="/assets/ocix-badge.webp" width="56" height="56" alt=""/></div>
        <figcaption className="eyebrow">From our kitchen to your corner of the world.</figcaption>
      </figure>
    </section>

    <section id="how-it-works" className="service-process wrap neu-in" aria-label="How your website comes together">
      <ol>{[['Tell us about your business','What you do, who you help and what your website needs to do.'],['Review your design','We agree the scope and quote, then shape a design with your feedback.'],['Go live','We build, check it on phones and desktops, and help you launch.']].map(([title,body],i)=><li key={title}><span className="service-step neu">0{i+1}</span><div><h2>{title}</h2><p>{body}</p></div></li>)}</ol>
    </section>

    <section className="service-details wrap" aria-labelledby="service-details-title">
      <div><p className="eyebrow">Useful, with a little personality</p><h2 id="service-details-title">Your business.<br/><em>Easy to find. Easy to know.</em></h2><p>For shops, cafés, studios and other local businesses. We’ll work out what belongs on your site together.</p></div>
      <ul className="service-features">
        <li><span aria-hidden="true">01</span><div><h3>Made for phones, too</h3><p>A clear, comfortable experience on the screen your customers have with them.</p></div></li>
        <li><span aria-hidden="true">02</span><div><h3>The details that matter</h3><p>Your services, photos, opening hours and location, presented with care.</p></div></li>
        <li><span aria-hidden="true">03</span><div><h3>A simple way to get in touch</h3><p>Calls, email or an enquiry. We’ll choose what works for your business.</p></div></li>
      </ul>
    </section>

    <section id="enquiry" className="service-enquiry wrap" aria-labelledby="enquiry-title">
      <div className="enquiry-words"><p className="eyebrow">Let’s make something good</p><h2 id="enquiry-title">What’s your<br/><em>order?</em></h2><p>Tell us a little about your business and the website you have in mind. We’ll start with a conversation.</p><p>Each project is different. We’ll agree the work, price and timing with you before building.</p><a className="service-email" href="mailto:support@ocix.in">support@ocix.in <span aria-hidden="true">↗</span></a><p className="enquiry-note">The form prepares an email draft. You review and send it from your email app.</p></div>
      <form className="website-enquiry neu" action="mailto:support@ocix.in" method="post" encType="text/plain" data-website-enquiry>
        <fieldset><legend>I’d like to…</legend><div className="enquiry-types"><label><input type="radio" name="project" value="new" defaultChecked/><span>Build a new website</span></label><label><input type="radio" name="project" value="refresh"/><span>Refresh my website</span></label></div></fieldset>
        <div className="enquiry-fields"><label>Business name<input id="business-name" name="business" autoComplete="organization" required maxLength={100} placeholder="Your business"/></label><label>Your email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></label><label className="enquiry-wide">Current website <small>(optional)</small><input name="website" type="url" autoComplete="url" maxLength={300} placeholder="https://your-website.com"/></label><label className="enquiry-wide">What would you like your website to do?<textarea name="details" required rows={4} maxLength={1200} placeholder="Tell us what you do, what you’d like to show and how customers should contact you."/></label></div>
        <p className="enquiry-help">All fields except the current website are required. Your details stay in this page until you choose to email them.</p>
        <button className="pop pop-amber" type="submit">Prepare email enquiry <span aria-hidden="true">→</span></button>
        <noscript><p>You can email your project details directly to <a href="mailto:support@ocix.in">support@ocix.in</a>.</p></noscript>
        <div className="enquiry-draft" hidden>
          <h3 tabIndex={-1}>Your enquiry is ready.</h3><p>Open the draft in your email app, review it and send it to OCIX. You can also copy it below.</p>
          <a className="pop" data-enquiry-email href="mailto:support@ocix.in">Open email draft <span aria-hidden="true">↗</span></a>
          <label>Enquiry text<textarea data-enquiry-text readOnly rows={8}/></label>
          <button className="neu enquiry-copy" data-enquiry-copy type="button">Copy enquiry</button><p className="enquiry-status" role="status" aria-live="polite"/>
        </div>
      </form>
    </section>
  </article>;
}
