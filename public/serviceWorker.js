// const CACHE_NAME = 'app-shell-cache-v1';
// const STATIC_FILES = [
//   '/',
//   '/index.html',
//   '/favicon.ico',
//   '/logo192.png',
//   '/logo512.png',
//   '/static/js/bundle.js',
//   '/static/js/0.chunk.js',  // Добавление динамически генерируемых файлов
//   '/static/js/main.chunk.js',
//   '/static/css/main.css',
//   '/static/media/*',  // Если у вас есть другие медиа файлы
// ];

// // Установка Service Worker
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log('Caching static files...');
//       return cache.addAll(STATIC_FILES).catch((error) => {
//         console.error('Failed to cache static files:', error);
//       });
//     })
//   );
// });

// // Обновление кеша, если есть новые версии файлов
// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             console.log('Удаление старого кеша:', cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// // Обработка запросов (Fetch event)
// self.addEventListener('fetch', (event) => {
//   if (event.request.method === 'GET') {
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         // Возвращаем кеш, если он есть, или запрашиваем из сети
//         return cachedResponse || fetch(event.request).then((networkResponse) => {
//           return caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, networkResponse.clone());
//             return networkResponse;
//           });
//         }).catch((error) => {
//           console.error('Fetch error:', error);
//           // Если не удается получить данные, показываем fallback
//           return caches.match('/');
//         });
//       })
//     );
//   }
// });

// // Обработка синхронизации в фоновом режиме (Background sync)
// self.addEventListener('sync', (event) => {
//   if (event.tag === 'sync-post-data') {
//     event.waitUntil(
//       fetch('/api/post-data', {
//         method: 'POST',
//         body: JSON.stringify({ key: 'value' }),
//         headers: { 'Content-Type': 'application/json' },
//       })
//         .then((response) => response.json())
//         .then((data) => console.log('Background sync successful:', data))
//         .catch((err) => console.error('Background sync failed:', err))
//     );
//   }
// });

