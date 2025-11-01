(function(){
  try {
    var sel = 'article.card#socorro video, article.card#socorro img, article.card#gremlins video, article.card#gremlins img';
    document.querySelectorAll(sel).forEach(function(el){
      el.removeAttribute('width');
      el.removeAttribute('height');
      el.style.removeProperty('width');
      el.style.removeProperty('height');
      el.style.removeProperty('max-height');
      el.style.objectFit = 'contain';
    });
  } catch(e) {}
})();
