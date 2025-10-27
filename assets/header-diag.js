(function(){
  function show(){
    const h = document.querySelector('header.site-header');
    if(!h) return;
    const nodes = h.querySelectorAll('*');
    nodes.forEach(n=>{
      const txt = (n.childNodes && Array.from(n.childNodes).filter(x=>x.nodeType===3).map(x=>x.textContent.trim()).join(' ').trim()) || '';
      if(txt) {
        console.log('[HEADER TEXT]', n.tagName.toLowerCase()+ (n.className?'.'+String(n.className).replace(/\s+/g,'.'):'') , '->', JSON.stringify(txt));
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
