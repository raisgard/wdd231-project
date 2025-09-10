// courses.js
// Copy the provided course array here (example data below)
const courses = [
  { id:1, code:'WDD131', title:'Intro to Web', credits:3, department:'WDD', completed:true },
  { id:2, code:'WDD231', title:'Web Frontend Dev I', credits:3, department:'WDD', completed:false },
  { id:3, code:'CSE212', title:'Programming with Data Structures', credits:4, department:'CSE', completed:true },
  { id:4, code:'CSE220', title:'Systems & Networking', credits:3, department:'CSE', completed:false }
];

function renderCourses(list) {
  const container = document.getElementById('courseContainer');
  const creditsEl = document.getElementById('creditsTotal');
  if (!container) return;

  container.innerHTML = '';
  list.forEach(course => {
    const card = document.createElement('article');
    card.className = 'course-card' + (course.completed ? ' completed' : '');
    card.innerHTML = `
      <h3>${course.code} — ${course.title}</h3>
      <p>Dept: ${course.department} • Credits: ${course.credits}</p>
      <p>${course.completed ? '<strong>Completed</strong>' : 'Not completed'}</p>
    `;
    container.appendChild(card);
  });

  // reduce to compute credits shown
  const totalCredits = list.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
  if (creditsEl) creditsEl.textContent = totalCredits;
}

document.addEventListener('DOMContentLoaded', () => {
  // initial render (All)
  renderCourses(courses);

  // filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      let list;
      if (filter === 'wdd') list = courses.filter(c => c.department.toLowerCase() === 'wdd');
      else if (filter === 'cse') list = courses.filter(c => c.department.toLowerCase() === 'cse');
      else list = courses;
      renderCourses(list);
    });
  });
});

