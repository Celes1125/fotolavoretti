import { p as decodeKey } from './chunks/astro/server_B6nVsnRH.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DYwwRZdF.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/cheche/fotolavoretti/fotolavoretti_astro/","cacheDir":"file:///home/cheche/fotolavoretti/fotolavoretti_astro/node_modules/.astro/","outDir":"file:///home/cheche/fotolavoretti/fotolavoretti_astro/dist/","srcDir":"file:///home/cheche/fotolavoretti/fotolavoretti_astro/src/","publicDir":"file:///home/cheche/fotolavoretti/fotolavoretti_astro/public/","buildClientDir":"file:///home/cheche/fotolavoretti/fotolavoretti_astro/dist/client/","buildServerDir":"file:///home/cheche/fotolavoretti/fotolavoretti_astro/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"cookie-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cookie-policy","isIndex":false,"type":"page","pattern":"^\\/cookie-policy\\/?$","segments":[[{"content":"cookie-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookie-policy.astro","pathname":"/cookie-policy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"offerte-natale/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/offerte-natale","isIndex":false,"type":"page","pattern":"^\\/offerte-natale\\/?$","segments":[[{"content":"offerte-natale","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/offerte-natale.astro","pathname":"/offerte-natale","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"politica-di-cancellazione/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/politica-di-cancellazione","isIndex":false,"type":"page","pattern":"^\\/politica-di-cancellazione\\/?$","segments":[[{"content":"politica-di-cancellazione","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politica-di-cancellazione.astro","pathname":"/politica-di-cancellazione","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"terms-of-service/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms-of-service","isIndex":false,"type":"page","pattern":"^\\/terms-of-service\\/?$","segments":[[{"content":"terms-of-service","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-of-service.astro","pathname":"/terms-of-service","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/christmas-order","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/christmas-order\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"christmas-order","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/christmas-order.js","pathname":"/api/christmas-order","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.js","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/order","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/order\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"order","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/order.js","pathname":"/api/order","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/cheche/fotolavoretti/fotolavoretti_astro/src/pages/cookie-policy.astro",{"propagation":"none","containsHead":true}],["/home/cheche/fotolavoretti/fotolavoretti_astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/cheche/fotolavoretti/fotolavoretti_astro/src/pages/offerte-natale.astro",{"propagation":"none","containsHead":true}],["/home/cheche/fotolavoretti/fotolavoretti_astro/src/pages/politica-di-cancellazione.astro",{"propagation":"none","containsHead":true}],["/home/cheche/fotolavoretti/fotolavoretti_astro/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["/home/cheche/fotolavoretti/fotolavoretti_astro/src/pages/terms-of-service.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/christmas-order@_@js":"pages/api/christmas-order.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@js":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/api/order@_@js":"pages/api/order.astro.mjs","\u0000@astro-page:src/pages/cookie-policy@_@astro":"pages/cookie-policy.astro.mjs","\u0000@astro-page:src/pages/offerte-natale@_@astro":"pages/offerte-natale.astro.mjs","\u0000@astro-page:src/pages/politica-di-cancellazione@_@astro":"pages/politica-di-cancellazione.astro.mjs","\u0000@astro-page:src/pages/privacy-policy@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/terms-of-service@_@astro":"pages/terms-of-service.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_bquXvcwd.mjs","/home/cheche/fotolavoretti/fotolavoretti_astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B9jw4fRk.mjs","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/forms/ChristmasOrderModal.jsx":"_astro/ChristmasOrderModal.BsdeCZ00.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/Header.jsx":"_astro/Header.D5hXbBwt.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/HeroCta.jsx":"_astro/HeroCta.mpj3GZQC.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/product-description/ProductDescription.jsx":"_astro/ProductDescription.wxG5WwJv.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/pricing-packages/PricingPackages.jsx":"_astro/PricingPackages.DLb2TsZr.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/pricing-animations/PricingAnimations.jsx":"_astro/PricingAnimations.hZZFWAQ1.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/how-it-works/HowItWorks.jsx":"_astro/HowItWorks.DCBN_haV.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/faqs/Faqs.jsx":"_astro/Faqs.BCQdu_8A.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/components/PromoModal.jsx":"_astro/PromoModal.C-7verRg.js","@astrojs/react/client.js":"_astro/client.BLUn-lwI.js","/home/cheche/fotolavoretti/fotolavoretti_astro/src/pages/offerte-natale.astro?astro&type=script&index=0&lang.ts":"_astro/offerte-natale.astro_astro_type_script_index_0_lang.BkJlNUM5.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/cheche/fotolavoretti/fotolavoretti_astro/src/pages/offerte-natale.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{document.querySelectorAll(\".cta-button[data-option]\").forEach(t=>{t.addEventListener(\"click\",o=>{o.preventDefault();const e=t.getAttribute(\"data-option\");console.log(`Dispatching event to open modal with option: ${e}`);const n=new CustomEvent(\"open-christmas-modal\",{detail:{option:e}});document.dispatchEvent(n)})})});"]],"assets":["/_astro/index.6sPIu11n.css","/_astro/offerte-natale.1Sq61QCU.css","/Gemini_Generated_Image_mamma_lavoretti_hero.png","/favicon.svg","/fotolavoretti_logo.png","/fotolavoretti_logo_natale.png","/hero.png","/hero.svg","/ig_qr.png","/informativa_GDPR_privacy_fotolavoretti.pdf","/informativa_GDPR_privacy_fotolavorettixxxx.pdf","/logo.png","/logo_natale.png","/mariposa-hero.jpg","/mariposa_hero.png","/paleta.png","/_astro/ChristmasOrderModal.BsdeCZ00.js","/_astro/Faqs.BCQdu_8A.js","/_astro/Header.D5hXbBwt.js","/_astro/HeroCta.mpj3GZQC.js","/_astro/HowItWorks.DCBN_haV.js","/_astro/OrderForm.BQsnuMTf.js","/_astro/PricingAnimations.hZZFWAQ1.js","/_astro/PricingPackages.DLb2TsZr.js","/_astro/ProductDescription.wxG5WwJv.js","/_astro/PromoModal.C-7verRg.js","/_astro/StatusModal.zePiLQSc.js","/_astro/client.BLUn-lwI.js","/_astro/index.95d291e9.BJ_AU6VS.js","/_astro/index.B9z3ExMt.css","/_astro/index.CJRLnpko.css","/_astro/index.Cd_vQiNd.js","/_astro/index.d28d83c9.BrITZ4Q6.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/offerte-natale.W1tk7DGp.css","/_astro/offerte-natale.af13c06a.A_yy_1WP.js","/gallery/001.jpg","/gallery/002.jpg","/gallery/003.jpg","/gallery/004.jpg","/gallery/005.jpg","/gallery/006.jpg","/gallery/007.jpg","/gallery/008.jpg","/gallery/009.jpg","/gallery/010.jpg","/gallery/011.jpg","/gallery/012.jpg","/gallery/013.jpg","/gallery/014.jpg","/gallery/015.jpg","/gallery/016.jpg","/gallery/017.jpg","/gallery/018.jpg","/gallery/019.jpg","/gallery/020.jpg","/videos/animation-custom.webm","/videos/animation-standard.webm","/cookie-policy/index.html","/offerte-natale/index.html","/politica-di-cancellazione/index.html","/privacy-policy/index.html","/terms-of-service/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"8FInsKJmV8j09mTLEROpW0YKS7hzuohHOpmxxiS2hLw="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
