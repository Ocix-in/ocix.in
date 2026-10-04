import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

const root = document.getElementById('root')!;
const path = window.location.pathname.replace(/\/+$/, '') || '/';
const app = <App path={path}/>;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
