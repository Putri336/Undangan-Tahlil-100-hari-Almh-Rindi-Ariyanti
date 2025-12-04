// Background Music Control
const bgMusic = document.getElementById("bgMusic");
const musicControl = document.getElementById("musicControl");
let isPlaying = false;

// Try to autoplay on user interaction
document.addEventListener(
  "click",
  function initAudio() {
    if (!isPlaying) {
      bgMusic
        .play()
        .then(() => {
          isPlaying = true;
          musicControl.classList.add("playing");
        })
        .catch((err) => {
          console.log("Autoplay prevented:", err);
        });
    }
  },
  { once: true }
);

// Music control button
musicControl.addEventListener("click", function (e) {
  e.stopPropagation();
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    musicControl.classList.remove("playing");
  } else {
    bgMusic
      .play()
      .then(() => {
        isPlaying = true;
        musicControl.classList.add("playing");
      })
      .catch((err) => {
        console.error("Error playing audio:", err);
      });
  }
});

// Handle audio events
bgMusic.addEventListener("ended", function () {
  isPlaying = false;
  musicControl.classList.remove("playing");
});

bgMusic.addEventListener("pause", function () {
  if (isPlaying) {
    isPlaying = false;
    musicControl.classList.remove("playing");
  }
});

bgMusic.addEventListener("play", function () {
  if (!isPlaying) {
    isPlaying = true;
    musicControl.classList.add("playing");
  }
});

// Navigation Active State
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scroll for navigation links with ripple effect
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      // Scroll to section
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;

        // Remove active class from all, add to clicked one temporarily
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active state on scroll with better detection
  function updateActiveNav() {
    const navHeight = document.querySelector(".navbar").offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 50;

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = sectionId;
      }
    });

    // If at the very top, set beranda as active
    if (window.scrollY < 100) {
      current = "beranda";
    }

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const linkHref = link.getAttribute("href").substring(1); // Remove #
      if (linkHref === current) {
        link.classList.add("active");
      }
    });
  }

  // Throttle scroll event for better performance
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateActiveNav);
  });

  updateActiveNav();
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Initialize animations
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".content-wrapper, .profile-photo, .qr-container, .event-details-box, .deceased-info"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(element);
  });
});

// Open Google Maps location
function openMap() {
  const mapUrl = "https://maps.app.goo.gl/Jg85Evcb4r82RH858";
  window.open(mapUrl, "_blank");
}

// Prevent right-click on images (optional protection)
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

// Add loading state
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
