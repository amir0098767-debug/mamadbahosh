var CACHE='mamad-v1';
self.addEventListener('install',function(e){
  self.skipWaiting();
});
self.addEventListener('activate',function(e){
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch',function(e){
  // فقط برای فایل‌های خود اپ کش کن، API رو کش نکن
  var u=new URL(e.request.url);
  if(u.pathname.indexOf('/app/')!==-1 || u.pathname.indexOf('/api/')!==-1) return;
  e.respondWith(
    caches.open(CACHE).then(function(c){
      return c.match(e.request).then(function(r){
        return r || fetch(e.request).then(function(res){
          c.put(e.request,res.clone());
          return res;
        });
      });
    })
  );
});