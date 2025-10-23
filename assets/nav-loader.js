(function() {
  function canonicalPath(p){ return p.replace(/\/index\.html$/i,'/'); }
  function setActive(root){
    var path = canonicalPath(location.pathname);
    var links = root.querySelectorAll('nav a[href]');
    links.forEach(function(a){
      var href = canonicalPath(a.getAttribute('href')||'');
      var isHome = path === '/' && href === '/';
      var isExact = href !== '/' && href === path;
      var active = isHome || isExact;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
  }
  fetch('/assets/header.html', {cache:'no-store'})
    .then(function(r){ return r.text(); })
    .then(function(html){
      var mount = document.getElementById('site-header');
      if (mount) { mount.outerHTML = html; var H=document.querySelector('header'); if (H) setActive(H); }
    })
    .catch(function(){ /* fail quietly */ });
})();
