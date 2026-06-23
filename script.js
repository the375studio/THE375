const views = [...document.querySelectorAll("[data-view]")];
const navLinks = [...document.querySelectorAll("[data-route]")];
const footer = document.querySelector(".site-footer");

function getRoute() {
  const route = window.location.hash.replace("#", "");
  return views.some((view) => view.dataset.view === route) ? route : "home";
}

function setRoute(route) {
  resetScroll();

  views.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === route);
  });

  navLinks.forEach((link) => {
    const isActive = link.dataset.route === route;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  footer.hidden = false;
  resetScroll();
}

function resetScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.querySelector(".site-shell").scrollTop = 0;
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = link.dataset.route;
    history.pushState(null, "", `#${route}`);
    setRoute(route);
  });
});

window.addEventListener("popstate", () => setRoute(getRoute()));
window.addEventListener("hashchange", () => setRoute(getRoute()));
setRoute(getRoute());
