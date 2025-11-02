document.addEventListener('DOMContentLoaded', function(){
  try{
    var el = document.querySelector('body.books-page header.site-header .container');
    if(!el) return;

    // Build the exact Home navbar (Books active)
    var nav = document.createElement('nav');
    nav.innerHTML = [
      '<a href="/">HOME</a>',
      '<a href="/books.html" class="active" aria-current="page">Books</a>',
      '<a href="/bio.html">Bio</a>',
      '<a href="/newsletter.html">Newsletter</a>',
      '<a href="/contact.html">Contact</a>'
    ].join('');

    // Remove any existing nav(s) in header
    el.querySelectorAll('nav').forEach(function(n){ n.remove(); });
    // Insert the clean nav as first child in the container
    el.insertBefore(nav, el.firstChild);

    // Ensure badge exists (keep the first one only)
    var badges = el.querySelectorAll('a.owner-badge');
    if(badges.length === 0){
      var b = document.createElement('a');
      b.id = 'ownerBadge';
      b.className = 'owner-badge';
      b.href = '/';
      b.setAttribute('aria-label','Home');
      b.innerHTML = '<img class="owner-badge-img" src="/assets/images/avatar.jpg" alt="Tony Angiola"/>';
      el.appendChild(b);
    }else{
      for(var i=1;i<badges.length;i++){ badges[i].remove(); }
    }
  }catch(e){}
});
