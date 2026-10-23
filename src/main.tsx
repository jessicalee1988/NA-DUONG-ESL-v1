import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA with safe autoUpdate
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[Na Duong ESL PWA] Phiên bản mới đã sẵn sàng.');
  },
  onOfflineReady() {
    console.log('[Na Duong ESL PWA] Ứng dụng đã sẵn sàng chạy ngoại tuyến.');
  },
  onRegistered(r) {
    if (r) {
      console.log('[Na Duong ESL PWA] Service Worker đăng ký thành công.');
    }
  },
  onRegisterError(error) {
    console.error('[Na Duong ESL PWA] Lỗi đăng ký Service Worker:', error);
  },
});

createRoot(document.getElementById('root')!).render(<App />);
