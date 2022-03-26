function openNav() {
    document.getElementById("root").style.width = "250px";
    document.getElementById("main-page").style.marginLeft = "250px";
  }

  function closeNav() {
    document.getElementById("root").style.width = "0";
    document.getElementById("main-page").style.marginLeft = "0";

  }

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes = {
    "/":"/pages/index.html", 
    404: "/pages/404.html",
    "/about":"/pages/about.html",
    "/game":"/pages/game.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
   
};
console.log(window.location.pathname);
window.onpopstate = handleLocation;
window.route = route;

handleLocation();