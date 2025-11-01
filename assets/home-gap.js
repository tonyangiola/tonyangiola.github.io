(function(){
  // Run when DOM is ready
  var run=function(){
    // Only on home
    if(!document.body.classList.contains('home-page')) return;

    // Heuristic: find the first two ".card" sections in the main content
    var main = document.querySelector('body.home-page main, body.home-page .site-main') || document;
    var cards = main.querySelectorAll('section.card, .card');
    if(cards.length < 2) return;

    // Find their common parent that actually contains them both
    var p = cards[0].parentElement;
    while(p && !p.contains(cards[1])) p = p.parentElement;
    if(!p) return;

    // Force a layout that supports gap and apply spacing
    var s = getComputedStyle(p);
    var isGrid = s.display.indexOf('grid') !== -1;
    var isFlex = s.display.indexOf('flex') !== -1;

    if(!isGrid && !isFlex){
      // Make it a simple 2-col grid on wide screens; stack on small screens
      p.style.display = 'grid';
      p.style.gridTemplateColumns = '1fr 1fr';
    }
    // Always enforce a visible gap
    p.style.gap = '32px';
    p.style.columnGap = '32px';
    p.style.rowGap = '24px';
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run, {once:true});
  } else {
    run();
  }
})();
