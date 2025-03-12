function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (let cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button onclick="loadcatagoryVideos(${cat.category_id})" class="btn btn-sm px-3 bg-[#25252520] hover:bg-[#FF1F3D]  hover:text-white">${cat.category}</button>
        `;
        categoryContainer.append(categoryDiv);
    }
}


function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response=>response.json())
    .then(data=>displayVideos(data.videos));
}

const displayVideos=(videos)=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.innerHTML="";
    videos.forEach(video=>{
        console.log(video)
       const videoCard =document.createElement("div");
      
       videoCard.innerHTML=`
       <div class="card bg-base-100  shadow-sm">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
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
                <h2 class="text-sm font-bold">${video.authors[0].profile_name}</h2>
                <p class="text-sm text-gray-500 flex gap-1">Awlad hasan <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt=""></p>
                <p class="text-sm text-gray-500 ">${video.others.views}</p>
             </div>
            </div>
          </div>
       `;
       videoContainer.append(videoCard)
    });
}


const loadcatagoryVideos =(id)=>{
   const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
   console.log(url);
   fetch(url).then(res=>res.json()).then(data=>displayVideos(data.category))
}

loadCategories();
// loadVideos();


// console.log(data)

