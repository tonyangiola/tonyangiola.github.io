(function(){
  function $(q,ctx){return (ctx||document).querySelector(q);}
  function $all(q,ctx){return Array.prototype.slice.call((ctx||document).querySelectorAll(q));}

  function rightmostAvatar(){
    const header = $('header'); if(!header) return null;
    const cands = $all('header img, header picture img');
    if(!cands.length) return null;
    // Prefer obvious avatars first
    let scored = cands.map(img=>{
      let s = 0;
      if(/avatar|badge/i.test(img.className)) s+=5;
      if(/tony/i.test(img.alt||'')) s+=3;
      if((img.width&&img.width<=64)||(img.height&&img.height<=64)) s+=1;
      const rect = img.getBoundingClientRect();
      return {img, s, x: rect.right, y: rect.top};
    });
    // pick highest score, tie-break by rightmost
    scored.sort((a,b)=> (b.s-a.s) || (b.x-a.x));
    return scored[0].img;
  }

  function ensureBadge(){
    const header = $('header'); if(!header) return;
    header.style.position = 'relative';

    // Lock nav height so it doesn't jump
    const nav = $('header nav');
    if (nav){
      nav.style.minHeight = '56px';
      nav.style.height    = '56px';
      nav.style.display   = 'flex';
      nav.style.alignItems= 'center';
      nav.style.justifyContent = 'center';
      nav.style.boxSizing = 'border-box';
      nav.style.margin    = '8px auto';
    }

    // Find the avatar we should use
    const av = rightmostAvatar();
    if(!av) return;

    // Normalize avatar appearance/position
    av.id = 'siteAvatar';
    Object.assign(av.style, {
      position: 'absolute',
      top: '10px',
      right: '14px',
      width: '36px',
      height:'36px',
      borderRadius: '50%',
      objectFit: 'cover',
      zIndex: '5',
      display: 'block',
      opacity: '1',
      visibility:'visible',
      filter: 'none'
    });

    // Remove any duplicate name pills we might find
    $all('.badge-name,.name-pill,.header-name').forEach(n=>n.remove());

    // Ensure exactly one label to the LEFT of the avatar
    let label = $('#siteNameLabel', header);
    if(!label){
      label = document.createElement('span');
      label.id = 'siteNameLabel';
      label.textContent = 'Tony Angiola';
      header.appendChild(label);
    }
    Object.assign(label.style, {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: (14+36+10)+'px', // avatar right + width + gap
      whiteSpace: 'nowrap',
      fontWeight: '600',
      fontSize: '.95rem',
      lineHeight: '1',
      color: '#fff',
      textShadow: '0 1px 2px rgba(0,0,0,.6)',
      zIndex: '6'
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensureBadge);
  }else{
    ensureBadge();
  }
})();
