// ui.js
document.addEventListener('DOMContentLoaded', ()=>{
  const nav = document.getElementById('primaryNav');
  const btn = document.getElementById('navToggle');
  if(!btn || !nav) return;
  btn.addEventListener('click', ()=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'block';
  });
});

