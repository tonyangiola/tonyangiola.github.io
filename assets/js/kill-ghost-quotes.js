// kill-ghost-quotes.js — surgically remove stray "" and empty images
(function(){
  function stripQuotesNode(node){
    if(!node || node.nodeType !== 3) return; // text node
    var t = (node.nodeValue || "").replace(/\s+/g,'');
    if (t === '""') node.parentNode && node.parentNode.removeChild(node);
  }
  // Check start/end of <html> and <body> (covers header/top-left and footer/bottom-left)
  ['html','body'].forEach(function(sel){
    var el = document.querySelector(sel);
    if(!el) return;
    var f = el.firstChild; while(f && f.nodeType===8) f = f.nextSibling;   // skip comments
    var l = el.lastChild;  while(l && l.nodeType===8) l = l.previousSibling;
    stripQuotesNode(f); stripQuotesNode(l);
  });
  // Remove empty images or images with alt == "" and no usable src
  document.querySelectorAll('img').forEach(function(img){
    var src = img.getAttribute('src');
    var alt = (img.getAttribute('alt')||'').replace(/\s+/g,'');
    if (!src || /^\s*$/.test(src) || (alt==='""' && (!src || /^\s*$/.test(src)))) {
      img.remove();
    }
  });
})();
