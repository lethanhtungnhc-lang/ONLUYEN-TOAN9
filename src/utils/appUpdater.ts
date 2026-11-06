// Utility to update PWA / App to the newest version
export const APP_VERSION = '2.5.0 - Chuẩn CV 7991';

export async function updateAppToLatest(): Promise<void> {
  try {
    // 1. Force update service worker registrations
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.update();
      }
    }

    // 2. Clear outdated browser cache storage
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }

    // 3. Reload page from server
    window.location.reload();
  } catch (err) {
    console.error('Update app error:', err);
    window.location.reload();
  }
}
