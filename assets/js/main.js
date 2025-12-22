document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav.toggle");
  const mainNav = document.querySelector(".main.nav");
  const links = document.querySelectorAll(".main.nav a");
  const contactForm = document.querySelector("#contact form");

  // mobile nav
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    links.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
      });
    });
  }

  // fake contact form submit
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const firstName = formData.get("first name");

      alert(
        `Thank you ${firstName || ""} Your message has been received. Our team will contact you shortly.`
      );

      contactForm.reset();
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
