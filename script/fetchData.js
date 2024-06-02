export async function fetchData(page) {
  return fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=12`)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json.then((errData) => {
          console.log(errData);
          throw new Error("Something went Wrong - server-side.");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
}

export async function fetchArtworkDetails(id, controller) {
  return fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,description,artist_title,image_id`,
    { signal: controller.signal }
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json.then((errData) => {
          console.log(errData);
          throw new Error("Something went Wrong - server-side.");
        });
      }
    })
    .catch((error) => {
    //   if (error.message == "The operation was aborted.") {
    //     return;
    //   }
    //   console.log(error.message);
      throw new Error("Something went wrong!");
    });
}
