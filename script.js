
// ===========================
// SAYICAMATE - MAIN JAVASCRIPT
// ===========================

// 1. NOMOR WHATSAPP
// Ganti dengan nomor WhatsApp bisnis kamu.
// Format: kode negara + nomor, tanpa tanda +, spasi, atau strip.

const whatsappNumber = "6281254187171";

const whatsappMessage =
  "Halo SayicaMate! Saya tertarik untuk membuat undangan digital. Boleh minta informasi lebih lanjut?";

const whatsappLink =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

document.getElementById("contactButton").href = whatsappLink;


// 2. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  menuToggle.textContent =
    navMenu.classList.contains("active") ? "✕" : "☰";
});

// Tutup menu setelah link diklik
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});


// 3. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(
  ".section-heading, .demo-card, .feature-card, .step, .testimonial-box, .faq-list"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});
