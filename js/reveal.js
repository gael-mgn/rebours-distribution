

document.addEventListener("DOMContentLoaded", () => {
  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // pour que ça s'anime une seule fois
      }
    });
  }, options);

  const h2Elements =  document.querySelectorAll(".reveal");
  h2Elements.forEach(h2 => observer.observe(h2));
});
