// COLE SEU LINK DE CHECKOUT ENTRE AS ASPAS.
// Exemplo: const CHECKOUT_URL = "https://seu-checkout.com/abc";
const CHECKOUT_URL = "https://pay.kiwify.com.br/X1dp1et";

const buyButtons = document.querySelectorAll('[data-buy]');
buyButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (CHECKOUT_URL.trim()) {
      event.preventDefault();
      window.location.href = CHECKOUT_URL;
      return;
    }
    event.preventDefault();
    document.querySelector('#oferta')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();
