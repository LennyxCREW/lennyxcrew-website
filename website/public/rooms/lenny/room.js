(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pending = new Map();
  const completed = new Set();
  const sky = document.querySelector('.sky');
  const stars = [...document.querySelectorAll('.star')];
  let active = null;
  let lightShown = false;
  const clearPending = () => { for (const timer of pending.values()) clearTimeout(timer); pending.clear(); };
  const schedule = (element) => {
    const key = element.dataset.moment;
    if (reduced.matches || document.hidden || completed.has(key) || pending.has(key)) return;
    if (key === 'entrance' && !lightShown) { lightShown = true; sky.classList.add('arrival'); }
    pending.set(key, setTimeout(() => {
      pending.delete(key);
      if (active !== element || reduced.matches || document.hidden) return;
      completed.add(key);
      const index = key === 'entrance' ? 0 : Number(key.replace('scene', ''));
      stars[index]?.classList.add('glint');
    }, key === 'entrance' ? 4500 : 2700));
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const key = entry.target.dataset.moment;
        if (entry.isIntersecting) { active = entry.target; schedule(entry.target); }
        else { clearTimeout(pending.get(key)); pending.delete(key); if (active === entry.target) active = null; }
      }
    }, { rootMargin: '-12% 0px -48% 0px', threshold: 0 });
    document.querySelectorAll('[data-moment]').forEach(el => observer.observe(el));
  }
  reduced.addEventListener('change', () => {
    clearPending();
    if (reduced.matches) { sky.classList.remove('arrival'); stars.forEach(s => s.classList.remove('glint')); }
    else if (active) schedule(active);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearPending(); else if (active) schedule(active);
  });
})();
