import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_oXj0jx-I.mjs';
import { manifest } from './manifest_bquXvcwd.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/christmas-order.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/api/order.astro.mjs');
const _page4 = () => import('./pages/cookie-policy.astro.mjs');
const _page5 = () => import('./pages/offerte-natale.astro.mjs');
const _page6 = () => import('./pages/politica-di-cancellazione.astro.mjs');
const _page7 = () => import('./pages/privacy-policy.astro.mjs');
const _page8 = () => import('./pages/terms-of-service.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/christmas-order.js", _page1],
    ["src/pages/api/contact.js", _page2],
    ["src/pages/api/order.js", _page3],
    ["src/pages/cookie-policy.astro", _page4],
    ["src/pages/offerte-natale.astro", _page5],
    ["src/pages/politica-di-cancellazione.astro", _page6],
    ["src/pages/privacy-policy.astro", _page7],
    ["src/pages/terms-of-service.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "64079283-9782-45e2-9dd8-b202683c1e3b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
