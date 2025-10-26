document.addEventListener('DOMContentLoaded', function(){
  var el = document.querySelector('.owner-badge');
  if(!el) return;
  if(el.tagName === 'A'){
    var div = document.createElement('div');
    div.className = el.className;
    div.innerHTML = el.innerHTML;
    el.parentNode.replaceChild(div, el);
  }
});
