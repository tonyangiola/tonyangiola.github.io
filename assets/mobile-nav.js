(function(){
  function ready(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f);}
  ready(function(){
    // remove any previous/buggy toggles so we only have ONE
    document.querySelectorAll('#mobile-toggle,.hamburger,button[aria-label="Menu"]').forEach(el=>el.remove());

    var header=document.querySelector('header')||document.body;
    var nav = document.getElementById('site-nav') || header.querySelector('nav') || document.querySelector('nav');

    // if no nav found, bail safely
    if(!nav){ return; }

    // build the button (SVG = no font needed; avoids "square" icon)
    var btn=document.createElement('button');
    btn.id='mobile-toggle';
    btn.className='mobile-nav-toggle';
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls', nav.id || 'site-nav');
    btn.setAttribute('aria-label','Open menu');
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="2"/><rect x="3" y="11" width="18" height="2"/><rect x="3" y="17" width="18" height="2"/></svg>';

    // put it at the very top-left of the header
    if (header.firstChild) header.insertBefore(btn, header.firstChild); else header.appendChild(btn);

    function open(){
      document.documentElement.classList.add('mobile-nav-open');
      btn.setAttribute('aria-expanded','true');
    }
    function close(){
      document.documentElement.classList.remove('mobile-nav-open');
      btn.setAttribute('aria-expanded','false');
    }

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      if(document.documentElement.classList.contains('mobile-nav-open')) close(); else open();
    });

    // close when clicking outside the nav
    document.addEventListener('click', function(e){
      if(!document.documentElement.classList.contains('mobile-nav-open')) return;
      if (e.target===btn || btn.contains(e.target) || nav.contains(e.target)) return;
      close();
    });

    // Esc to close
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
  });
})();
