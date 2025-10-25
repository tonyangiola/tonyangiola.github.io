(function(){
  var header = document.querySelector('header') || document.querySelector('.site-header');
  if(!header) return;
  function isEmpty(el){
    var t=(el.textContent||"").replace(/\u00A0/g,' ').trim();
    return !t && !el.querySelector('img,svg');
  }
  header.querySelectorAll('a,button').forEach(function(el){
    var href = el.getAttribute('href') || '';
    if (isEmpty(el) || href === '#' || href === '') el.remove();
  });
  var burgers = header.querySelectorAll('.menu-toggle');
  for (var i=1;i<burgers.length;i++) burgers[i].remove();
})();
