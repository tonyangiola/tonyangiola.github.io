  (function(){
    function isPhone(){return (window.innerWidth||document.documentElement.clientWidth)<=600;}
    function fix(){ if(!isPhone()) return;
      document.querySelectorAll('.book-card iframe').forEach(function(el){
        if(el.closest('.embed-16x9')) return;
        var w=document.createElement('div'); w.className='embed-16x9';
        el.parentNode.insertBefore(w,el); w.appendChild(el);
      });
      document.querySelectorAll('.book-card video').forEach(function(v){
        v.removeAttribute('width'); v.removeAttribute('height');
        v.style.width='100%'; v.style.height='auto';
        v.setAttribute('playsinline',''); v.setAttribute('webkit-playsinline',''); v.setAttribute('preload','metadata');
      });
    }
    document.addEventListener('DOMContentLoaded',fix);
    window.addEventListener('resize',function(){ if(isPhone()) fix(); });
  })();
