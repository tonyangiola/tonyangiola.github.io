(function(){
  try{
    var BG = '#121a2f';     // sitewide background (tweak if you like)
    var NAV = '#0f1623';    // nav bar
    var NAVTEXT = '#ffffff';// nav links

    var css = [
      ':root{--site-bg:'+BG+';--nav-bg:'+NAV+';--nav-text:'+NAVTEXT+';}',
      'html,body{background:var(--site-bg)!important;background-color:var(--site-bg)!important;margin:0;}',
      'header.site-header, header{background:var(--nav-bg)!important;box-shadow:0 1px 6px rgba(0,0,0,.25);}',
      'header.site-header nav a, header nav a{color:var(--nav-text)!important;text-decoration:none;}',
      'body > main,.page-content,main .content,main .container,main section.page-hero,main section.page-wrap{background:transparent!important;background-color:transparent!important;background-image:none!important;}',
      'body > main::before,body > main::after,.page-content::before,.page-content::after{content:none!important;display:none!important;}'
    ].join('\n');

    var s = document.getElementById('sitewide-assert');
    if(!s){
      s = document.createElement('style');
      s.id = 'sitewide-assert';
      s.type = 'text/css';
      s.appendChild(document.createTextNode(css));
      (document.head || document.documentElement).appendChild(s);
    } else {
      s.textContent = css;
    }
  }catch(e){}
})();
