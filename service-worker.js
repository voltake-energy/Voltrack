// service-worker.js
// Kod minimum untuk membolehkan PWA "Add to Home Screen" (Install Button) berfungsi.

self.addEventListener('install', (event) => {
    // Apabila service worker dipasang, kita bypass "waiting phase"
    // supaya ia cepat aktif
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Ambil alih kawalan klien serta-merta selepas diaktifkan
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Pada tahap ini, kita abaikan pemintasan request (pass-through)
    // Kerana fokus utama adalah untuk memenuhi syarat "Install App" PWA
    // yang mana browser perlukan sebuah fail service worker berdaftar.
    return;
});

// Listener khas untuk local notification (Push dari webapp itu sendiri)
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, body, tag } = event.data.payload;
        // Default icon guna Google Drive logo
        const iconUrl = 'https://lh3.googleusercontent.com/d/1UNatuJ8TQ5I7ab4qUqmblWzSSMpHlZps';
        
        self.registration.showNotification(title, {
            body: body,
            icon: iconUrl,
            badge: iconUrl,
            tag: tag || 'volttrack-notif',
            vibrate: [200, 100, 200]
        });
    }
});
