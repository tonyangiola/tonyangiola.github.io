(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Prefer a marked nav if you have it, else the first <nav>
    var nav = document.querySelector('nav.site-nav') || document.querySelector('header nav') || document.querySelector('nav');
    if (!nav) return;

    // If nav already upgraded, bail
    if (nav.dataset.hamburgerInit === '1') return;
    nav.dataset.hamburgerInit = '1';

    // Create/ensure a wrapper for existing link elements
    var linksWrap = nav.querySelector('.nav-links');
    if (!linksWrap) {
      linksWrap = document.createElement('div');
      linksWrap.className = 'nav-links';
      linksWrap.id = 'nav-links';

      // Move all anchor-like items (a, ul/li > a, buttons) into linksWrap,
      // but skip our soon-to-be hamburger button.
      var moveables = [];
      Array.from(nav.children).forEach(function(child) {
        // Skip script tags and our future button container
        if (child.tagName === 'SCRIPT') return;
        // We’ll move lists and anchors into the wrapper
        if (child.tagName === 'UL' || child.tagName === 'OL' || child.tagName === 'A' || child.tagName === 'DIV') {
          moveables.push(child);
        }
      });
      moveables.forEach(function(el) { linksWrap.appendChild(el); });
      nav.appendChild(linksWrap);
    }

    // Build the hamburger button
    var btn = document.createElement('button');
    btn.className = 'hamburger-btn';
    btn.setAttribute('aria-label', 'Menu');
    btn.setAttribute('aria-controls', 'nav-links');
    btn.setAttribute('aria-expanded', 'false');

    // You can prepend site title text here if you want:
    // var title = document.createElement('span'); title.textContent = 'Menu';
    // btn.appendChild(title);

    var icon = document.createElement('span');
    icon.className = 'hamburger-icon';
    var mid = document.createElement('span'); // middle bar
    icon.appendChild(mid);
    btn.appendChild(icon);

    // Insert button as the first child
    nav.insertBefore(btn, nav.firstChild);

    function openMenu() {
      nav.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function toggleMenu() {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    }

    btn.addEventListener('click', toggleMenu);

    // Close on link tap
    linksWrap.addEventListener('click', function(e) {
      if (e.target.closest('a')) closeMenu();
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target)) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
    });
  });
})();
