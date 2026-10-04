import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Tools } from './components/Tools';
import { HowItWorks } from './components/HowItWorks';
import { TrustClarity } from './components/TrustClarity';
import { LeadCapture } from './components/LeadCapture';
import { SiteHeader } from './components/SiteHeader';
import { Footer } from './components/Footer';
import { PageContent } from './pages';
import { Analytics } from '@vercel/analytics/react';
import '../styles/studio.css';

export default function App({ path = '/' }: { path?: string }) {
  return <div className="studio">
    <a href="#main" className="skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main">{path === '/' ? <><Hero/><Products/><Tools/><HowItWorks/><TrustClarity/><LeadCapture/></> : <PageContent path={path}/>}</main>
    <Footer/><Analytics/>
  </div>;
}
