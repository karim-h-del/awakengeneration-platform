// اسم ذاكرة التخزين المحلية المؤقتة للمنصة
const CACHE_NAME = 'awakened-generation-dev-v78';

// بروتوكول التثبيت (تم تفريغه مؤقتاً لتعطيل الحفظ التلقائي أثناء التطوير)
self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[حنيفية رقمية] وضع التطوير نشط: تم تصفير الكاش المحلي لضمان تدفق التحديثات حية.');
});

// تنظيف وتفريغ أي كاش قديم متراكم في متصفحك فوراً
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          console.log('[حنيفية رقمية] مسح قسري لملفات التخزين المؤقتة لفك قفل الواجهة.');
          return caches.delete(cache);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// بروتوكول العبور المباشر (Network-Only Protocol) - إلغاء خاصية الأوفلاين
self.addEventListener('fetch', (event) => {
  // إجبار المتصفح على جلب الملف حياً من السيرفر وتجاهل الذاكرة المحلية تماماً
  event.respondWith(
    fetch(event.request).catch(() => {
      // رسالة توجيهية في حال انقطع الاتصال تماماً أثناء وضع التطوير
      console.log('[حنيفية رقمية] تنبيه: أنت أوفلاين، وخاصية المحاكاة المحلية معطلة حالياً بأمر المطور.');
    })
  );
});