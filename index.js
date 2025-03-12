// Fetch and display categories
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
}

// Display categories as buttons
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((cat) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.innerHTML = `
          <button onclick="loadCategoryVideos('${cat.category_id}')" class="btn btn-sm px-3 bg-[#25252520] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
      `;
      categoryContainer.appendChild(categoryDiv);
  });
}

// Fetch and display all videos
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then((response) => response.json())
      .then((data) => displayVideos(data.videos))
      .catch((error) => console.error("Error fetching videos:", error));
}

// Display videos in the video container
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
      videoContainer.innerHTML = `
          <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
              <img class="w-[120px]" src="Icon.png" alt="">
              <h2 class="text-2xl font-bold">Oops! Sorry No <br> Content Here</h2>
          </div>
      `;
      return;
  }
  videos.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.innerHTML = `
          <div class="card bg-base-100 shadow-sm">
              <figure class="relative">
                  <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Thumbnail" />
              </figure>
              <span class="absolute right-2 top-32 text-white bg-black px-2 rounded text-sm">3hrs 56 min ago</span>
              <div class="py-5 flex gap-3 px-0">
                  <div class="profile">
                      <div class="avatar">
                          <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                              <img src="${video.authors[0].profile_picture}" />
                          </div>
                      </div>
                  </div>
                  <div class="intro">
                      <h2 class="text-sm font-bold">${video.title}</h2>
                      <p class="text-sm text-gray-500 flex gap-1">${video.authors[0].profile_name} ${video.authors[0].verified ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt="">` : ""}</p>
                      <p class="text-sm text-gray-500">${video.others.views} Views</p>
                  </div>
              </div>
              <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block bg-slate-200">Show Details</button>
          </div>
      `;
      videoContainer.appendChild(videoCard);
  });
};

// Fetch and display videos for a specific category
const loadCategoryVideos = (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`;
  fetch(url)
      .then((res) => res.json())
      .then((data) => {
          if (data.status && data.category) {
              displayVideos(data.category);
          } else {
              console.error("No category data found in the API response:", data);
              displayNoContentMessage();
          }
      })
      .catch((error) => {
          console.error("Error fetching category videos:", error);
          displayNoContentMessage();
      });
};

// Display "No Content" message
const displayNoContentMessage = () => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = `
      <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
          <img class="w-[120px]" src="Icon.png" alt="">
          <h2 class="text-2xl font-bold">Oops! Sorry No <br> Content Here</h2>
      </div>
  `;
};

// Fetch and display video details
const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
      .then((res) => res.json())
      .then((data) => displayVideoDetails(data.video))
      .catch((error) => console.error("Error fetching video details:", error));
};

// Display video details in the modal
const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("detailes-container");
  detailsContainer.innerHTML = `
      <div class="card bg-base-100 image-full w-96 shadow-sm">
          <figure>
              <img src="${video.thumbnail}" alt="Thumbnail" />
          </figure>
          <div class="card-body">
              <h2 class="card-title">${video.title}</h2>
              <p></p>
          </div>
      </div>
  `;
};

// Initialize the page
loadCategories();
loadVideos();