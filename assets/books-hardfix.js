(function(){
  try{
    var sels=["#books-app .swiper","#books-app .swiper-container","#books-app .swiper-wrapper","#books-app .swiper-slide"];
    var nodes=[];
    for(var i=0;i<sels.length;i++){ nodes = nodes.concat([].slice.call(document.querySelectorAll(sels[i]))); }
    nodes.forEach(function(n){
      if(n && n.removeAttribute){ n.removeAttribute("style"); }
      if(n && n.style){
        n.style.transform=""; n.style.webkitTransform="";
        n.style.width=""; n.style.maxWidth=""; n.style.overflow="";
        n.style.position=""; n.style.left=""; n.style.top="";
        n.style.height="";
      }
    });
    [].slice.call(document.querySelectorAll("#books-app img")).forEach(function(img){
      img.removeAttribute("width"); img.removeAttribute("height");
      img.style.maxWidth="100%"; img.style.height="auto";
    });
  }catch(e){}
})();
