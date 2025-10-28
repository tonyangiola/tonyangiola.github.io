(function(){
  // Remove text nodes that are ONLY "", "qq{}", or quoted qq{} anywhere in the DOM
  var killSet = new Set(['""','"qq{}"','qq{}','›','↪']);
  var walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, null);
  var toZap = [];
  while (walker.nextNode()) {
    var n = walker.currentNode;
    var t = (n.nodeValue || '').replace(/\s+/g,'');
    if (killSet.has(t)) toZap.push(n);
  }
  toZap.forEach(function(n){ if(n.parentNode) n.parentNode.removeChild(n); });

  // Remove images that can produce fallback text: empty src, missing src, 0/1px, or alt in killSet
  document.querySelectorAll('img').forEach(function(img){
    var src = img.getAttribute('src');
    var alt = (img.getAttribute('alt')||'').replace(/\s+/g,'');
    var w = (img.getAttribute('width')||'').trim();
    var h = (img.getAttribute('height')||'').trim();
    var tiny = /^(0|1|1px)$/i.test(w) || /^(0|1|1px)$/i.test(h);
    if (!src || /^\s*$/.test(src) || tiny || killSet.has(alt)) { img.remove(); }
  });

  // Ensure the author avatar shows (in case prior scripts blanked it)
  var av = document.querySelector('img.author-avatar');
  if (av) {
    av.setAttribute('src','/assets/images/avatar.jpg');
    if (!av.getAttribute('alt')) av.setAttribute('alt','Tony Angiola');
  }
})();
