(function(){
  if (!document.body || !document.body.classList.contains('home-page')) return;

  // Find the two cards by their headings, then climb to the shared row container.
  function byHeading(txt){
    return Array.from(document.querySelectorAll('h2, h3, strong, b')).find(h =>
      (h.textContent||'').toLowerCase().includes(txt));
  }

  const left  = byHeading('current project');
  const right = byHeading('new articles');

  // Fallback: try common class guesses if headings not found
  let row = null;
  if (left && right){
    // Find closest common ancestor that contains both
    let a = left, b = right;
    const ancestors = new Set();
    while (a){ ancestors.add(a); a = a.parentElement; }
    while (b){ if (ancestors.has(b)) { row = b; break; } b = b.parentElement; }
  }
  if (!row){
    row = document.querySelector(
      // try typical containers seen on this site
      '.section-cards, .cards, .grid, .row, main .container > div, main .container > section'
    );
  }
  if (!row) return;

  // Force flex layout + gaps that beat inline locks
  row.style.setProperty('display', 'flex', 'important');
  row.style.setProperty('flex-wrap', 'wrap', 'important');
  row.style.setProperty('gap', '40px', 'important');        // <— spacing between cards
  row.style.setProperty('column-gap', '40px', 'important');
  row.style.setProperty('row-gap', '30px', 'important');

  // Also ensure each child behaves as a card with some breathing room
  Array.from(row.children).forEach(function(el){
    el.style.setProperty('flex', '1 1 0', 'important');
    el.style.setProperty('min-width', '300px', 'important');
  });
})();
