// Datos de contacto: cambia aquí y se actualiza todo el sitio.
const CONTACTO = {
  whatsapp: "584126424915", // solo números, con código de país
  mensaje: "Hola Rogienny, quiero cotizar contenido UGC para mi marca.",
  email: "", // pendiente: cuando lo tengas, ponlo aquí y aparece en Contacto
};

(() => {
  // "PORTAFOLIO" ocupa justo el ancho entre los márgenes de la portada
  const hero = document.querySelector(".hero");
  const word = document.querySelector(".hero__word");
  const fitWord = () => {
    const pad = parseFloat(getComputedStyle(document.querySelector(".hero__top")).paddingLeft) || 0;
    const top = document.querySelector(".hero__top").getBoundingClientRect();
    const target = top.width - (getComputedStyle(document.querySelector(".hero__top")).position === "static" ? pad * 2 : 0);
    word.style.fontSize = "100px";
    const w = word.firstElementChild.getBoundingClientRect().width;
    if (!w || !target) return;
    const size = (100 * target) / w;
    hero.style.setProperty("--ws", `${size.toFixed(2)}px`);
    word.style.fontSize = "";
  };
  fitWord();
  document.fonts && document.fonts.ready.then(fitWord);
  window.addEventListener("resize", fitWord);

  // Cinta de videos: se duplica la lista para que el deslizamiento no tenga corte
  const reels = document.querySelector(".reels");
  const originales = [...reels.children];
  reels.style.setProperty("--piezas", originales.length);
  originales.forEach((li) => {
    const copia = li.cloneNode(true);
    copia.setAttribute("aria-hidden", "true");
    copia.classList.remove("reveal");
    reels.appendChild(copia);
  });

  const wa = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(CONTACTO.mensaje)}`;

  document.querySelectorAll(".js-cotizar").forEach((a) => {
    a.href = wa;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".js-ig").forEach((a) => {
    a.href = `https://www.instagram.com/${a.dataset.handle}/`;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".js-tt").forEach((a) => {
    a.href = `https://www.tiktok.com/@${a.dataset.handle}`;
    a.target = "_blank";
    a.rel = "noopener";
  });
  if (CONTACTO.email) {
    document.querySelectorAll(".js-email").forEach((link) => {
      link.href = `mailto:${CONTACTO.email}`;
      (link.querySelector("span") || link).textContent = CONTACTO.email;
    });
    document.querySelectorAll(".js-email-wrap, .js-email-li").forEach((el) => (el.hidden = false));
  }
  // Número visible en el pie: +58 412-642-4915
  const n = CONTACTO.whatsapp;
  document.querySelectorAll(".js-wa-text span").forEach((el) => {
    el.textContent = `+${n.slice(0, 2)} ${n.slice(2, 5)}-${n.slice(5, 8)}-${n.slice(8)}`;
  });
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("heroYear").textContent = new Date().getFullYear();

  // Menú: fondo al hacer scroll y menú de celular
  const nav = document.getElementById("nav");
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  // Animación de entrada
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        reveal.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

  // Adelantos de video: se reproducen solo cuando están en pantalla
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const playing = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting && !reduce) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.35 });
  document.querySelectorAll(".reel video").forEach((v) => playing.observe(v));

  // Video completo en YouTube (si la tarjeta tiene data-youtube)
  const modal = document.getElementById("modal");
  const frame = document.getElementById("modalFrame");
  let lastFocus = null;

  const openVideo = (id, title) => {
    lastFocus = document.activeElement;
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0" title="${title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
  };
  const closeVideo = () => {
    modal.hidden = true;
    frame.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };
  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeVideo));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeVideo();
  });

  document.querySelectorAll(".reel").forEach((reel) => {
    const id = (reel.dataset.youtube || "").trim();
    if (!id) return;
    const title = reel.querySelector(".reel__brand").textContent;
    const btn = document.createElement("button");
    btn.className = "reel__play";
    btn.type = "button";
    btn.setAttribute("aria-label", `Ver video completo: ${title}`);
    btn.innerHTML = "<span></span>";
    btn.addEventListener("click", () => openVideo(id, title));
    reel.querySelector(".reel__phone").appendChild(btn);
  });
})();
