import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';
import {setPath} from './lib/router';

/** Used by scripts/prerender.mjs to bake each page into its own HTML file. */
export function render(path: string) {
  setPath(path);
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export {routes, notFound} from './routes';
export {pageSchema} from './schema';
export {site} from './content';
