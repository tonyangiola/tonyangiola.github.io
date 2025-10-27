document.addEventListener('DOMContentLoaded', function(){
  var header = document.querySelector('header.site-header');
  if(!header) return;
  var nav = header.querySelector('.nav') || header;

  if(!header.querySelector('.nav-toggle')){
    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label','Toggle menu');
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML = '<span class="nav-bars" aria-hidden="true"></span>';
    nav.appendChild(btn);
    btn.addEventListener('click', function(){
      var open = header.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
});
