(function(){
  function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }
  function findAvatar(){
    // Candidates: images in header
    var imgs = Array.from(document.querySelectorAll('header img'));
    if(!imgs.length) return null;
    // Score by "rightmost near top" and small-ish size
    var best=null, score=-1;
    imgs.forEach(function(img){
      var r = img.getBoundingClientRect();
      if(r.width === 0 || r.height === 0) return;
      // Prefer small avatars (24–80px), very near top (<=120px), far to the right
      var sizeOK = r.width<=96 && r.width>=24;
      var nearTop = r.top>=0 && r.top<=120;
      var s = (sizeOK?50:0) + (nearTop?50:0) + r.right; // bigger right = better
      if(s>score){ score=s; best=img; }
    });
    return best;
  }
  function place(badge, target){
    var r = target.getBoundingClientRect();
    // Put text just to the LEFT of the circle (8px gap)
    var x = r.left - badge.offsetWidth - 8;
    var y = r.top + Math.max(0, (r.height - badge.offsetHeight)/2);
    badge.style.left = Math.max(8, Math.round(x)) + 'px';
    badge.style.top  = Math.max(8, Math.round(y)) + 'px';
  }
  ready(function(){
    var target = findAvatar();
    if(!target) return;
    // Create badge once
    var badge = document.createElement('div');
    badge.className = 'name-badge-fixed';
    badge.textContent = 'Tony Angiola';
    document.body.appendChild(badge);

    // Initial place after it’s in DOM so width/height are known
    function update(){ place(badge, target); }
    update();

    // Keep it aligned on resize/scroll/font load
    window.addEventListener('resize', update, {passive:true});
    window.addEventListener('scroll', update, {passive:true});
    // If the avatar moves due to layout shifts, observe it
    var ro = new ResizeObserver(update);
    ro.observe(target);
    // Re-run after fonts/images settle
    setTimeout(update, 150);
    setTimeout(update, 600);
  });
})();
