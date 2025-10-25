(function(){
  var imgs = document.querySelectorAll('#snippy-article img');
  imgs.forEach(function(img, i){
    var n = String(i+1).padStart(2,'0');
    var tried = 0;
    var candidates = [
      'snippy-doc-'+n+'.jpg',
      'snippy-doc-'+n+'.jpeg',
      'image'+(i+1)+'.jpg',
      'image'+(i+1)+'.jpeg'
    ];
    var base = 'assets/images/news/snippy/';
    img.addEventListener('error', function handler(){
      if (tried >= candidates.length) { img.removeEventListener('error', handler); return; }
      img.src = base + candidates[tried++];
    });
    /* In case the first src already 404’d before onerror attached (cached):
       kick a quick re-test if it looks broken. */
    if (!img.complete || img.naturalWidth === 0) {
      var first = img.src;
      img.src = first; // retrigger load & onerror
    }
  });
})();
