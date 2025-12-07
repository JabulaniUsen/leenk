// Service Worker for Leenk PWA
const CACHE_NAME = 'leenk-v1'
const urlsToCache = [
  '/',
  '/dashboard',
  '/login',
  '/logo.png',
  '/manifest.json'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.error('Cache install failed:', error)
      })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })

          return response
        })
      })
      .catch(() => {
        // If both cache and network fail, return offline page if available
        if (event.request.destination === 'document') {
          return caches.match('/')
        }
      })
  )
})

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  const title = data.title || 'Leenk'
  const options = {
    body: data.body || 'You have a new message',
    icon: '/logo.png',
    badge: '/logo.png',
    tag: data.tag || 'leenk-notification',
    data: data.data || {}
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/dashboard')
  )
})

