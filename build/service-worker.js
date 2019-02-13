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
  "./precache-manifest.a6d795ca6173299266bf627cb44e00bf.js"
=======
  "./precache-manifest.a7c209332efbb05025679596701a0181.js"
>>>>>>> 1e5cfecf256d9408fda9c6439b642186bf2309d7
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
