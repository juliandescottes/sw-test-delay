function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(wait(5000)).then(function(cache) {
      return cache.addAll([
        '/sw-test-delay/',
        '/sw-test-delay/index.html',
        '/sw-test-delay/style.css',
        '/sw-test-delay/app.js',
        '/sw-test-delay/image-list.js',
        '/sw-test-delay/star-wars-logo.jpg',
        '/sw-test-delay/gallery/bountyHunters.jpg',
        '/sw-test-delay/gallery/myLittleVader.jpg',
        '/sw-test-delay/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/sw-test-delay/gallery/myLittleVader.jpg');
  }));
});
