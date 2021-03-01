importScripts('https://js.pusher.com/beams/service-worker.js');

const cacheName = 'TrackMyWater-v1';
const appShellFiles = [
	'/offline.html',
	'https://js.pusher.com/beams/service-worker.js',
	'https://js.pusher.com/beams/1.0/push-notifications-cdn.js',
	'/js/app.js',
	'/socket.io/socket.io.js',
	'/icons/icon-72x72.png',
	'/icons/icon-96x96.png',
	'/icons/icon-128x128.png',
	'/icons/icon-144x144.png',
	'/icons/icon-152x152.png',
	'/icons/icon-192x192.png',
	'/icons/icon-384x384.png',
	'/icons/icon-512x512.png',
];

self.addEventListener('install', (e) => {
	// Al instalarse el SW agrega los archivos al cache
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log('Almacenando en caché');
			return cache.addAll(appShellFiles);
		})
	);
	console.log('SW Installed');
});

self.addEventListener('activate', (e) => {
	// CUando se instala el nuevo service worker elimina la anterior versión del cache
	const response = caches.keys().then((keys) => {
		keys.forEach((key) => {
			if (key !== cacheName) {
				return caches.delete(key);
			}
		});
	});

	e.waitUntil(response);
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		// Si el archivo se encuentra en el cache se devuelve
		caches.match(e.request).then((resp) => {
			if (resp) return resp;
			// Si no se realiza la petición
			return fetch(e.request).catch(() => caches.match('/offline.html')); // Si se produce un error está offline y se deuelve la página offline
		})
	);
});
