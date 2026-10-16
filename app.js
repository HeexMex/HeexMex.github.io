const stage = document.querySelector('.portal-stage');
const portals = [...document.querySelectorAll('.portal')];
const picks = [...document.querySelectorAll('[data-select]')];
const names = [
  ['01', 'FOUND', 'found-clothes.ru'],
  ['02', 'LITOS', 'litos.spb.ru'],
  ['03', 'RIRI DE MODE', 'riridemode.ru'],
  ['04', 'АЛЬЯНС ПЛЮС', 'альянс-плюс.shop'],
  ['05', 'KYRELIX', 'web.kyrelix.org'],
];
let active = 0;
const setActive = (next) => {
  active = (next + portals.length) % portals.length;
  portals.forEach((portal, index) => portal.classList.toggle('active', index === active));
  picks.forEach((button, index) => button.classList.toggle('selected', index === active));
  const [number, name, domain] = names[active];
  stage.querySelector('.portal-label').innerHTML = `<span>${number}</span><b>${name}</b><em>${domain}</em>`;
};
document.querySelector('.previous').addEventListener('click', () => setActive(active - 1));
document.querySelector('.next').addEventListener('click', () => setActive(active + 1));
picks.forEach((button) => button.addEventListener('click', () => setActive(Number(button.dataset.select))));
stage.tabIndex = 0;
stage.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') setActive(active + 1);
  if (event.key === 'ArrowLeft') setActive(active - 1);
});
portals.forEach((portal) => {
  portal.addEventListener('pointermove', (event) => {
    if (!portal.classList.contains('active')) return;
    const box = portal.getBoundingClientRect();
    const yaw = ((event.clientX - box.left) / box.width - .5) * 9;
    const pitch = ((event.clientY - box.top) / box.height - .5) * -7;
    portal.style.setProperty('--yaw', `${yaw}deg`);
    portal.style.setProperty('--pitch', `${pitch}deg`);
  });
  portal.addEventListener('pointerleave', () => {
    portal.style.setProperty('--yaw', '0deg');
    portal.style.setProperty('--pitch', '0deg');
  });
  portal.addEventListener('click', () => window.open(portal.dataset.url, '_blank', 'noopener'));
  portal.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.open(portal.dataset.url, '_blank', 'noopener');
    }
  });
});
const codeAtlas = document.querySelector('.code-atlas');
const codeRun = document.querySelector('.code-run');
const codeOutput = document.querySelector('[data-code-output]');
codeAtlas.addEventListener('pointermove', (event) => {
  const box = codeAtlas.getBoundingClientRect();
  codeAtlas.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width) * 100}%`);
  codeAtlas.style.setProperty('--pointer-y', `${((event.clientY - box.top) / box.height) * 100}%`);
});
codeRun.addEventListener('click', () => {
  const running = codeAtlas.classList.toggle('running');
  codeOutput.textContent = running ? 'compiled — interaction online' : 'ready — move through the work';
});
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
