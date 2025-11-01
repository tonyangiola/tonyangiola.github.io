(function(){
  try {
    // match "my", optionally "U+...", then up to ~40 non-letters like () = - { } etc.
    var rx = /^\s*my(?:\s*U\+\S+)?[^\p{L}]{0,40}$/iu;

    // Remove text nodes
    var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var kill = [];
    for (var n; (n = tw.nextNode()); ) {
      var t = (n.textContent || "").trim();
      if (t && rx.test(t)) kill.push(n);
    }
    kill.forEach(function(n){
      if (n.parentNode) n.parentNode.removeChild(n);
    });

    // Remove tiny elements that only contain that junk
    var candidates = document.querySelectorAll('p, small, span, div, h2, h3, h4');
    candidates.forEach(function(el){
      var t = (el.textContent || "").trim();
      if (t && rx.test(t)) el.remove();
    });
  } catch(_) {}
})();
