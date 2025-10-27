(function(){
  function scrub(){
    const nav = document.querySelector('header.site-header .nav');
    if(!nav) return;

    // 1) Kill raw text nodes (the ghost "Tony" would show up this way)
    Array.from(nav.childNodes).forEach(n=>{
      if(n.nodeType === Node.TEXT_NODE && n.textContent.trim()) n.textContent = '';
    });

    // 2) Inside .nav, only allow HOME anchor, .nav-links, and .badge
    Array.from(nav.children).forEach(el=>{
      const ok = el.matches('a[href="/index.html"], .nav-links, .badge');
      if(!ok) el.remove();
    });

    // 3) Inside .nav-links, allow only the 4 real anchors
    const links = nav.querySelector('.nav-links');
    if(links){
      Array.from(links.children).forEach(el=>{
        const ok = el.matches('a[href="/books.html"], a[href="/bio.html"], a[href="/newsletter.html"], a[href="/contact.html"]');
        if(!ok) el.remove();
      });
    }

    // 4) Inside .badge, allow only one IMG and one .name
    const badge = nav.querySelector('.badge');
    if(badge){
      let imgSeen=false, nameSeen=false;
      Array.from(badge.children).forEach(el=>{
        if(el.tagName==='IMG' && !imgSeen){ imgSeen=true; return; }
        if(el.classList.contains('name') && !nameSeen){ nameSeen=true; return; }
        el.remove();
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scrub);
  } else {
    scrub();
  }
})();
