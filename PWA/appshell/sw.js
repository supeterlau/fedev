/*
 * sw.js
 * Copyright (C) 2021 Peter Lau <superpeterlau@outlook.com>
 *
 * Distributed under terms of the MIT license.
 */

const staticCacheName = "app-shell-static-v1";
const dynamicPagesCacheName = "app-shell-dynamic-pages-v1";

const htmlJSRegexp = /.*\.html$|.*\.js$/i;

const staticCacheFileNames = ["public/offline.html", "lib/app.js"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        cache.addAll(["/", "manifest.json", ...staticCacheFileNames]);
      })
      .catch((error) => {
        console.error(`Error caching static assets: ${error}`);
      })
  );
});

self.addEventListener("activate", (e) => {
  if (self.clients && clients.claim) {
    clients.claim();
  }
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName.startsWith("app-shell-") &&
                cacheName !== staticCacheName
              );
            })
            .map((cacheName) => {
              return caches.delete(cacheName);
            })
        ).catch((error) =>
          console.error(
            `Some error occurred while removing existing cache: ${error}`
          )
        );
      })
      .catch((error) =>
        console.error(
          `Some error occurred while removing existing cache: ${error}`
        )
      )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return (
          res ||
          fetch(e.request)
            .then((fetchRes) => {
              console.log(e.request.url);
              if (htmlJSRegexp.test(e.request.url)) {
                return cacheDynamicRequestData(
                  dynamicPagesCacheName,
                  e.request.url,
                  fetchRes.clone()
                );
              }
            })
            .catch((error) =>
              console.log(
                `Some error occurred while saving data to dynamic cache: ${error}`
              )
            )
        );
      })
      .catch((error) =>
        console.log(
          `Some error occurred while saving data to dynamic cache: ${error}`
        )
      )
  );
});

function cacheDynamicRequestData(dynamicCacheName, url, fetchRes) {
  let protocol = new URL(url).protocol;
  if (!["http", "https"].includes(protocol)) return;
  return caches
    .open(dynamicCacheName)
    .then((cache) => {
      cache.put(url, fetchRes.clone());
      return fetchRes;
    })
    .catch((error) =>
      console.log(
        `Some error occurred while saving data to dynamic cache with ${dynamicCacheName}: ${error}`
      )
    );
}
