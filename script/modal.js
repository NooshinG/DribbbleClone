import { fetchArtworkDetails } from "./fetchData.js";

let controller = new AbortController();

export function closeModalHandler(modal) {
  document.body.style.overflow = "unset";
  modal.classList.add("hidden");
  controller.abort();
  controller = new AbortController();
}

export async function openModalHandler(event, modal, modalContentContainer) {
  const li = event.target.closest("li");
  if (!li) {
    return;
  }
  modalContentContainer.replaceChildren();
  modal.style.top = document.body.getBoundingClientRect().top * -1 + "px";
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const responseData = await fetchArtworkDetails(li.id, controller);

  console.log(responseData)

  const modalContent = fillModalContent(responseData.data);
  modalContentContainer.append(modalContent);

  return;
}

export function fillModalContent(data) {
  const container = document.createElement("div");

  const title = document.createElement("h1");
  const artist = document.createElement("h2");
  const description = document.createElement("p");
  const artImage = document.createElement("img");

  title.textContent = `${data.title}${
    data.artist_title || data.artist_title?.length > 0
      ? ` by  ${data.artist_title}`
      : ""
  }`;
  artist.textContent = data.artist_title;
  description.textContent = data.description
    ?.replaceAll("<p>", "")
    .replaceAll("</p>", "");
  artImage.src = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;
  artImage.alt = data.title;

  container.classList.add("artwork-details__container");
  title.classList.add("details__title");
  artist.classList.add("details__artist");
  description.classList.add("details__description");
  artImage.classList.add("details__image");

  container.append(...[title, artist, description, artImage]);

  return container;
}
