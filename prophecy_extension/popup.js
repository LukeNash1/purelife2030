const milestones = [
  { date: new Date('2027-03-27'), label: 'Mar 27\u201328, 2027', title: 'Abomination of Desolation', dot: 'dot-ab' },
  { date: new Date('2027-04-27'), label: 'Apr 27\u201328, 2027', title: 'The Latter Rains Fall', dot: 'dot-rain' },
  { date: new Date('2030-09-27'), label: 'Sep 27\u201328, 2030', title: 'Yom Teruah \u2014 Resurrection & Rapture', dot: 'dot-rapture' },
  { date: new Date('2030-10-07'), label: 'Oct 7\u201312, 2030', title: 'Yom Kippur to Sukkot \u2014 Millennial Kingdom', dot: 'dot-kingdom' }
];

function daysUntil(d) {
  return Math.floor((d - new Date()) / 86400000);
}

function buildMilestones() {
  const now = new Date();
  const el = document.getElementById('milestones');
  if (!el) return;
  el.innerHTML = '';
  milestones.forEach(function(m) {
    const days = daysUntil(m.date);
    const past = m.date < now;
    const row = document.createElement('div');
    row.className = 'milestone';
    row.innerHTML =
      '<div class="ms-dot ' + m.dot + '"' + (past ? ' style="opacity:0.3;"' : '') + '></div>' +
      '<div class="ms-body">' +
        '<div class="ms-title"' + (past ? ' style="opacity:0.4;"' : '') + '>' +
          m.title +
          (!past ? '<span class="ms-days">' + days.toLocaleString() + 'd</span>' : '') +
        '</div>' +
        '<div class="ms-date">' + m.label + '</div>' +
      '</div>';
    el.appendChild(row);
  });
}

function tick() {
  const now = new Date();
  const target = new Date('2027-03-27T00:00:00');
  const diff = Math.floor((target - now) / 86400000);
  const cdEl = document.getElementById('cd-days');
  const tlEl = document.getElementById('today-line');
  if (cdEl) cdEl.textContent = diff > 0 ? diff.toLocaleString() : '0';
  if (tlEl) tlEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

document.addEventListener('DOMContentLoaded', function() {
  buildMilestones();
  tick();
  setInterval(tick, 60000);
});
