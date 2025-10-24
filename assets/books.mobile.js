(function() {
  function phone() { return (window.innerWidth || document.documentElement.clientWidth) <= 600; }
  function fixBooksMedia() {
    if (!phone()) return;
    var root = document;
    // Wrap iframes in a responsive box if not already wrapped
    root.querySelectorAll('.book-card iframe').forEach(function(iframe) {
      if (iframe.closest('.embed-16x9')) return;
      var wrap = document.createElement('div');
      wrap.className = 'embed-16x9';
      iframe.parentNode.insertBefore(wrap, iframe);
      wrap.appendChild(iframe);
    });
    // Clean up <video> sizing attributes at runtime (belts & suspenders)
    root.querySelectorAll('.book-card video').forEach(function(v) {
      v.removeAttribute('width'); v.removeAttribute('height'); v.style.width = '100%'; v.style.height = 'auto';
      v.setAttribute('playsinline',''); v.setAttribute('webkit-playsinline',''); v.setAttribute('preload','metadata');
    });
  }
  document.addEventListener('DOMContentLoaded', fixBooksMedia);
  window.addEventListener('resize', function() { if (phone()) fixBooksMedia(); });
})();
