document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const links = document.querySelectorAll(".main-nav a");

  // Keep visitors at the same section when changing languages.
  const languageLinks = document.querySelectorAll(".language-switcher a");
  const updateLanguageLinks = () => {
    languageLinks.forEach(link => {
      const url = new URL(link.href);
      url.hash = window.location.hash;
      link.href = url.href;
    });
  };
  updateLanguageLinks();
  window.addEventListener("hashchange", updateLanguageLinks);

  // Use each page's translated validation copy, regardless of browser language.
  document.querySelectorAll("#contact-form input[required]").forEach(input => {
    input.addEventListener("invalid", () => {
      const message = input.closest(".form-field").querySelector(".error-message");
      if (message) input.setCustomValidity(message.textContent);
    });
    input.addEventListener("input", () => input.setCustomValidity(""));
  });

  // mobile nav
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  

  // scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // optional: stop observing once visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    revealEls.forEach(el => observer.observe(el));
  }

  // active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navMap = {};

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      navMap[href.slice(1)] = link;
    }
  });

  const setActiveLink = () => {
    let currentId = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentId = section.id;
      }
    });

    links.forEach(link => link.classList.remove("active"));
    if (currentId && navMap[currentId]) {
      navMap[currentId].classList.add("active");
    }
  };

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
});
