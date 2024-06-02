import { closeModalHandler, openModalHandler } from "./modal.js";
import { fetchData } from "./fetchData.js";

const mobileNav = document.querySelector(".nav-container-mobile");
const burger = document.querySelector(".nav-toggle");
const burgerImg = burger.querySelector("img");
const artList = document.querySelector(".art-list");
const artTemplate = document.getElementById("art-info");
const loading = document.querySelector(".loading-container");
// const main = document.querySelector(".main");
const loadMoreData = document.getElementById("load-more-data");
const artworkModal = document.getElementById("artwork-modal");
const modalContentContainer = document.querySelector('.modal-content__container')
const closeModal = document.querySelector(".close-modal");

let pageNumber = 1;

async function fetchArtWorks() {
  try {
    loadMoreData.disabled = true;
    loadMoreData.textContent = "Loading...";

    const responseData = await fetchData(pageNumber + 1);
    const listOfArtworks = responseData.data;

    loading.classList.add("hidden");

    pageNumber = pageNumber + 1;

    listOfArtworks.forEach((element) => {
      const artBody = document.importNode(artTemplate.content, true);
      artBody.querySelector("li").id = element.id;
      artBody.querySelector(
        "img"
      ).src = `https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`;
      artBody.querySelector(".artist").textContent = element.artist_title;
      artBody.querySelector(".img-desc").textContent = element.title;
      artBody.querySelector(".likes").textContent = Math.floor(
        Math.random() * 100
      ).toString();
      artBody.querySelector(".views").textContent =
        (Math.floor(Math.random() * (1000 - 100) + 100) / 100).toString() + "k";
      artList.append(artBody);
      loadMoreData.disabled = false;
      loadMoreData.textContent = "Load More ArtWork";
    });
  } catch (error) {
    console.log(error.message);
  }
}

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

fetchArtWorks();

mobileNav.addEventListener("click", mobileNavHandler);
burger.addEventListener("click", burgerMenuHandler);
loadMoreData.addEventListener("click", fetchArtWorks);
closeModal.addEventListener(
  "click",
  closeModalHandler.bind(null, artworkModal)
);
artList.addEventListener("click", (event) => {
  openModalHandler(event, artworkModal,modalContentContainer);
});
