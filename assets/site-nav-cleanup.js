(function(){
  var header = document.querySelector('header') || document.querySelector('.site-header');
  if(!header) return;
  function isEmpty(el){
    var txt = (el.textContent || "").replace(/\u00A0/g,' ').trim();
    if (txt) return false;
    return !el.querySelector('img,svg');
  }
  header.querySelectorAll('a,button').forEach(function(el){
    // kill empty pills and spacer anchors (# or no href)
    var href = el.getAttribute('href') || '';
    if (isEmpty(el) || href === '#' || href === '') el.remove();
  });
  var burgers = header.querySelectorAll('.menu-toggle');
  for (var i=1;i<burgers.length;i++) burgers[i].remove();
})();
