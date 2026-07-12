(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu-principal");
  const event = window.EVENT || {};

  /* ----- WhatsApp links ----- */
  function buildWhatsAppUrl() {
    const phone = (event.whatsapp || "").replace(/\D/g, "");
    const text = encodeURIComponent(event.whatsappMessage || "");
    if (!phone) return null;
    return `https://wa.me/${phone}?text=${text}`;
  }

  function wireWhatsApp() {
    const url = buildWhatsAppUrl();
    const links = [
      document.getElementById("btn-whatsapp"),
      document.getElementById("fab-whatsapp"),
    ].filter(Boolean);

    links.forEach((el) => {
      if (url) {
        el.href = url;
        el.removeAttribute("aria-disabled");
        el.classList.remove("is-disabled");
      } else {
        el.href = "#inscricao";
        el.removeAttribute("target");
        el.addEventListener("click", (e) => {
          e.preventDefault();
          alert(
            "Configure o número do WhatsApp em js/config.js (campo whatsapp) para ativar a confirmação."
          );
        });
      }
    });
  }

  /* ----- Maps ----- */
  const mapsBtn = document.getElementById("btn-maps");
  if (mapsBtn && event.mapsUrl) {
    mapsBtn.href = event.mapsUrl;
  }

  /* ----- Header scroll ----- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  /* ----- Mobile nav ----- */
  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeNav);
    });
  }

  /* ----- Active section highlight ----- */
  const sectionIds = ["sobre", "programacao", "inscricao", "local", "faq"];
  const navLinks = nav
    ? Array.from(nav.querySelectorAll('a[href^="#"]')).filter((a) =>
        sectionIds.includes(a.getAttribute("href").slice(1))
      )
    : [];

  function updateActiveNav() {
    const y = window.scrollY + 120;
    let current = "";
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`);
    });
  }

  /* ----- Reveal on scroll ----- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ----- Init ----- */
  wireWhatsApp();
  onScroll();
  updateActiveNav();
  window.addEventListener("scroll", () => {
    onScroll();
    updateActiveNav();
  }, { passive: true });
})();
