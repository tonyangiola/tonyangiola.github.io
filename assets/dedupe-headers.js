(function(){
  function topMost(elms){
    var best=null, y=1e9;
    for (var i=0;i<elms.length;i++){
      var r=elms[i].getBoundingClientRect();
      if (r && r.top<y){ y=r.top; best=elms[i]; }
    }
    return best;
  }
  function run(){
    var headers = Array.prototype.slice.call(document.querySelectorAll('header, .header, .site-header, [role="banner"]'));
    if (headers.length <= 1) return;
    var keep = topMost(headers);
    headers.forEach(function(h){
      if (h !== keep) { h.parentNode && h.parentNode.removeChild(h); }
    });
    // inside the kept header, if multiple burger toggles exist, keep first
    var toggles = keep ? keep.querySelectorAll('.hamburger, .menu-toggle, .nav-toggle') : [];
    if (toggles && toggles.length>1){
      for (var i=1;i<toggles.length;i++){
        var t=toggles[i];
        if (t && t.parentNode) t.parentNode.removeChild(t);
      }
    }
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  // also run after load in case late includes inject a second header
  window.addEventListener('load', function(){ setTimeout(run, 0); });
})();
