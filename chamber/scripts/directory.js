// directory.js
const directoryEl = document.getElementById('directory');
const searchInput = document.getElementById('searchInput');
const membershipFilter = document.getElementById('membershipFilter');
const viewGridBtn = document.getElementById('viewGrid');
const viewListBtn = document.getElementById('viewList');

let members = [];
let currentView = 'grid';

async function loadMembers(){
  try{
    const res = await fetch('data/members.json');
    if(!res.ok) throw new Error('Network response was not ok');
    members = await res.json();
    renderMembers(members);
  }catch(err){
    directoryEl.innerHTML = '<p>Failed to load members.</p>';
    console.error(err);
  }
}

function renderMembers(list){
  // container class switch
  directoryEl.classList.remove('grid','list');
  directoryEl.classList.add(currentView);

  if(!list.length){
    directoryEl.innerHTML = '<p>No members found.</p>';
    return;
  }

  directoryEl.innerHTML = list.map(m => `
    <article class="card" data-level="${m.level}">
      <h3>${escapeHtml(m.name)}</h3>
      <p class="meta">${escapeHtml(m.industry)} • ${escapeHtml(m.city)}</p>
      <p>${escapeHtml(m.address)}</p>
      <p>${escapeHtml(m.phone)}</p>
      <p class="meta">Membership: ${mapLevel(m.level)}</p>
      <div class="actions">
        <a href="${m.website}" target="_blank" rel="noopener">Website</a>
      </div>
    </article>
  `).join('');
}

function mapLevel(n){
  return n===3? 'Gold' : n===2? 'Silver' : 'Member';
}

function escapeHtml(str){
  if(!str) return '';
  return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[s]);
}

// Filters & search
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const level = membershipFilter.value; // 'all' or '1' '2' '3'

  const filtered = members.filter(m => {
    const matchesQ = q === '' || [m.name, m.industry, m.city].join(' ').toLowerCase().includes(q);
    const matchesLevel = level === 'all' || String(m.level) === level;
    return matchesQ && matchesLevel;
  });

  renderMembers(filtered);
}

// Layout toggles
viewGridBtn.addEventListener('click', ()=>{
  currentView = 'grid';
  viewGridBtn.classList.add('active'); viewGridBtn.setAttribute('aria-pressed','true');
  viewListBtn.classList.remove('active'); viewListBtn.setAttribute('aria-pressed','false');
  applyFilters();
});

viewListBtn.addEventListener('click', ()=>{
  currentView = 'list';
  viewListBtn.classList.add('active'); viewListBtn.setAttribute('aria-pressed','true');
  viewGridBtn.classList.remove('active'); viewGridBtn.setAttribute('aria-pressed','false');
  applyFilters();
});

searchInput.addEventListener('input', debounce(applyFilters, 250));
membershipFilter.addEventListener('change', applyFilters);

// helpers
function debounce(fn, wait){
  let t;
  return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); };
}

// last modified & copyright
window.addEventListener('DOMContentLoaded', ()=>{
  const lmEl = document.getElementById('lastModifiedValue');
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  if(lmEl) lmEl.textContent = document.lastModified || 'Unknown';
  loadMembers();
});
