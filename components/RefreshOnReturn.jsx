'use client';

import { useEffect } from 'react';

/**
 * Reloads the page when a visitor comes back to it — returning from WhatsApp,
 * another app or a back/forward restore — so the booking status card and the
 * saved draft are read fresh instead of showing a stale page.
 */
export default function RefreshOnReturn() {
  useEffect(() => {
    let hiddenAt = 0;

    const onPageShow = (event) => {
      if (event.persisted) window.location.reload();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenAt = Date.now();
        return;
      }
      // Ignore quick flickers such as the browser's own tab switches.
      if (hiddenAt && Date.now() - hiddenAt > 1000) {
        hiddenAt = 0;
        window.location.reload();
        return;
      }
      hiddenAt = 0;
    };

    window.addEventListener('pageshow', onPageShow);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return null;
}
