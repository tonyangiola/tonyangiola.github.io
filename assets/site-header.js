(function(){
  try{
    // --- canonical Home header markup (as on index.html) ---
    var headerHTML = ''
      + '<header class="site-header site-header  ">'
      + '  <div class="container">'
      + '    <nav>'
      + '      <a href="/" class="">HOME</a>'
      + '      <a href="/books.html">Books</a>'
      + '      <a href="/bio.html">Bio</a>'
      + '      <a href="/newsletter.html">Newsletter</a>'
      + '      <a href="/contact.html">Contact</a>'
      + '    </nav>'
      + '    <a class="owner-badge" href="/bio.html">'
      + '      <span class="owner-name">Tony Angiola</span>'
      + '      <img class="owner-avatar" src="assets/images/avatar.jpg" alt="Tony Angiola" loading="lazy">'
      + '    </a>'
      + '  </div>'
      + '</header>';

    // --- ensure head exists ---
    var html = document.documentElement || document;
    var head = document.head;
    if(!head){
      head = document.createElement('head');
      // place it before the first child (browser will fix structure)
      if (html.firstChild) html.insertBefore(head, html.firstChild);
      else html.appendChild(head);
    }

    // --- ensure styles present (layout-hotfix last) ---
    var want = [
      '/assets/style.css',
      '/assets/override.css',
      '/assets/header-hotfix.css',
      '/assets/layout-hotfix.css' // keep last
    ];
    // simple presence check by href substring
    function hasHref(href){
      var links = head.querySelectorAll('link[rel="stylesheet"]');
      for (var i=0;i<links.length;i++){
        if ((links[i].getAttribute('href')||'').indexOf(href) !== -1) return true;
      }
      return false;
    }
    // insert all but the last in order, then ensure the last is last
    for (var i=0;i<want.length-1;i++){
      if (!hasHref(want[i])){
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = want[i] + '?cb=' + Date.now();
        head.appendChild(l);
      }
    }
    // ensure layout-hotfix is last
    var hotfixHref = want[want.length-1];
    // remove any existing layout-hotfix links so we can add the final one last
    Array.from(head.querySelectorAll('link[rel="stylesheet"]')).forEach(function(l){
      var h = (l.getAttribute('href')||'');
      if (h.indexOf('layout-hotfix.css') !== -1) head.removeChild(l);
    });
    var llast = document.createElement('link');
    llast.rel = 'stylesheet';
    llast.href = hotfixHref + '?cb=' + Date.now();
    head.appendChild(llast);

    // --- ensure canonical header exists at top of body ---
    var body = document.body || (function(){ var b=document.createElement('body'); html.appendChild(b); return b; })();
    if (!document.querySelector('header.site-header')){
      // put it right after <body> open
      body.insertAdjacentHTML('afterbegin', headerHTML);
    }
  }catch(e){}
})();
