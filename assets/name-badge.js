(function(){
  function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }
  ready(function(){
    // Look for the small headshot image in the header (common patterns)
    var img = document.querySelector(
      'header img[class*="avatar"], header img[class*="headshot"], header img[class*="profile"], header img[src*="avatar-small"], header img[src*="avatar"], header img[src*="headshot"], header img[src*="profile"], header img[src*="tony"]'
    );
    if(!img) return;                         // no avatar found, nothing to do
    var nav = img.closest('nav') || document.querySelector('header nav');
    if(!nav) return;

    // Prevent duplicates if already added
    if(nav.querySelector('.brand-name-ur-badge')) return;

    // Ensure the nav can anchor absolutely positioned children
    var cs = getComputedStyle(nav);
    if(cs.position === 'static'){ nav.style.position = 'relative'; }

    // Create and place the badge
    var span = document.createElement('span');
    span.className = 'brand-name-ur-badge';
    span.textContent = 'Tony Angiola';
    // Insert directly after the image (still absolutely positioned via CSS)
    img.insertAdjacentElement('afterend', span);
  });
})();
