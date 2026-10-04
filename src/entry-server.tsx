import { renderToString } from 'react-dom/server';
import App from './app/App';
export { pages } from './app/pages';
export { articles } from './app/content';
export function render(path: string) { return renderToString(<App path={path}/>); }
