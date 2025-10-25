(function(){
  function ready(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f);}
  ready(function(){
    // one toggle only
    document.querySelectorAll('#mobile-toggle,.hamburger,button[aria-label="Menu"]').forEach(el=>el.remove());

    var header=document.querySelector('header')||document.body;
    var nav=document.getElementById('site-nav')||header.querySelector('nav')||document.querySelector('nav');

    // Build the button
    var btn=document.createElement('button');
    btn.id='mobile-toggle';
    btn.className='mobile-nav-toggle';
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-label','Open menu');
    btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="2"/><rect x="3" y="11" width="18" height="2"/><rect x="3" y="17" width="18" height="2"/></svg>';
    if (header.firstChild) header.insertBefore(btn, header.firstChild); else header.appendChild(btn);

    // Helper: apply inline styles so it opens even if CSS is stubborn
    function applyOpenStyles(){
      if(!nav) return;
      nav.style.position='fixed';
      nav.style.top='0'; nav.style.left='0'; nav.style.bottom='0';
      nav.style.width='72vw'; nav.style.maxWidth='320px';
      nav.style.background='#0e0f12';
      nav.style.color='#fff';
      nav.style.padding='64px 16px 16px';
      nav.style.overflowY='auto';
      nav.style.zIndex='10000';
      nav.style.boxShadow='4px 0 16px rgba(0,0,0,.35)';
      nav.style.transform='translateX(0)';
      nav.style.opacity='1';
      nav.style.transition='transform .25s ease, opacity .25s ease';
      nav.style.display='block';
      nav.style.visibility='visible';
      document.documentElement.classList.add('mobile-nav-open');
    }
    function applyClosedStyles(){
      if(!nav) return;
      nav.style.transform='translateX(-110%)';
      nav.style.opacity='0';
      document.documentElement.classList.remove('mobile-nav-open');
    }

    function isOpen(){ return document.documentElement.classList.contains('mobile-nav-open'); }

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      isOpen() ? applyClosedStyles() : applyOpenStyles();
      btn.setAttribute('aria-expanded', String(isOpen()));
    });

    document.addEventListener('click', function(e){
      if(!isOpen()) return;
      if (e.target===btn || btn.contains(e.target) || (nav && nav.contains(e.target))) return;
      applyClosedStyles();
      btn.setAttribute('aria-expanded','false');
    });

    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && isOpen()) { applyClosedStyles(); btn.setAttribute('aria-expanded','false'); }});
  });
})();
