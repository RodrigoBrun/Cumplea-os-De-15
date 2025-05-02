// ✅ Esperar a que cargue todo el DOM antes de ejecutar código

// 🎬 INICIO GENERAL
// Todo el código se ejecuta cuando el DOM está listo

document.addEventListener("DOMContentLoaded", () => {
  iniciarControlMusica();
  iniciarContadorRegresivo();
  iniciarAnimacionGaleria();
  iniciarCarrusel();
  configurarModalConfirmacion();
  configurarBotonWhatsApp();
});

// 🔊 Control de música (play/pause y autoplay controlado)
function iniciarControlMusica() {
  const musica = document.getElementById("musicaFondo");
  const boton = document.getElementById("toggleMusica");
  const icono = boton?.querySelector("i");

  if (!musica || !boton || !icono) return;

  musica.volume = 0.5;

  // Intentar reproducir al primer clic en cualquier parte de la página
  document.body.addEventListener(
    "click",
    () => {
      if (musica.paused) {
        musica.play().catch(() => {
          console.log("El navegador bloqueó la reproducción automática.");
        });
      }
    },
    { once: true }
  );

  // Alternar play/pause desde el botón
  boton.addEventListener("click", () => {
    if (musica.paused) {
      musica.play();
      icono.classList.remove("fa-play");
      icono.classList.add("fa-music");
    } else {
      musica.pause();
      icono.classList.remove("fa-music");
      icono.classList.add("fa-play");
    }
  });
}

// ⏳ Contador regresivo hasta la fecha del evento
function iniciarContadorRegresivo() {
  const fechaEvento = new Date("August 30, 2025 21:00:00").getTime();

  function actualizarCuenta() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
    document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
  }

  actualizarCuenta();
  setInterval(actualizarCuenta, 1000);
}

// 🎨 Animación para que las imágenes de la galería aparezcan suavemente
function iniciarAnimacionGaleria() {
  const imagenes = document.querySelectorAll(".galeria-fotos img");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  imagenes.forEach((img) => observer.observe(img));
}

// 🎠 Carrusel automático de fotos
function iniciarCarrusel() {
  const track = document.getElementById("carrusel");
  const items = track?.querySelectorAll(".polaroid");
  if (!track || !items.length) return;

  let index = 0;
  setInterval(() => {
    index++;
    if (index >= items.length) index = 0;
    const offset = -index * (items[0].offsetWidth + 16);
    track.style.transform = `translateX(${offset}px)`;
  }, 3000);
}

// 💌 Modal para confirmar asistencia
function configurarModalConfirmacion() {
  const modal = document.getElementById("modalConfirmacion");
  const secciones = document.querySelectorAll("section, header, footer");

  document.querySelectorAll(".boton-confirmar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      secciones.forEach((sec) => (sec.style.display = "none"));
      modal.style.display = "flex";
    });
  });

  document.querySelector(".cerrar-modal")?.addEventListener("click", () => {
    modal.style.display = "none";
    secciones.forEach((sec) => (sec.style.display = ""));
  });
}

// 📲 Botón de compartir por WhatsApp
function configurarBotonWhatsApp() {
  const boton = document.getElementById("botonWhatsApp");
  if (!boton) return;

  boton.addEventListener("click", (e) => {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const mensaje = encodeURIComponent(
      "¡Hola! Mirá esta invitación de 15 años 💖 Claudia Llorente - 30 de abril: "
    );
    window.open(`https://wa.me/?text=${mensaje}${url}`, "_blank");
  });
}

// 🎯 Scroll suave al hacer clic en botones de navegación
function irASeccion(id) {
  const seccion = document.getElementById(id);
  if (seccion) {
    seccion.scrollIntoView({ behavior: "smooth" });
  }
}


function abrirModal(id) {
  document.getElementById(id).style.display = 'flex';
  document.querySelectorAll('section, header, footer').forEach(e => e.style.display = 'none');
}

function cerrarModal(id) {
  document.getElementById(id).style.display = 'none';
  document.querySelectorAll('section, header, footer').forEach(e => e.style.display = '');
}


function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
  }

  // Si ocultás secciones cuando abrís el modal, las volvés a mostrar
  document.querySelectorAll("section, header, footer").forEach(sec => {
    sec.style.display = "";
  });
}
