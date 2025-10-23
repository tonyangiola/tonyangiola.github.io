// [books-inline-fix] v1
(function(){
  const $  = (q,r=document)=>r.querySelector(q);
  const $$ = (q,r=document)=>Array.from(r.querySelectorAll(q));
  console.log("[books-inline-fix] loaded");

  // 2-col hardening (lightweight — complements your CSS)
  const harden = card=>{
    if(!card) return;
    card.style.display='grid';
    card.style.gridTemplateColumns='260px 1fr';
    card.style.gap='1rem';
    card.style.alignItems='start';
    $$('img,video',card).forEach(m=>{
      m.style.display='block';
      m.style.width='100%';
      m.style.maxWidth='100%';
      m.style.height='auto';
      m.style.objectFit='contain';
      m.style.borderRadius='.5rem';
      m.style.background='#111';
      if(m.tagName==='VIDEO') m.controls=true;
    });
  };

  // De-dupe "Cosmic Secrets" (keep the first)
  const cosmicCards = $$('.book-card h3')
    .filter(h=>/Cosmic Secrets/i.test(h.textContent))
    .map(h=>h.closest('article')||h.closest('.book-card'));
  cosmicCards.slice(1).forEach(n=>n && n.remove());
  if (cosmicCards[0]) harden(cosmicCards[0]);

  // Ensure Snippy card exists; if not, create one and put it at the top
  const hasSnippy = $$('.book-card h3').some(h=>/Snippy/i.test(h.textContent)) || $('#snippy-card');
  const grid = $('.books-grid') || $('main') || document.body;
  if (!hasSnippy && grid) {
    const a = document.createElement('article');
    a.className = 'book-card';
    a.id = 'snippy-card';
    a.innerHTML = `
      <div class="book-media">
        <video preload="metadata" poster="/images/books/snippy.jpg">
          <source src="/assets/videos/snippy.mp4#t=0.1" type="video/mp4">
        </video>
      </div>
      <div class="book-meta">
        <h3>Snippy</h3>
        <p>Animated preview.</p>
        <div class="book-actions" style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem;">
          <a class="primary" href="https://www.amazon.com/dp/XXXXXXXX" target="_blank" rel="noopener">Buy on Amazon</a>
          <a class="secondary" href="/newsletter.html">Get updates</a>
        </div>
      </div>`;
    // Insert at top of grid (before first existing book-card)
    const firstCard = $('.book-card', grid);
    if (firstCard) grid.insertBefore(a, firstCard); else grid.appendChild(a);
    harden(a);
    console.log("[books-inline-fix] inserted Snippy card");
  }

  // Harden all visible cards so layout is consistent
  $$('.book-card').forEach(harden);

  console.log("[books-inline-fix] done");
})();
