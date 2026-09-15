document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const overlay = document.getElementById("site-overlay");
  const toggle = document.querySelector(".menu-toggle");

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader);

  if (toggle && overlay) {
    toggle.addEventListener("click", () => {
      const isOpen = overlay.classList.toggle("open");
      toggle.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    overlay.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        overlay.classList.remove("open");
        toggle.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  const favoriteKey = "aurevon-favorites";
  const saved = JSON.parse(localStorage.getItem(favoriteKey) || "[]");

  document.querySelectorAll(".favorite-toggle").forEach((button) => {
    const title = button.dataset.title || "";
    const isSaved = saved.includes(title);

    if (isSaved) {
      button.classList.add("is-active");
      button.setAttribute("aria-label", "Remove from favorites");
    } else {
      button.setAttribute("aria-label", "Save to favorites");
    }

    button.addEventListener("click", () => {
      const current = JSON.parse(localStorage.getItem(favoriteKey) || "[]");
      const next = current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title];

      localStorage.setItem(favoriteKey, JSON.stringify(next));
      button.classList.toggle("is-active", next.includes(title));
      button.setAttribute(
        "aria-label",
        next.includes(title) ? "Remove from favorites" : "Save to favorites",
      );
    });
  });
});
