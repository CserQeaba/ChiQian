(function () {
  "use strict";

  const header = document.getElementById("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobileNav");
  const contactForm = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const cursorGlow = document.querySelector(".cursor-glow");

  // Header scroll state
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.classList.toggle("active");
      mobileNav.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      mobileNav.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });
  }

  // Cursor glow (desktop)
  if (cursorGlow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;

    document.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
    });

    function animateCursor() {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      cursorGlow.style.left = cx + "px";
      cursorGlow.style.top = cy + "px";
      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // Counter animation
  const statNums = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const isPercent = el.closest(".stat--percent");
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else if (isPercent) {
            el.textContent = target;
          }
        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach((el) => counterObserver.observe(el));

  // Contact form -> mailto
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const company = document.getElementById("company").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent(`[CHIQIAN Inquiry] ${name}${company ? " - " + company : ""}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
          (company ? `Company: ${company}\n` : "") +
          `Email: ${email}\n\n` +
          `Message:\n${message}`
      );

      window.location.href = `mailto:junwj9527@gmail.com?subject=${subject}&body=${body}`;

      showToast("Opening your email client…");
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // Smooth anchor offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
