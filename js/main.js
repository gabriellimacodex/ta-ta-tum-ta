(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu-principal");
  const event = window.EVENT || {};

  function waUrl(message) {
    const phone = (event.whatsapp || "").replace(/\D/g, "");
    if (!phone) return null;
    const text = encodeURIComponent(message || event.whatsappMessage || "");
    return `https://wa.me/${phone}?text=${text}`;
  }

  /* ----- Portas: pagamento + WhatsApp ----- */
  function wirePaths() {
    const paths = event.paths || {};

    Object.keys(paths).forEach((key) => {
      const path = paths[key];
      if (!path) return;

      const cta = document.querySelector(`.path-cta[data-path="${key}"]`);
      const wa = document.querySelector(`.path-wa[data-path-wa="${key}"]`);
      const priceEl = document.querySelector(`[data-path-price="${key}"]`);

      if (priceEl && path.priceLabel) {
        priceEl.textContent = path.priceLabel;
      }

      const msg = path.whatsappMessage || event.whatsappMessage;
      const payment = (path.paymentUrl || "").trim();
      const chat = waUrl(msg);

      if (cta) {
        if (payment) {
          cta.href = payment;
          cta.target = "_blank";
          cta.rel = "noopener noreferrer";
          if (path.ctaLabel) cta.textContent = path.ctaLabel;
        } else if (chat) {
          // Sem checkout ainda: CTA principal vai pro WhatsApp
          cta.href = chat;
          cta.target = "_blank";
          cta.rel = "noopener noreferrer";
          if (path.ctaLabel) cta.textContent = path.ctaLabel;
        } else {
          cta.href = "#participar";
          cta.removeAttribute("target");
        }
      }

      if (wa) {
        if (chat) {
          wa.href = chat;
          wa.target = "_blank";
          wa.rel = "noopener noreferrer";
        } else {
          wa.href = "#participar";
          wa.removeAttribute("target");
        }
      }
    });
  }

  /* ----- WhatsApp genérico (rodapé da seção + FAB) ----- */
  function wireWhatsApp() {
    const url = waUrl(event.whatsappMessage);
    const links = [
      document.getElementById("btn-whatsapp"),
      document.getElementById("fab-whatsapp"),
    ].filter(Boolean);

    links.forEach((el) => {
      if (url) {
        el.href = url;
      } else {
        el.href = "#participar";
        el.removeAttribute("target");
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
  const sectionIds = ["sobre", "programacao", "participar", "local", "faq"];
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
  wirePaths();
  wireWhatsApp();
  onScroll();
  updateActiveNav();
  window.addEventListener(
    "scroll",
    () => {
      onScroll();
      updateActiveNav();
    },
    { passive: true }
  );
})();
