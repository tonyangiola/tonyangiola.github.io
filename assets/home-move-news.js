(function(){
  function move(){
    var main = document.querySelector('main.page-content');
    var news = document.querySelector('#latest-news');
    if(!main || !news) return;

    // find 1st *section/article/div* child inside main (the "Author" card)
    var kids = Array.prototype.slice.call(main.children).filter(function(n){
      if(!(n instanceof Element)) return false;
      var tag = n.tagName.toLowerCase();
      return (tag==='section' || tag==='article' || tag==='div');
    });
    if(kids.length===0) return;

    var first = kids[0];
    if(first && news){
      // place Latest News immediately after the first content block
      first.insertAdjacentElement('afterend', news);
    }
  }
  // run after EVERYTHING (HTML, includes, images) is there
  window.addEventListener('load', move);
})();
