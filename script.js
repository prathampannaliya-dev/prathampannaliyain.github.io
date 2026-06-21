/* ===========================================================
   PRATHAM PANNALIYA — PORTFOLIO SCRIPT
   Handles: scroll progress bar, navbar state + active link,
   mobile menu, scroll-reveal animations, hero entrance,
   and the polaroid photo slideshow.
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById("progressBar");
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
  }

  /* ---------- Navbar: scrolled state ---------- */
  const navbar = document.getElementById("navbar");
  function updateNavbarState() {
    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        updateNavbarState();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateProgressBar();
  updateNavbarState();

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  // Close the mobile menu whenever a nav link is tapped
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Active section highlight in navbar ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------- Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => {
      // Hero elements animate in immediately on load (handled below),
      // everything else animates in as it scrolls into view.
      if (!el.closest(".hero")) revealObserver.observe(el);
    });
  }

  /* ---------- Hero entrance animation (plays once on load) ---------- */
  window.requestAnimationFrame(() => {
    document.querySelectorAll(".hero .reveal").forEach((el) => {
      el.classList.add("is-visible");
    });
  });

  /* ---------- Polaroid photo slideshow ---------- */
  const stack = document.getElementById("polaroidStack");
  if (stack) {
    const slides = Array.from(stack.querySelectorAll(".polaroid"));
    const dotsWrap = document.getElementById("polaroidDots");
    let current = slides.findIndex((s) => s.classList.contains("is-active"));
    if (current === -1) current = 0;
    let timer = null;
    const INTERVAL = 4200;

    // Build dot controls
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "polaroid-dots__dot" + (i === current ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Show photo " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      slides[current].classList.remove("is-active");
      dotsWrap.children[current].classList.remove("is-active");
      current = index;
      slides[current].classList.add("is-active");
      dotsWrap.children[current].classList.add("is-active");
    }

    function next() {
      goTo((current + 1) % slides.length);
    }

    function start() {
      if (prefersReducedMotion || slides.length < 2) return;
      stop();
      timer = setInterval(next, INTERVAL);
    }
    function stop() {
      if (timer) clearInterval(timer);
    }

    start();
    stack.addEventListener("mouseenter", stop);
    stack.addEventListener("mouseleave", start);
    stack.addEventListener("focusin", stop);
    stack.addEventListener("focusout", start);
  }
});
