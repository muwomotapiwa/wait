(() => {
  const countEl = document.getElementById('count');
  const barEl = document.getElementById('bar');
  const deadEl = document.getElementById('dead');
  const restartBtn = document.getElementById('restartBtn');
  const instantBtn = document.getElementById('instantBtn');

  let start = 100;
  let n = start;
  let timer = null;

  const setPct = () => {
    const pct = Math.max(0, Math.min(100, (n / start) * 100));
    barEl.style.setProperty('--pct', pct + '%');
  };

  const render = () => {
    countEl.textContent = String(n);
    document.title = `🔋 ${n} · Battery Boss`;
    countEl.classList.remove('tick');
    // Quick tick bump for a tactile update
    requestAnimationFrame(() => countEl.classList.add('tick'));
    setPct();
  };

  const revealDead = () => {
    document.getElementById('counterWrap').style.display = 'none';
    deadEl.classList.add('show');
    document.title = '💻🪫 · Battery Boss';
  };

  const startTimer = () => {
    stopTimer();
    timer = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        n = 0;
        render();
        stopTimer();
        revealDead();
      } else {
        render();
      }
    }, 1000);
  };

  const stopTimer = () => timer && clearInterval(timer);

  const reset = () => {
    document.getElementById('counterWrap').style.display = '';
    deadEl.classList.remove('show');
    n = start;
    render();
    startTimer();
  };

  restartBtn.addEventListener('click', reset);
  instantBtn.addEventListener('click', () => { n = 1; render(); });

  // Kick things off
  render();
  startTimer();
})();
