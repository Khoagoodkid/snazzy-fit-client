
import { nanoid } from 'nanoid';

export function getOrCreateDeviceId() {
    if (typeof window === 'undefined') return null;
    const name = 'device_id';
    const cookies = document.cookie ? document.cookie.split('; ').map(c => c.split('=')) : [];
    const existing = cookies.find(([k]) => k === name);
    if (existing) return existing[1];
    const id = typeof crypto !== 'undefined' && (crypto as any).randomUUID ? (crypto as any).randomUUID() : nanoid();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toUTCString();
    document.cookie = `${name}=${id}; Path=/; Expires=${expires}; SameSite=Lax`;
    return id;
}

export function getFingerprint() {
    if (typeof navigator === 'undefined') return null;
    const f = {
        ua: navigator.userAgent,
        lang: navigator.language,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        screen: `${window.screen.width}x${window.screen.height}`,
        colorDepth: (window.screen.colorDepth || null),
        platform: navigator.platform || '',
    };
    return btoa(unescape(encodeURIComponent(JSON.stringify(f))));
}

let keyStrokes = 0;
let lastKeyTs = 0;
export function startBehaviorCapture() {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', () => {
        keyStrokes++;
        lastKeyTs = Date.now();
    });
}
export function getBehaviorSummary() {
    return { keyStrokes, lastKeyTs };
}

