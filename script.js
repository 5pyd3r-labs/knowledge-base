(() => {
  const grid      = document.getElementById('card-grid');
  const empty     = document.getElementById('empty-state');
  const searchEl  = document.getElementById('search');
  const filterGrp = document.getElementById('topic-filters');
  const countEl   = document.getElementById('entry-count');

  let entries = [];
  let activeTopic = 'all';

  fetch('./data.json')
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(data => {
      entries = data;
      init();
    })
    .catch(err => {
      grid.innerHTML = `<div class="empty-state">failed to load data.json — ${err.message}</div>`;
    });

  function init() {
    countEl.textContent = `${entries.length} resource${entries.length !== 1 ? 's' : ''}`;
    buildFilters();
    render();
    searchEl.addEventListener('input', render);
  }

  function buildFilters() {
    const topics = [...new Set(entries.map(e => e.topic).filter(Boolean))].sort();
    topics.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.topic = t;
      btn.textContent = t;
      btn.addEventListener('click', () => setTopic(t));
      filterGrp.appendChild(btn);
    });
    filterGrp.querySelector('[data-topic="all"]').addEventListener('click', () => setTopic('all'));
  }

  function setTopic(topic) {
    activeTopic = topic;
    filterGrp.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.topic === topic);
    });
    render();
  }

  function render() {
    const query = searchEl.value.trim().toLowerCase();

    const filtered = entries.filter(e => {
      const matchTopic = activeTopic === 'all' || e.topic === activeTopic;
      if (!matchTopic) return false;
      if (!query) return true;
      return (
        (e.title       || '').toLowerCase().includes(query) ||
        (e.description || '').toLowerCase().includes(query) ||
        (e.topic       || '').toLowerCase().includes(query) ||
        (e.type        || '').toLowerCase().includes(query) ||
        (e.tags || []).some(t => t.toLowerCase().includes(query))
      );
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      empty.classList.remove('hidden');
      return;
    }

    empty.classList.add('hidden');
    filtered.forEach(e => grid.appendChild(buildCard(e)));
  }

  function buildCard(e) {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = e.slug ? `./${e.slug}/` : '#';
    card.target = '_self';
    card.rel = 'noopener';

    const tagsHtml = (e.tags || [])
      .slice(0, 3)
      .map(t => `<span class="tag">${esc(t)}</span>`)
      .join('');

    const statusClass = `status-${(e.status || 'live').toLowerCase()}`;

    card.innerHTML = `
      <div class="card-type">
        <span class="status-dot ${statusClass}"></span>${esc(e.type || 'resource')}
      </div>
      <div class="card-title">${esc(e.title)}</div>
      <div class="card-desc">${esc(e.description || '')}</div>
      <div class="card-footer">
        <div class="card-tags">${tagsHtml}</div>
        <span class="card-arrow">→</span>
      </div>
    `;

    return card;
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
