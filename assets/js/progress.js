// assets/js/progress.js
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".verse-nav a");
  navLinks.forEach(link => {
    if (link.href.endsWith(window.location.pathname)) {
      link.classList.add("active");
    }
  });
});