import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App';
import {setPath} from './lib/router';
import './index.css';

// The scroll-driven heroes depend on scroll position; always start at the top.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Render the page the URL names, so hydration matches the prerendered HTML.
setPath(window.location.pathname);

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build ships prerendered HTML per page (for search engines
// and a fast first paint); hydrate it. In dev the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
