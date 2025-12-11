
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 889, hash: '45291c8a28b290bb23ff3a4f84601c8ec42056f52587754ebf54864e29490563', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1001, hash: 'e44572d13967028fce7f062c0bdc3bdc2392116132a1c19a3f5fbc61943543f2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 8158, hash: '18461485cdba8e9e56a84dcef3b1c69c5c08f70131d098f997325051ce84f4cb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ZT36SWQW.css': {size: 2868, hash: 'pc5HZjyL6tQ', text: () => import('./assets-chunks/styles-ZT36SWQW_css.mjs').then(m => m.default)}
  },
};
