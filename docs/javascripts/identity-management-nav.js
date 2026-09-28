document.addEventListener("click", function (event) {
  const submenuLink = event.target.closest(".dropdown-submenu > a");

  if (submenuLink) {
    const submenu = submenuLink.nextElementSibling;
    if (!submenu || !submenu.classList.contains("dropdown-menu")) return;

    // Keep the parent menu open and reveal its child links on click.
    event.preventDefault();
    event.stopPropagation();
    submenu.classList.add("show");
    submenuLink.classList.add("open");

    const bounds = submenuLink.getBoundingClientRect();
    if (window.matchMedia("(min-width: 992px)").matches) {
      const margin = 10;
      const maxBottom = window.innerHeight - margin;
      submenu.style.left = `${bounds.right}px`;
      if (bounds.top + submenu.offsetHeight > maxBottom && bounds.top > window.innerHeight / 2) {
        submenu.style.top = `${bounds.bottom - submenu.offsetHeight}px`;
        submenu.style.maxHeight = `${bounds.bottom - margin}px`;
      } else {
        submenu.style.top = `${bounds.top}px`;
        submenu.style.maxHeight = `${maxBottom - bounds.top}px`;
      }
    }
    return;
  }

  // Reset nested menus when the top-level menu is toggled.
  const topLevelToggle = event.target.closest(".navbar .dropdown > .dropdown-toggle");
  if (topLevelToggle) {
    const menu = topLevelToggle.parentElement.querySelector(":scope > .dropdown-menu");
    if (menu) {
      menu.querySelectorAll(".dropdown-menu.show").forEach(function (item) {
        item.classList.remove("show");
        item.style.removeProperty("left");
        item.style.removeProperty("top");
        item.style.removeProperty("max-height");
      });
      menu.querySelectorAll(".dropdown-submenu > a.open").forEach(function (item) {
        item.classList.remove("open");
      });
    }
  }
}, true);
