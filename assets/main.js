// Datos de contacto: cambia aquí y se actualiza todo el sitio.
const CONTACTO = {
  whatsapp: "584126424915", // solo números, con código de país
  mensaje: "Hola Rogienny, quiero cotizar contenido UGC para mi marca.",
  email: "rogienny31@gmail.com", // aparece en el pie de página
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

  // Pestañas de categoría de los videos
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cinta = document.querySelector(".reels-cinta");
  const filtros = document.querySelectorAll(".reel-tabs button");
  const filtrar = (cat) => {
    let visibles = 0;
    [...reels.children].forEach((li) => {
      const entra = cat === "todos" || li.dataset.cat.split(" ").includes(cat);
      li.hidden = !entra;
      if (entra && li.getAttribute("aria-hidden") !== "true") visibles++;
    });
    reels.style.setProperty("--piezas", visibles);
    cinta.classList.toggle("is-static", visibles < 6);
    reels.style.animation = "none";
    void reels.offsetWidth; // reinicia el deslizamiento desde el principio
    reels.style.animation = "";
    cinta.scrollLeft = 0;
    filtros.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === cat)));
  };
  filtros.forEach((b) =>
    b.addEventListener("click", () => {
      filtrar(b.dataset.cat);
      b.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion() ? "auto" : "smooth" });
    })
  );

  // Carruseles de Servicios y Fotos (celular): barritas que indican la tarjeta visible
  document.querySelectorAll(".svc-list").forEach((list) => {
    const items = [...list.children];
    const dots = document.createElement("div");
    dots.className = "svc-dots";
    dots.setAttribute("aria-hidden", "true");
    items.forEach((item, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.tabIndex = -1;
      b.addEventListener("click", () => list.scrollTo({ left: item.offsetLeft - list.offsetLeft - parseFloat(getComputedStyle(list).paddingLeft || 0), behavior: "smooth" }));
      dots.appendChild(b);
    });
    list.after(dots);
    const update = () => {
      const step = items[1] ? items[1].offsetLeft - items[0].offsetLeft : 1;
      const i = Math.min(items.length - 1, Math.round(list.scrollLeft / step));
      [...dots.children].forEach((d, k) => d.classList.toggle("is-active", k === i));
    };
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  const setWhatsApp = (mensaje) => {
    const wa = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    document.querySelectorAll(".js-cotizar").forEach((a) => {
      a.href = wa;
      a.target = "_blank";
      a.rel = "noopener";
    });
  };
  setWhatsApp(CONTACTO.mensaje);
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
    document.querySelectorAll(".js-email-li").forEach((el) => (el.hidden = false));
  }
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("heroYear").textContent = new Date().getFullYear();

  // Menú: fondo más sólido al hacer scroll
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menú lateral del celular
  const drawer = document.getElementById("drawer");
  const menuOpen = document.getElementById("menuOpen");
  const setDrawer = (open) => {
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    menuOpen.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("no-scroll", open);
    if (open) drawer.querySelector(".drawer__close").focus();
  };
  menuOpen.addEventListener("click", () => setDrawer(true));
  drawer.querySelectorAll("[data-close], .drawer__links a, .drawer__social a").forEach((el) =>
    el.addEventListener("click", () => setDrawer(false))
  );
  document.addEventListener("keydown", (e) => {
    if (!drawer.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      setDrawer(false);
      menuOpen.focus();
    } else if (e.key === "Tab") {
      const focusables = [...drawer.querySelectorAll("a, button")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", (m) => m.matches && setDrawer(false));

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animación de entrada: los grupos aparecen uno tras otro (--i marca el orden)
  [".hero__social", ".tools", ".photo-grid", ".band__steps", ".svc-row", ".contact__social"].forEach((sel) => {
    document.querySelectorAll(sel).forEach((group) => {
      group.classList.remove("reveal");
      group.classList.add("stagger");
      [...group.children].forEach((child, i) => child.style.setProperty("--i", i));
    });
  });
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        reveal.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal, .stagger, .band").forEach((el) => reveal.observe(el));

  // Cómo trabajamos: el hilo dorado avanza con el scroll y enciende cada paso al llegar
  const proceso = document.querySelector(".process");
  if (proceso) {
    const pasos = [...proceso.querySelectorAll(".step")];
    let fracs = [], vertical = false, inicio = 0, largo = 1;
    const medir = () => {
      const caja = proceso.getBoundingClientRect();
      const centros = pasos.map((li) => {
        const r = li.querySelector(".timeline__num").getBoundingClientRect();
        return { x: r.left + r.width / 2 - caja.left, y: r.top + r.height / 2 - caja.top };
      });
      const a = centros[0], b = centros[centros.length - 1];
      vertical = Math.abs(b.x - a.x) < 4;
      inicio = vertical ? a.y : a.x;
      largo = Math.max(1, vertical ? b.y - a.y : b.x - a.x);
      proceso.style.setProperty("--tx", `${a.x}px`);
      proceso.style.setProperty("--ty", `${a.y}px`);
      proceso.style.setProperty(vertical ? "--th" : "--tw", `${largo}px`);
      fracs = centros.map((c) => ((vertical ? c.y : c.x) - inicio) / largo);
    };
    const pintar = (p) => {
      proceso.style.setProperty("--p", p.toFixed(4));
      proceso.style.setProperty("--spark", p > 0.005 && p < 0.995 ? 1 : 0);
      pasos.forEach((li, i) => li.classList.toggle("is-lit", p > 0.001 && p >= fracs[i] - 0.002));
    };
    const avance = () => {
      const caja = proceso.getBoundingClientRect();
      const vh = window.innerHeight;
      if (vertical) return (vh * 0.62 - (caja.top + inicio)) / largo;
      return (vh * 0.85 - caja.top) / (vh * 0.4);
    };
    let pendiente = false;
    const actualizar = () => {
      pendiente = false;
      pintar(Math.min(1, Math.max(0, avance())));
    };
    medir();
    if (reduce) {
      pintar(1);
    } else {
      actualizar();
      window.addEventListener("scroll", () => {
        if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
      }, { passive: true });
    }
    window.addEventListener("resize", () => { medir(); reduce ? pintar(1) : actualizar(); });
    document.fonts && document.fonts.ready.then(() => { medir(); reduce ? pintar(1) : actualizar(); });
  }

  // Portada: "PORTAFOLIO" sube un poco más rápido que la página, así la foto parece estar delante
  if (!reduce) {
    const heroWord = document.querySelector(".hero__word");
    let ticking = false;
    const parallax = () => {
      const y = Math.min(window.scrollY, window.innerHeight * 1.2);
      heroWord.style.translate = `0 ${(y * -0.22).toFixed(1)}px`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(parallax);
      }
    }, { passive: true });
  }

  // Adelantos de video: se reproducen solo cuando están en pantalla
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
    btn.dataset.title = title;
    btn.setAttribute("aria-label", `Ver video completo: ${title}`);
    if (reel.getAttribute("aria-hidden") === "true") btn.tabIndex = -1;
    btn.innerHTML = "<span></span>";
    btn.addEventListener("click", () => openVideo(id, title));
    reel.querySelector(".reel__phone").appendChild(btn);
  });
  // Idiomas: español (texto de la página) e inglés (assets/i18n.js).
  // Se elige por ?lang=en|es, luego por la última elección guardada y, si no hay, por el idioma del navegador.
  const dict = window.I18N_EN || {};
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const key = node.nodeValue.trim();
    if (key && dict[key]) nodes.push({ node, es: node.nodeValue, key });
  }
  const attrs = [];
  document.querySelectorAll("[alt], [aria-label], [title]").forEach((el) => {
    ["alt", "aria-label", "title"].forEach((name) => {
      const val = el.getAttribute(name);
      if (val && dict[val.trim()]) attrs.push({ el, name, es: val, key: val.trim() });
    });
  });
  const metaDesc = document.querySelector('meta[name="description"]');
  const esTitle = document.title;
  const esDesc = metaDesc ? metaDesc.content : "";
  const langBtn = document.getElementById("langToggle");

  const setLang = (lang) => {
    const en = lang === "en";
    nodes.forEach((n) => (n.node.nodeValue = en ? n.es.replace(n.key, dict[n.key]) : n.es));
    attrs.forEach((a) => a.el.setAttribute(a.name, en ? dict[a.key] : a.es));
    document.documentElement.lang = lang;
    document.title = en ? dict[esTitle] || esTitle : esTitle;
    if (metaDesc) metaDesc.content = en ? dict[esDesc] || esDesc : esDesc;
    setWhatsApp(en ? window.I18N_EN_WA || CONTACTO.mensaje : CONTACTO.mensaje);
    document.querySelectorAll(".reel__play").forEach((b) =>
      b.setAttribute("aria-label", `${en ? "Watch full video" : "Ver video completo"}: ${b.dataset.title}`)
    );
    if (langBtn) langBtn.querySelectorAll("[data-lang]").forEach((s) => s.classList.toggle("is-on", s.dataset.lang === lang));
    try { localStorage.setItem("rh-lang", lang); } catch (e) {}
    fitWord();
  };

  const fromUrl = new URLSearchParams(location.search).get("lang");
  let saved = null;
  try { saved = localStorage.getItem("rh-lang"); } catch (e) {}
  const browser = ((navigator.languages && navigator.languages[0]) || navigator.language || "es").toLowerCase();
  const initial = fromUrl === "en" || fromUrl === "es" ? fromUrl : saved || (browser.startsWith("es") ? "es" : "en");
  setLang(initial);
  if (langBtn) langBtn.addEventListener("click", () => {
    const lang = document.documentElement.lang === "en" ? "es" : "en";
    setLang(lang);
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  });
})();
