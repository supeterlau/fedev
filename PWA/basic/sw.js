let cacheName = 'basic-page'

let filesToCache = [
  '/',
  '/index.html',
  '/index.css',
]

let tag = '[ServiceWorker]'

self.addEventListener('install', e => {
  console.log(`${tag} Install`)
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log(`${tag} Caching app shell`)
      return cache.addAll(filesToCache)
    })
  )
})

  self.addEventListener('activate', e => {
    e.waitUntil(self.clients.claim())
  })

  self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request, {ignoreSearch: true}).then(
        response => {
          return response || fetch(e.request)
        }
      )
    )
  })
