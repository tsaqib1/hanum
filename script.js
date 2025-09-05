// script.js

// Sample video data
let videos = [
  {
    id: 1,
    title: "Jalan-jalan ke Bali",
    channel: "Travel Vlog",
    views: "12 rb x ditonton",
    category: "Travel",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumb: "https://picsum.photos/400/225?random=1"
  },
  {
    id: 2,
    title: "Tutorial Memasak Nasi Goreng",
    channel: "Dapur Hanum",
    views: "8 rb x ditonton",
    category: "Masak",
    src: "https://www.w3schools.com/html/movie.mp4",
    thumb: "https://picsum.photos/400/225?random=2"
  },
  {
    id: 3,
    title: "Belajar Coding HTML & CSS",
    channel: "CodeLab",
    views: "25 rb x ditonton",
    category: "Edukasi",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumb: "https://picsum.photos/400/225?random=3"
  }
];

// Tambah kategori unik
const categories = ["Semua", ...new Set(videos.map(v => v.category))];

// Elements
const grid = document.getElementById("grid");
const badges = document.getElementById("badges");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const uploadFile = document.getElementById("uploadFile");
const themeBtn = document.getElementById("themeBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const videoWrap = document.getElementById("videoWrap");
const videoTitle = document.getElementById("videoTitle");
const videoStats = document.getElementById("videoStats");

// Render kategori
function renderBadges() {
  badges.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "badge";
    btn.textContent = cat;
    btn.onclick = () => filterCategory(cat);
    badges.appendChild(btn);
  });
}
renderBadges();

// Render video
function renderVideos(list) {
  grid.innerHTML = "";
  list.forEach(v => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${v.thumb}" alt="${v.title}" />
      <div class="card-body">
        <h4>${v.title}</h4>
        <div class="muted">${v.channel} • ${v.views}</div>
      </div>
    `;
    card.onclick = () => openModal(v);
    grid.appendChild(card);
  });
}
renderVideos(videos);

// Filter kategori
function filterCategory(cat) {
  if (cat === "Semua") {
    renderVideos(videos);
  } else {
    renderVideos(videos.filter(v => v.category === cat));
  }
}

// Search
searchBtn.onclick = () => {
  const q = searchInput.value.toLowerCase();
  renderVideos(videos.filter(v => v.title.toLowerCase().includes(q)));
};

// Modal
function openModal(v) {
  modal.style.display = "flex";
  videoWrap.innerHTML = `
    <video controls autoplay>
      <source src="${v.src}" type="video/mp4">
    </video>
  `;
  videoTitle.textContent = v.title;
  videoStats.textContent = `${v.channel} • ${v.views}`;
}
closeModal.onclick = () => {
  modal.style.display = "none";
  videoWrap.innerHTML = "";
};

// Upload video
uploadFile.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const newVid = {
    id: Date.now(),
    title: file.name,
    channel: "Upload Kamu",
    views: "0 x ditonton",
    category: "Unggahan",
    src: url,
    thumb: "https://picsum.photos/400/225?random=" + Math.floor(Math.random()*1000)
  };
  videos.unshift(newVid);
  renderVideos(videos);
  alert("Video berhasil diunggah!");
};

// Theme toggle
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

// Simpan tema
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
