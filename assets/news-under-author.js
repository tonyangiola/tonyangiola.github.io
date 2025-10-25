(function(){
  function norm(s){return (s||"").replace(/\s+/g," ").trim();}
  function findMain(){
    return document.querySelector('main.page-content') ||
           document.querySelector('main') ||
           document.querySelector('.page-content');
  }
  function findNews(){
    // Prefer unique hooks
    var n = document.querySelector('#latest-news, .latest-news, [data-section="latest-news"]');
    if (n) return n.closest('section,article,div') || n;
    // Fallback by heading text
    var h2s = document.querySelectorAll('h1,h2,h3,.section-title');
    for (var i=0;i<h2s.length;i++){
      if (/^Latest\s*News$/i.test(norm(h2s[i].textContent))) {
        return h2s[i].closest('section,article,div') || h2s[i].parentElement;
      }
    }
    return null;
  }
  function blockList(main){
    var a = [];
    for (var i=0;i<main.children.length;i++){
      var el = main.children[i];
      if (el && el.matches && el.matches('section,article,div')) a.push(el);
    }
    return a;
  }
  function move(){
    var main = findMain();
    var news = findNews();
    if (!main || !news) return;

    var blocks = blockList(main);
    if (blocks.length < 2) return;

    // If Latest News is already second or later, do nothing.
    var idx = blocks.indexOf(news);
    if (idx === 0) {
      // make it the 2nd block
      blocks[0].insertAdjacentElement('afterend', news);
    }
  }
  // Run after full page load to survive late includes
  window.addEventListener('load', function(){ setTimeout(move, 0); });
})();
