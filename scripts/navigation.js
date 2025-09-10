// navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('primaryNav');
  const btn = document.getElementById('navToggle');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'block';
    btn.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  });

  // Close nav when focus leaves (mobile)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target) && window.innerWidth < 768) {
      nav.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Prevent keyboard trap: hide menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
});
