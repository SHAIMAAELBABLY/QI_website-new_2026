const menuBtn = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("[data-nav]");
const dropdown = document.querySelector("[data-dropdown]");
const dropdownBtn = dropdown ? dropdown.querySelector(".nav-link-button") : null;

if (menuBtn && siteNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

if (dropdown && dropdownBtn) {
  dropdownBtn.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");
    dropdownBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
      dropdownBtn.setAttribute("aria-expanded", "false");
    }
  });
}

const themeToggle = document.getElementById("themeToggle");
const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? "Light" : "Dark";
  }
};

const savedTheme = localStorage.getItem("qi-theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
    localStorage.setItem("qi-theme", nextTheme);
    applyTheme(nextTheme);
  });
}

const revealElements = document.querySelectorAll(".reveal");
const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  if (!target) return;

  let start = 0;
  const duration = 1200;
  const stepTime = 18;
  const increment = Math.max(1, Math.ceil(target / (duration / stepTime)));

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
      return;
    }
    element.textContent = start;
  }, stepTime);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.delay || 0);
          setTimeout(() => {
            entry.target.classList.add("visible");
            const counter = entry.target.querySelector("[data-count]") || (entry.target.dataset.count ? entry.target : null);
            if (counter && !counter.dataset.animated) {
              counter.dataset.animated = "true";
              animateCounter(counter);
            }
          }, index * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((el, idx) => {
    el.dataset.delay = String(idx % 7);
    revealObserver.observe(el);
  });
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
  document.querySelectorAll("[data-count]").forEach((counter) => animateCounter(counter));
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const formMessage = document.getElementById("formMessage");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formMessage) {
      formMessage.textContent = "Thank you. Your request has been received and our team will contact you shortly.";
    }
    contactForm.reset();
  });
}

const trainingRegistrationForm = document.getElementById("trainingRegistrationForm");
if (trainingRegistrationForm) {
  const trainingFormMessage = document.getElementById("trainingFormMessage");
  trainingRegistrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (trainingFormMessage) {
      trainingFormMessage.textContent = "Registration submitted successfully. QI team will contact you with training details.";
    }
    trainingRegistrationForm.reset();
  });
}

const verificationForm = document.getElementById("verificationForm");
const verificationResult = document.getElementById("verificationResult");

if (verificationForm && verificationResult) {
  verificationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const certificateInput = document.getElementById("certificateId");
    const value = certificateInput ? certificateInput.value.trim() : "";

    if (value.length < 6) {
      verificationResult.textContent = "Invalid certificate ID format. Please verify and try again.";
      return;
    }

    verificationResult.textContent = `Certificate number ${value} has been submitted for verification.`;
    verificationForm.reset();
  });
}
