(() => {
  console.log("[fix-books] loaded");

  const sel = (q,root=document)=>root.querySelector(q);
  const selAll = (q,root=document)=>Array.from(root.querySelectorAll(q));

  const main = sel('main') || document.body;

  // Keep only the first H1 inside <main>
  try {
    selAll('main h1:nth-of-type(n+2)', main).forEach(el => el.remove());
  } catch (e) { console.warn("[fix-books] H1 trim:", e); }

  // Harden a book card layout
  const harden = card => {
    if (!card) return;
    Object.assign(card.style, {
      display:'grid',
      gridTemplateColumns:'260px 1fr',
      gap:'1rem',
      alignItems:'start'
    });
    selAll('img,video', card).forEach(m=>{
      Object.assign(m.style,{
        display:'block',
        width:'100%',
        maxWidth:'100%',
        height:'auto',
        objectFit:'contain',
        borderRadius:'.5rem',
        background:'#111'
      });
      // If a video, ensure controls are visible
      if (m.tagName === 'VIDEO') { m.controls = true; }
    });
  };

  // Find cards by title text fallback
  const byTitle = t => selAll('.book-card h3')
    .map(h=>({h, card:h.closest('article')||h.closest('.book-card')}))
    .find(x => x && x.h && new RegExp(`(^|\\s)${t.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')}($|\\s)`, 'i')
      .test(x.h.textContent))?.card;

  const socorro = sel('#socorro-card') || byTitle('Socorro');
  const gremlins = sel('#gremlins-card') || byTitle('Gremlins');
  let cosmicCards = selAll('.book-card h3')
    .filter(h=>/Cosmic Secrets/i.test(h.textContent))
    .map(h=>h.closest('article')||h.closest('.book-card'));

  // Keep only one Cosmic; move it after Socorro
  try {
    if (cosmicCards.length) {
      const cosmic = cosmicCards[0];
      cosmicCards.slice(1).forEach(c => c && c.remove());
      if (socorro && cosmic && cosmic !== socorro.nextElementSibling) {
        socorro.insertAdjacentElement('afterend', cosmic);
      }
      harden(cosmic);
    }
  } catch (e) { console.warn("[fix-books] cosmic:", e); }

  // Ensure action buttons exist
  const ensureButtons = (card, url, labelPrimary, url2, labelSecondary) => {
    if (!card) return;
    let actions = sel('.book-actions, .actions', card);
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'book-actions';
      actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem;';
      (sel('.book-meta', card) || card).appendChild(actions);
    }
    const mkBtn = (cls, href, txt) => {
      const a = document.createElement('a');
      a.className = cls;
      a.href = href;
      a.textContent = txt;
      a.style.cssText = 'display:inline-block;padding:.62rem 1rem;border-radius:.5rem;font-weight:600;text-decoration:none;border:1px solid rgba(0,0,0,.08)';
      if (/primary/.test(cls)) {
        a.style.background = '#2563eb';
        a.style.color = '#fff';
      }
      return a;
    };
    if (url && !sel('a.primary', actions)) actions.appendChild(mkBtn('primary', url, labelPrimary||'Buy on Amazon'));
    if (url2 && !sel('a.secondary', actions)) actions.appendChild(mkBtn('secondary', url2, labelSecondary||'Newsletter'));
  };

  // Harden known cards and restore buttons
  [socorro, gremlins, ...selAll('.book-card')].forEach(harden);

  // Example buttons (swap to your actual URLs)
  // ensureButtons(socorro,  'https://www.amazon.com/dp/REALSOCORROASIN', 'Buy on Amazon', '/newsletter.html', 'Get updates');
  // ensureButtons(gremlins, 'https://www.amazon.com/dp/REALGREMLINSASIN','Buy on Amazon', '/newsletter.html', 'Get updates');

  console.log("[fix-books] done");
})();
