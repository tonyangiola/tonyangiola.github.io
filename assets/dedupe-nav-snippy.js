(function(){
  try{
    // Remove duplicate nav/burger menus – keep only the top-most header/nav
    var navs = document.querySelectorAll('header, .site-header, nav, .navbar');
    if(navs.length > 1){
      // Keep the first visible one; remove later duplicates
      for(var i=1;i<navs.length;i++){
        navs[i].parentNode && navs[i].parentNode.removeChild(navs[i]);
      }
    }
    // Also in case a nav was copied into the article content:
    var article = document.querySelector('article');
    if(article){
      var innerNavs = article.querySelectorAll('header, nav, .navbar, .site-header');
      innerNavs.forEach(function(n){ n.remove(); });
    }
  }catch(e){}
})();
