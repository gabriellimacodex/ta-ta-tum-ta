(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu-principal");
  const event = window.EVENT || {};
  const invest = event.investment || {};

  function waUrl(message) {
    const phone = (event.whatsapp || "").replace(/\D/g, "");
    if (!phone) return null;
    const text = encodeURIComponent(message || event.whatsappMessage || "");
    return `https://wa.me/${phone}?text=${text}`;
  }

  /* ----- Investimento: preço, includes, payment, Pix ----- */
  function wireInvestment() {
    const priceEl = document.getElementById("invest-price");
    if (priceEl && invest.priceLabel) {
      priceEl.textContent = invest.priceLabel;
    }

    const list = document.getElementById("invest-includes");
    if (list && Array.isArray(invest.includes) && invest.includes.length) {
      list.innerHTML = invest.includes.map((item) => `<li>${item}</li>`).join("");
    }

    const payBtn = document.getElementById("btn-payment");
    if (payBtn && invest.paymentUrl) {
      payBtn.href = invest.paymentUrl;
    }

    const pixKey = invest.pixKey || invest.pixLabel || "";
    const pixEl = document.getElementById("pix-key");
    if (pixEl && pixKey) {
      pixEl.textContent = pixKey;
    }

    const copyBtn = document.getElementById("btn-copy-pix");
    const feedback = document.getElementById("pix-feedback");
    if (copyBtn && pixKey) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pixKey);
          if (feedback) {
            feedback.hidden = false;
            feedback.textContent = "Pix copiado!";
            setTimeout(() => {
              feedback.hidden = true;
            }, 2500);
          }
        } catch {
          // fallback
          const range = document.createRange();
          range.selectNodeContents(pixEl);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          if (feedback) {
            feedback.hidden = false;
            feedback.textContent = "Selecione e copie o e-mail Pix.";
          }
        }
      });
    }
  }

  /* ----- Formulário → WhatsApp ----- */
  function wireForm() {
    const form = document.getElementById("insc-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const lines = [
        "📋 *Inscrição — Capoeira na Conectividade dos Tambores 2026*",
        "",
        `*Responsável:* ${data.get("responsavel") || "-"}`,
        `*Praticante:* ${data.get("praticante") || "-"}`,
        `*Graduação atual:* ${data.get("graduacao") || "-"}`,
        `*Idade:* ${data.get("idade") || "-"}`,
        `*Telefone:* ${data.get("telefone") || "-"}`,
        `*Pagamento:* ${data.get("pagamento") || "-"}`,
        `*Camiseta:* ${data.get("camiseta") || "-"}`,
        `*Observações:* ${data.get("obs") || "-"}`,
        "",
        "Declaro estar ciente das informações do evento.",
        "",
        invest.paymentUrl
          ? `Link de pagamento: ${invest.paymentUrl}`
          : "",
        invest.pixKey ? `Pix: ${invest.pixKey}` : "",
      ].filter(Boolean);

      const url = waUrl(lines.join("\n"));
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        alert("WhatsApp não configurado. Contate a organização.");
      }
    });
  }

  /* ----- WhatsApp genérico (rodapé + FAB) ----- */
  function wireWhatsApp() {
    const url = waUrl(event.whatsappMessage);
    [
      document.getElementById("btn-whatsapp"),
      document.getElementById("fab-whatsapp"),
    ]
      .filter(Boolean)
      .forEach((el) => {
        el.href = url || "#participar";
        if (!url) el.removeAttribute("target");
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
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  }

  /* ----- Active section ----- */
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

  /* ----- Reveal ----- */
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

  wireInvestment();
  wireForm();
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
