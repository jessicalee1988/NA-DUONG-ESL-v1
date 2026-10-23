import { PRERECORDED_WAV_IDS } from '../data/approvedAudioMap';

export const AUDIO_CACHE_NAME = 'codo2-esl-audio-cache-v1';

// All 160 audio URLs
export const ALL_160_AUDIO_URLS: string[] = Array.from(PRERECORDED_WAV_IDS).map(
  (id) => `/audio/${id}.wav`
);

/**
 * Checks how many of the 160 audio files are currently stored in CacheStorage
 */
export async function getCachedAudioCount(): Promise<number> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return 0;
  }
  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const keys = await cache.keys();
    let count = 0;
    const keyUrls = new Set(keys.map((k) => new URL(k.url, window.location.origin).pathname));

    for (const path of ALL_160_AUDIO_URLS) {
      if (keyUrls.has(path)) {
        count++;
      }
    }
    return count;
  } catch (err) {
    console.warn('Error reading audio cache keys:', err);
    return 0;
  }
}

/**
 * Cache all 160 audio files in controlled parallel batches
 */
export async function cacheAll160AudioFiles(
  onProgress?: (cached: number, total: number) => void
): Promise<{ success: boolean; cachedCount: number; errors: number }> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return { success: false, cachedCount: 0, errors: 1 };
  }

  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const total = ALL_160_AUDIO_URLS.length;
    let cachedCount = await getCachedAudioCount();
    let errors = 0;

    if (onProgress) onProgress(cachedCount, total);

    // Download in chunks of 5 to avoid overwhelming mobile network connections
    const chunkSize = 5;
    for (let i = 0; i < total; i += chunkSize) {
      const chunk = ALL_160_AUDIO_URLS.slice(i, i + chunkSize);
      await Promise.all(
        chunk.map(async (url) => {
          try {
            const match = await cache.match(url);
            if (!match) {
              const res = await fetch(url);
              if (res.ok) {
                await cache.put(url, res.clone());
                cachedCount++;
              } else {
                errors++;
              }
            }
          } catch {
            errors++;
          }
        })
      );
      if (onProgress) {
        onProgress(Math.min(cachedCount, total), total);
      }
    }

    const finalCount = await getCachedAudioCount();
    return { success: errors === 0, cachedCount: finalCount, errors };
  } catch (err) {
    console.error('Failed to cache audio files:', err);
    return { success: false, cachedCount: 0, errors: 1 };
  }
}
