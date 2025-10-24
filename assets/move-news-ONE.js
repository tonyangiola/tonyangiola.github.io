(function(){
  function norm(s){return (s||"").replace(/\s+/g," ").trim();}
  function findMain(){
    return document.querySelector('main.page-content') ||
           document.querySelector('main') ||
           document.querySelector('.page-content');
  }
  function findLatestNewsCard(){
    var headings = document.querySelectorAll('h1,h2,h3,.section-title');
    for(var i=0;i<headings.length;i++){
      var t = norm(headings[i].textContent);
      if(/^Latest\s*News$/i.test(t)){
        var el = headings[i];
        // climb to nearest structural block
        return el.closest('section,article,div') || el.parentElement;
      }
    }
    // fallback by common hooks
    return document.querySelector('#latest-news, .latest-news, [data-section="latest-news"]');
  }
  function firstBlockInside(main){
    var kids = Array.prototype.slice.call(main.children);
    for(var i=0;i<kids.length;i++){
      if(kids[i].matches && kids[i].matches('section,article,div')) return kids[i];
    }
    return null;
  }
  function moveOnce(){
    var main = findMain();
    var news = findLatestNewsCard();
    if(!main || !news) return false;
    var first = firstBlockInside(main);
    if(!first || first===news) return true; // done or already placed
    try { first.insertAdjacentElement('afterend', news); } catch(e) { return false; }
    return true;
  }
  // Retry up to ~6s to handle late-loading includes
  var tries = 0, max = 40, timer = setInterval(function(){
    tries++;
    if(moveOnce() || tries>=max){ clearInterval(timer); }
  }, 150);
  window.addEventListener('pageshow', moveOnce);
})();
