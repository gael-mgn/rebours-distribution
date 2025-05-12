document.addEventListener("DOMContentLoaded", () => {

// Menu
  const navbar = document.getElementById('navbar');
    const main = document.getElementById('hero');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollUpTolerance = 15;
    const hideThreshold = 300;

    function adjustMainPadding() {
      const navbarHeight = navbar.offsetHeight;
      main.style.marginTop = navbarHeight + 'px';
    }

    window.addEventListener('load', () => {
      adjustMainPadding();
      // S'assurer que la navbar est visible au chargement
      navbar.classList.remove('hidden');
    });

    window.addEventListener('resize', adjustMainPadding);

    window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > hideThreshold) {
      navbar.classList.add('hidden');
      // fermer le menu
       navLinks.classList.remove('active'); // Ajoute cette ligne
    } else if (lastScrollTop - currentScroll > scrollUpTolerance) {
      navbar.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

  });