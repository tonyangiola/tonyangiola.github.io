(function(){
  var HEADSHOT = 'assets/images/tony.jpg';  // <- change if needed
  function ready(fn){ if(document.readyState!=='loading'){fn();} else {document.addEventListener('DOMContentLoaded',fn);} }
  ready(function(){
    var header = document.querySelector('header, .page-header, .site-header');
    if(!header) return;
    if(document.getElementById('mini-brand')) return; // already present

    var a = document.createElement('a');
    a.id = 'mini-brand';
    a.href = '/';
    a.setAttribute('aria-label','Tony Angiola');

    var img = document.createElement('img');
    img.className = 'mini-photo';
    img.src = HEADSHOT;
    img.alt = 'Tony Angiola';
    img.width = 40; img.height = 40;

    var span = document.createElement('span');
    span.className = 'mini-name';
    span.textContent = 'Tony Angiola';

    a.appendChild(img);
    a.appendChild(span);
    header.appendChild(a);
  });
})();
