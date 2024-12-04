const CACHE_NAME = "app-shell-cache-v1";
const urlsToCache = [
  "/", 
  "/static/js/bundle.js", 
  "/static/css/main.css", 
  "/favicon.ico", 
  "/manifest.json", 
  // "/db.json",
  "/index.html",
  // "/login-page",
  "http://localhost:3031/users",
];

const POST_SYNC_TAG = 'sync-post-requests';

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Кэширование ресурсов в процессе...");
      return cache.addAll(urlsToCache);
    }).catch((error) => {
      console.error('Ошибка при кэшировании:', error);
    })
  );
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).catch((error) => {
      console.error('Ошибка при активации сервис-воркера:', error);
    })
  );
});

self.addEventListener("fetch", (event) => {
    console.log('Intercepting request:', event.request.url);
  
    
    if (event.request.method === "GET") {
      event.respondWith(
        caches.match(event.request).then((response) => {
          if (response) {
            console.log('Cache hit for:', event.request.url);
            return response;
          }
          console.log('Cache miss for:', event.request.url);
          return fetch(event.request);
        }).catch((error) => {
          console.error('Ошибка при обработке GET-запроса:', error);
          
          return caches.match('/fallback.html'); 
        })
      );
    }
  
    
    if (event.request.method === "POST") {
      const requestClone = event.request.clone(); // Клонируем запрос, чтобы сохранить тело
  
      event.respondWith(
        fetch(event.request).catch((error) => {
          console.error('Ошибка при отправке POST-запроса:', error);
  
          // Сохраняем запросы, которые не удалось отправить
          saveRequestForSync(requestClone).then(() => {
            // Возвращаем ответ с текстом и статусом 202 для синхронизации
            return new Response('Запрос не отправлен, будет синхронизирован позже', {
              status: 202,
            });
          }).catch((err) => {
            // В случае ошибки в сохранении запроса, возвращаем 500
            return new Response('Ошибка при сохранении запроса для синхронизации', {
              status: 500,
            });
          });
        })
      );
    }
  });

function saveRequestForSync(request) {
  return new Promise((resolve, reject) => {
    const requestData = {
      method: request.method,
      url: request.url,
      headers: [...request.headers.entries()],
    };

    request.clone().text().then((bodyText) => {
      requestData.body = bodyText; 

      
      saveToIndexedDB(requestData).then(() => {
        console.log('Запрос сохранен для синхронизации:', requestData);
        resolve();
      }).catch((err) => {
        console.error('Ошибка при сохранении запроса в IndexedDB:', err);
        reject(err);
      });
    }).catch((err) => {
      console.error('Ошибка при сохранении тела запроса:', err);
      reject(err);
    });
  });
}

function saveToIndexedDB(requestData) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("sync-requests-db", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("requests")) {
        db.createObjectStore("requests", { keyPath: "url" });
      }
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction("requests", "readwrite");
      const store = transaction.objectStore("requests");
      store.put(requestData); // Сохраняем запрос
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error("Error saving to IndexedDB"));
    };

    request.onerror = () => reject(new Error("Error opening IndexedDB"));
  });
}

self.addEventListener("sync", (event) => {
  if (event.tag === POST_SYNC_TAG) {
    event.waitUntil(
      syncPostRequests() 
    );
  }
});

async function syncPostRequests() {
    console.log("Попытка синхронизации POST-запросов");
    try {
      const requests = await getFromIndexedDB();
      console.log('Сохранённые запросы для синхронизации:', requests);
  
      requests.forEach((requestData) => {
        const requestOptions = {
          method: requestData.method,
          headers: new Headers(requestData.headers),
          body: requestData.body,
        };
  
        fetch(requestData.url, requestOptions)
          .then((response) => {
            if (response.ok) {
              console.log('POST-запрос синхронизирован успешно:', requestData);
              removeFromIndexedDB(requestData.url);
            } else {
              console.error('Сервер вернул ошибку:', response.status);
            }
          })
          .catch((error) => {
            console.error('Ошибка при повторной отправке запроса:', error);
          });
      });
    } catch (error) {
      console.error('Ошибка при получении запросов из IndexedDB:', error);
    }
  }
  


function getFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("sync-requests-db", 1);

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction("requests", "readonly");
      const store = transaction.objectStore("requests");
      const allRequests = store.getAll(); 

      allRequests.onsuccess = () => resolve(allRequests.result);
      allRequests.onerror = () => reject(new Error("Error retrieving from IndexedDB"));
    };

    request.onerror = () => reject(new Error("Error opening IndexedDB"));
  });
}

function removeFromIndexedDB(url) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("sync-requests-db", 1);

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction("requests", "readwrite");
      const store = transaction.objectStore("requests");
      store.delete(url); // Удаляем запрос по URL
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error("Error removing from IndexedDB"));
    };

    request.onerror = () => reject(new Error("Error opening IndexedDB"));
  });
}

self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.log('Push Received:', data);
  
    const options = {
      body: data.body,
      icon: data.icon || '/favicon.ico',
      badge: data.badge || '/favicon.ico',
      data: data.url || '/',
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  
    
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === event.notification.data ? (windowClient.focus(), true) : false
        );
  
        if (!hadWindowToFocus) {
          clients.openWindow(event.notification.data);
        }
      })
    );
  });
  





