/* ==========================================================================
   BAIXA CALORIA — script.js
   ========================================================================== */

/**
 * COLE SEU LINK DE CHECKOUT AQUI.
 * Todos os botões de compra (classe "js-buy") usam esta variável.
 */
const CHECKOUT_URL = "https://pay.cakto.com.br/mb5xkdr_1083943";

document.addEventListener("DOMContentLoaded", () => {
  setupBuyButtons();
  setupAccordion();
  setupStickyBar();
});

/* -----------------------------------------------------------
   Botões de compra
   ----------------------------------------------------------- */
function setupBuyButtons() {
  const buyButtons = document.querySelectorAll(".js-buy");

  buyButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // Se o link de checkout ainda não foi configurado,
      // rola até a oferta em vez de navegar para um link vazio.
      if (!CHECKOUT_URL || CHECKOUT_URL === "COLE_SEU_LINK_AQUI") {
        const isOfferAnchor = btn.getAttribute("href") === "#oferta";
        if (!isOfferAnchor) {
          event.preventDefault();
          const offer = document.getElementById("oferta");
          if (offer) offer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      event.preventDefault();
      window.location.href = CHECKOUT_URL;
    });
  });
}

/* -----------------------------------------------------------
   Accordion do FAQ
   ----------------------------------------------------------- */
function setupAccordion() {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      item.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

/* -----------------------------------------------------------
   Barra de CTA fixa (mobile) — aparece após passar o hero
   ----------------------------------------------------------- */
function setupStickyBar() {
  const stickyBar = document.getElementById("stickyBar");
  const hero = document.querySelector(".hero");
  const offer = document.getElementById("oferta");
  if (!stickyBar || !hero) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) {
          const pastHero = !entry.isIntersecting;
          stickyBar.classList.toggle("is-visible", pastHero && !offerInView());
        }
      });
    },
    { threshold: 0 }
  );

  observer.observe(hero);

  function offerInView() {
    if (!offer) return false;
    const rect = offer.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.5 && rect.bottom > 0;
  }

  // Reavalia a visibilidade da barra ao rolar, para escondê-la sobre a oferta.
  window.addEventListener(
    "scroll",
    () => {
      if (stickyBar.classList.contains("is-visible") && offerInView()) {
        stickyBar.classList.remove("is-visible");
      }
    },
    { passive: true }
  );
}
