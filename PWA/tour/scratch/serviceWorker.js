/*
 * serviceWorker.js
 *
 * Copyright (C) 2021 Peter Lau <superpeterlau@outlook.com>
 *
 * Distributed under terms of the MIT license.
 */

// 命名 cache
const staticDevCoffee = "dev-coffee-v1";

const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg",
];

// self 是 service worker 可以用来 listen sw 生命周期
// install 时创建 cache
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// fetch 时匹配 cache 中资源
//   makes our app available in offline mode

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      console.log("what is fetch: ", fetch);
      return (
        res ||
        fetch(fetchEvent.request)
          .then((res) => console.log(res))
          .catch((err) => console.error(err))
      );
    })
  );
});
// export default Application
