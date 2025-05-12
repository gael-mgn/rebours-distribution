// Fonction de génération des triangles
  function generateTriangles(container) {
    const svg = container.querySelector('svg');
    const color = container.getAttribute('data-color') || '#f2ede4';
    const border_color = container.getAttribute('border-color') || '#f2ede4';

    // Nettoyer le contenu SVG
    svg.innerHTML = '';

    const { width, height } = container.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const points = [];

    points.push([0, 0]);
    points.push([width, 0]);
    points.push([width, height]);
    points.push([0, height]);

    const count = 45;

    for (let i = 0; i < count; i++) {
      points.push([
        Math.random() * width,
        Math.random() * height
      ]);
    }

    const spacing = 50;
    for (let x = 0; x <= width; x += spacing) {
      points.push([x, 0]);
      points.push([x, height]);
    }
    for (let y = spacing; y < height; y += spacing) {
      points.push([0, y]);
      points.push([width, y]);
    }

    const delaunay = Delaunator.from(points);
    const triangles = delaunay.triangles;

    for (let i = 0; i < triangles.length; i += 3) {
      const p0 = points[triangles[i]];
      const p1 = points[triangles[i + 1]];
      const p2 = points[triangles[i + 2]];

      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      polygon.setAttribute("points", `${p0[0]},${p0[1]} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`);
      polygon.setAttribute("fill", color);
      polygon.setAttribute("stroke", border_color);
      polygon.setAttribute("stroke-width", "4");
      polygon.classList.add("triangle");
      polygon.style.animationDelay = `${i * 5}ms`;
      svg.appendChild(polygon);
    }
  }

  let observer;
  let containers;

  // Initialisation complète
  function initialize() {
    containers = document.querySelectorAll('.container');

    // Génère les triangles
    containers.forEach(generateTriangles);

    // Supprime l'ancien observer s'il existe
    if (observer) observer.disconnect();

    // Crée un nouvel observer
    observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const svg = entry.target.querySelector('svg');
          const triangles = svg.querySelectorAll('.triangle');
          triangles.forEach(t => t.classList.add('animate'));
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    containers.forEach(container => observer.observe(container));
  }

    let lastWidth2 = window.innerWidth;
    window.addEventListener('resize', () => {
    const currentWidth2 = window.innerWidth;

    if (currentWidth2 !== lastWidth2) {

      lastWidth2 = currentWidth2;
            // Supprimer les classes d'animation pour relancer plus tard
      document.querySelectorAll('.triangle.animate').forEach(t => {
        t.classList.remove('animate');
      });
      initialize(); // Réinitialiser complètement
    }
  });

  // Lancer au chargement initial
  window.addEventListener('load', initialize);