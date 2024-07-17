// Menu
document.body.addEventListener("click", () => {
  document.body.classList.remove("has-navbar-open");
});

document.getElementById("menu-button").addEventListener("click", (ev) => {
  document.body.classList.toggle("has-navbar-open");
  ev.stopPropagation();
});
document.getElementById("menu").addEventListener("click", (ev) => {
  ev.stopPropagation();
  setTimeout(() => {
    document.body.classList.remove("has-navbar-open");
  }, 100);
});

document.querySelectorAll("button[data-open]").forEach((el) => {
  el.addEventListener("click", () => {
    history.replaceState(null, null, `#${el.dataset.open}`);
    init();
  });
});

document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.dataset.close;
    const target = id ? document.getElementById(id) : el.closest("dialog");
    target.close();

    restore(target.id);
  });
});

// Fix dialog close with ESC
document.querySelectorAll("dialog").forEach((el) => {
  el.addEventListener("close", () => restore(el.id));
});
document.querySelectorAll("details").forEach((el) => {
  el.addEventListener("toggle", () => {
    if (!el.open) {
      restore(el.id);
    }
  });
});

// Init navigation
init();
addEventListener("popstate", () => init());

function init(id = location.hash.slice(1)) {
  if (!id) {
    return;
  }

  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  if (element.tagName === "DIALOG" && element.open === false) {
    element.showModal();
  }
  if (element.tagName === "DETAILS" && element.open === false) {
    element.open = true;
  }
}

function restore(id) {
  if (location.hash === `#${id}`) {
    history.replaceState(null, null, document.location.pathname);
  }
}
