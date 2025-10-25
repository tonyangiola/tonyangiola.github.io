/* EMERGENCY: disable mobile drawer instantly */
(function(){
  try {
    document.documentElement.classList.remove('mobile-nav-open');
  } catch(e){}
})();
