document.addEventListener("DOMContentLoaded", function(){
  // Hide the broken header if present
  var bad = document.querySelector("header.contact-header");
  if (bad) bad.style.display = "none";

  // Inject a clean navbar at top of page
  if (!document.getElementById("books-clean-navbar")) {
    var bar = document.createElement("div");
    bar.id = "books-clean-navbar";
    bar.innerHTML =
      '<header class="site-header"><div class="nav">'+
        '<nav>'+
          '<a href="/">HOME</a>'+
          '<a href="/books.html" class="active" aria-current="page">Books</a>'+
          '<a href="/bio.html">Bio</a>'+
          '<a href="/newsletter.html">Newsletter</a>'+
          '<a href="/contact.html">Contact</a>'+
        '</nav>'+
        '<a class="owner-badge" href="/bio.html">'+
          '<span class="owner-name">Tony Angiola</span>'+
          '<img class="owner-avatar" src="/assets/images/avatar.jpg" alt="Tony Angiola" loading="lazy">'+
        '</a>'+
      '</div></header>';
    document.body.prepend(bar);
  }

  // Remove inline styles that override button colors/visibility
  document.querySelectorAll(".card .btnrow .btn, .book-card .book-actions a, .book-card .buttons a").forEach(function(a){
    a.removeAttribute("style");
    a.classList.remove("ghost","btn-outline","hidden","sr-only");
    a.removeAttribute("aria-hidden");
  });
});
