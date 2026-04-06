/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'occount-v1.0.0';

const PRECACHE_URLS = ['/', '/manifest.json'];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(
          PRECACHE_URLS.map((url) => new Request(url, { cache: 'reload' })),
        );
      })
      .catch((error) => {
        console.error('기본 캐싱 실패:', error);
        return Promise.resolve();
      }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          }),
        );
      }),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
    return handleApiRequest(request);
  }

  if (request.headers.get('accept')?.includes('text/html')) {
    return handlePageRequest(request);
  }

  return handleStaticRequest(request);
}

// 캐시 허용 API 엔드포인트 (공개 데이터만)
const SAFE_TO_CACHE_APIS = ['notices', 'items'];

function isSafeToCache(url) {
  const pathname = new URL(url).pathname;
  // 안전한 공개 API만 캐시 허용
  return SAFE_TO_CACHE_APIS.some((pattern) => pathname.includes(pattern));
}

async function handleApiRequest(request) {
  // 사용자 개인정보가 포함된 API는 캐시하지 않음 (보안)
  if (!isSafeToCache(request.url)) {
    try {
      return await fetch(request);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Network connection required' }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }

  // 안전한 공개 데이터만 캐시 처리
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => {
      return cachedResponse;
    });

  return cachedResponse || networkPromise;
}

async function handlePageRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // 브라우저 기본 오프라인 화면 사용
    throw error;
  }
}

async function handleStaticRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    throw error;
  }
}

self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : '오카운트 알림',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'occount-notification',
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification('오카운트', options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow('/'));
});
