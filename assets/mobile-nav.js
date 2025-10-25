(function(){
  function ready(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f);}
  ready(function(){
    // Signal CSS that burger exists site-wide
    document.documentElement.classList.add('has-mobile-burger');

    // Remove any other toggles so there is only ONE
    document.querySelectorAll('#mobile-toggle,.hamburger,button[aria-label="Menu"]').forEach(el=>el.remove());

    // Build drawer if missing (self-contained)
    var drawer=document.getElementById('mobile-drawer');
    if(!drawer){
      drawer=document.createElement('aside');
      drawer.id='mobile-drawer';
      drawer.innerHTML=[
        '<nav class="mobile-menu" aria-label="Site">',
        '  <a href="/">Home</a>',
        '  <a href="/books.html">Books</a>',
        '  <a href="/bio.html">Bio</a>',
        '  <a href="/newsletter.html">Newsletter</a>',
        '  <a href="/contact.html">Contact</a>',
        '</nav>'
      ].join('');
      document.body.appendChild(drawer);
    }

    // Upper-left hamburger (hard white icon)
    var header=document.querySelector('header')||document.body;
    var btn=document.createElement('button');
    btn.id='mobile-toggle';
    btn.className='mobile-nav-toggle';
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-label','Open menu');
    btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'
                + '<rect x="3" y="5" width="18" height="2" fill="#ffffff"/>'
                + '<rect x="3" y="11" width="18" height="2" fill="#ffffff"/>'
                + '<rect x="3" y="17" width="18" height="2" fill="#ffffff"/>'
                + '</svg>';
    if (header.firstChild) header.insertBefore(btn, header.firstChild); else header.appendChild(btn);

    function open(){ document.documentElement.classList.add('mobile-nav-open'); btn.setAttribute('aria-expanded','true'); }
    function close(){ document.documentElement.classList.remove('mobile-nav-open'); btn.setAttribute('aria-expanded','false'); }
    function isOpen(){ return document.documentElement.classList.contains('mobile-nav-open'); }

    btn.addEventListener('click', function(e){ e.stopPropagation(); isOpen()?close():open(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && isOpen()) close(); });
    document.addEventListener('click', function(e){
      if(!isOpen()) return;
      var onBtn=(e.target===btn || btn.contains(e.target));
      var inDrawer=drawer && drawer.contains(e.target);
      if(!onBtn && !inDrawer) close();
    });
  });
})();
