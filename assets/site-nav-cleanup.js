(function(){
  var header = document.querySelector('header') || document.querySelector('.site-header');
  if(!header) return;

  function emptyLike(el){
    // text with spaces & nbsp removed
    var t=(el.textContent||"").replace(/\u00A0/g,' ').trim();
    // has visual icon?
    var hasIcon = !!el.querySelector('img,svg');
    // has accessible label?
    var hasLabel = !!(el.getAttribute('aria-label') || el.getAttribute('title'));
    // href that's a spacer?
    var href = (el.getAttribute('href')||'').trim();
    var spacerHref = (href==='' || href==='#');

    // Remove if: no text, no icon, no label  OR it's a spacer link
    return ((!t && !hasIcon && !hasLabel) || spacerHref);
  }

  header.querySelectorAll('a,button').forEach(function(el){
    if (emptyLike(el)) el.remove();
  });

  // Deduplicate burger/menu toggles: keep the first visible one
  var burgers = Array.from(header.querySelectorAll('.menu-toggle'));
  for (var i=1;i<burgers.length;i++){ burgers[i].remove(); }
})();
