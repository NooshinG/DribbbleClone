const mobileNav = document.querySelector(".nav-container-mobile");
const burger = document.querySelector(".nav-toggle");
const burgerImg = burger.querySelector("img");

const mobileNavHandler = (e) => {
  const navItem = e.target.tagName === "H3" ? e.target : null;
  if (!navItem) {
    return;
  }
  navItem.nextElementSibling.classList.toggle("hidden");
  // console.log(navItem.getAttribute("data-showList"));
  if (navItem.getAttribute("data-showList") === "0") {
    navItem.style.setProperty(
      "--arrow-image-up",
      "url('../images/arrow-up.svg')"
    );
    navItem.setAttribute("data-showList", "1");
  } else {
    navItem.style.setProperty(
      "--arrow-image-up",
      "url('../images/arrow-down.svg')"
    );
    navItem.setAttribute("data-showList", "0");
  }
};

const burgerMenuHandler = () => {
  mobileNav.classList.toggle("hidden");
  if(burgerImg.getAttribute("data-showList") === "0"){
    burgerImg.setAttribute("data-showList", "1");
    burgerImg.setAttribute("src", "./images/close.svg");
  }
  else{
    burgerImg.setAttribute("data-showList", "0");
    burgerImg.setAttribute("src", "./images/burger.svg");
  }
};

mobileNav.addEventListener("click", mobileNavHandler);
burger.addEventListener("click", burgerMenuHandler);
