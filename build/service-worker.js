/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("./workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "./workbox-v3.6.3"});

importScripts(
<<<<<<< HEAD
  "./precache-manifest.72de09b9bd6897af59adaeab2d9423f8.js"
=======
  "./precache-manifest.5c4cdf3f9e478cfc8316d2b13d189fa7.js"
>>>>>>> 1344d42f8f5bd88ee9dbb600b967d68796575b2d
);

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("./index.html", {
  
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});
