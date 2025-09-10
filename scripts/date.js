// date.js
document.addEventListener('DOMContentLoaded', () => {
  // Current year for copyright
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // lastModified value
  const lastModifiedEl = document.getElementById('lastModifiedValue');
  if (lastModifiedEl) {
    lastModifiedEl.textContent = document.lastModified || 'Unknown';
  }
});
