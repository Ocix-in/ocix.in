import { SiteHeader } from './components/SiteHeader';
import { ChefGuide } from './components/ChefGuide';
import { Footer } from './components/Footer';
import { PageContent } from './pages';
import { KitchenHome } from './components/Kitchen';
import '../styles/kitchen.css';

export default function App({ path = '/' }: { path?: string }) {
  return <div className={`kitchen-site ${path === '/' ? 'home-page' : ''}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    <SiteHeader home={path === '/'} />
    <main id="main">{path === '/' ? <KitchenHome/> : <PageContent path={path}/>}</main>
    <Footer/>
    <ChefGuide/>
  </div>;
}
