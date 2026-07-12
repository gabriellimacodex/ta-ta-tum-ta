(function () {
  const root = document.getElementById("countdown");
  const note = document.getElementById("countdown-note");
  if (!root || !window.EVENT) return;

  const target = new Date(window.EVENT.dateISO).getTime();
  if (Number.isNaN(target)) {
    if (note) note.textContent = "Data do evento a confirmar.";
    return;
  }

  const els = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    minutes: root.querySelector('[data-unit="minutes"]'),
    seconds: root.querySelector('[data-unit="seconds"]'),
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0) {
      Object.values(els).forEach((el) => {
        if (el) el.textContent = "00";
      });
      if (note) note.textContent = "É hoje! A roda te espera.";
      return;
    }

    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    if (els.days) els.days.textContent = pad(days);
    if (els.hours) els.hours.textContent = pad(hours);
    if (els.minutes) els.minutes.textContent = pad(minutes);
    if (els.seconds) els.seconds.textContent = pad(seconds);

    if (note) {
      note.textContent = "Contagem para 12 de setembro de 2026";
    }
  }

  tick();
  setInterval(tick, 1000);
})();
