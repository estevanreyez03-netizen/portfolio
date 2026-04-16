const encabezado = document.querySelector("[data-encabezado]");
const navegacion = document.querySelector("[data-navegacion]");
const botonMenu = document.querySelector("[data-boton-menu]");
const anio = document.querySelector("[data-anio]");
const elementosAparecer = document.querySelectorAll(".aparecer");

anio.textContent = new Date().getFullYear();

const actualizarEncabezado = () => {
  encabezado.classList.toggle("con-desplazamiento", window.scrollY > 20);
};

actualizarEncabezado();
window.addEventListener("scroll", actualizarEncabezado, { passive: true });

botonMenu.addEventListener("click", () => {
  const estaAbierto = navegacion.classList.toggle("abierta");
  document.body.classList.toggle("menu-abierto", estaAbierto);
  botonMenu.setAttribute("aria-expanded", String(estaAbierto));
});

navegacion.addEventListener("click", (evento) => {
  if (evento.target.tagName !== "A") {
    return;
  }

  navegacion.classList.remove("abierta");
  document.body.classList.remove("menu-abierto");
  botonMenu.setAttribute("aria-expanded", "false");
});

const observadorAparicion = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observadorAparicion.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.16 }
);

elementosAparecer.forEach((elemento) => observadorAparicion.observe(elemento));
