(function(){
  function move() {
    var news   = document.querySelector('#latest-news');
    if (!news) return;
    // Prefer a whole Author section whose id starts with "author"
    var author = document.querySelector('section[id^="author"]') ||
                 document.querySelector('#author-researcher');
    if (author) {
      author.insertAdjacentElement('afterend', news);
      return;
    }
    // Fallback: after the H2 "Author, Researcher" (robust to &, /, extra spaces)
    var h2s = document.querySelectorAll('h2');
    for (var i=0; i<h2s.length; i++) {
      var t = (h2s[i].textContent || '').replace(/\s+/g,' ').trim();
      if (/^Author\s*[,/&]\s*Researcher$/i.test(t) || /^Author\s*Researcher$/i.test(t)) {
        h2s[i].insertAdjacentElement('afterend', news);
        return;
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', move);
  } else {
    move();
  }
})();
