const mobileNav = document.querySelector(".nav-container-mobile");
const burger = document.querySelector(".nav-toggle");
const burgerImg = burger.querySelector("img");
const artList = document.querySelector(".art-list");
const artTemplate = document.getElementById("art-info");


let artData;
fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=9")
  .then((response) => response.json())
  .then((data) => {
    artData = data.data;
    // console.log(artData[2]);
    // console.log(artData[3]);
    artData.forEach((element) => {
      const artBody = document.importNode(artTemplate.content, true);
      artBody.querySelector('img').src=`https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`;
      artBody.querySelector('.artist').textContent = element.artist_title;
      artBody.querySelector('.img-desc').textContent = element.title;
      artBody.querySelector('.likes').textContent = (Math.floor(Math.random() * 100)).toString();
      artBody.querySelector('.views').textContent = (Math.floor(Math.random() * (1000 - 100) + 100) / 100).toString() + 'k';
      artList.append(artBody);
    });
  })
  .catch((error) => console.log(error));

const mobileNavHandler = (e) => {
  const navItem = e.target.tagName === "H3" ? e.target : null;
  if (!navItem) {
    return;
  }
  navItem.nextElementSibling.classList.toggle("hidden");
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
  if (burgerImg.getAttribute("data-showList") === "0") {
    burgerImg.setAttribute("data-showList", "1");
    burgerImg.setAttribute("src", "./images/close.svg");
  } else {
    burgerImg.setAttribute("data-showList", "0");
    burgerImg.setAttribute("src", "./images/burger.svg");
  }
};

mobileNav.addEventListener("click", mobileNavHandler);
burger.addEventListener("click", burgerMenuHandler);
