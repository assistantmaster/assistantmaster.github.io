const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const mainContent = document.getElementById("mainContent");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const trackCover = document.getElementById("trackCover");
const player = document.getElementById("player");
player.style.display = "none";
let isPlaying = false;
let currentTrack = 0;
let currentPlaylist = [];

// { title: "", artist: "", album: "", duration: "", src: "./songs/.mp3", cover: "./images/.jpg" },

const albums = [
    {
    name: "Lamda First Album",
    cover: "./images/1748968955733.jpg",
    songs: [
        { title: "Rise Again", artist: "Lamda", album: "Lamda First Album", duration: "4:33", src: "./songs/Rise Again 4.mp3", cover: "./images/1748968955733.jpg" },
        { title: "Smells Like Tenn Spirit", artist: "Lamda", album: "Lamda First Album", duration: "4:34", src: "./songs/Smells Leke Teen Spirit 3.mp3", cover: "./images/1748968955733.jpg" },
        { title: "Pyrotechnik", artist: "Lamda, Jannis", album: "Lamda First Album", duration: "1:05", src: "./songs/Pyrotechnik Remix.wav", cover: "./images/1748968955733.jpg" },
    ]
    },
    {
    name: "Mikaaa",
    cover: "./images/1748968995591.jpg",
    songs: [
        { title: "Summer of '69", artist: "Mika", album: "Mikaaa", duration: "3:40", src: "./songs/Summer of '69 - Mika.mp3", cover: "./images/1748968995591.jpg" },
        { title: "Let it be", artist: "Mika", album: "Mikaaa", duration: "3:52", src: "./songs/Let it be - Mika.mp3", cover: "./images/1748968995591.jpg" },
        { title: "Bis zum letzen Tag", artist: "Mikaaa, Yohnnhahrß", album: "Mikaaa", duration: "2:09", src: "./songs/Bis zum letzten Tag.mp3", cover: "./images/1748968995591.jpg" },
    ]
    },
    {
    name: "Yohnnhahrß",
    cover: "./images/1749047800875.jpg",
    songs: [
        { title: "Bis zum letzen Tag", artist: "Mikaaa, Yohnnhahrß", album: "Yohnnhahrß", duration: "2:09", src: "./songs/Bis zum letzten Tag.mp3", cover: "./images/1749047800875.jpg" },
        { title: "Silberner Stern", artist: "Yohnnhahrß", album: "Yohnnhahrß", duration: "4:16", src: "./songs/Silberner Stern.mp3", cover: "./images/1749047800875.jpg" },
        { title: "Calm Water", artist: "Yohnnhahrß, Timo", album: "Yohnnhahrß", duration: "0:17", src: "./songs/Calm Water.mp3", cover: "./images/1749047800875.jpg" },
        { title: "TJR", artist: "Yohnnhahrß, Timo", album: "Yohnnhahrß", duration: "0:24", src: "./songs/TJR.mp3", cover: "./images/1749047800875.jpg" },
        { title: "A long Way", artist: "Yohnnhahrß, Armand", album: "Yohnnhahrß", duration: "1:47", src: "./songs/Playback A long way instrumental.mp3", cover: "./images/1749047800875.jpg" },
    ]
    }
];

const likedSongs = albums.flatMap(a => a.songs);

function renderAlbums() {
    mainContent.innerHTML = '<h1>Albums</h1><div class="albums" id="albumList"></div>';
    const albumList = document.getElementById("albumList");
    albums.forEach((album, index) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.onclick = () => showAlbum(index);
    div.innerHTML = `<img src="${album.cover}" alt="cover" />
                        <div class="album-title">${album.name}</div>`;
    albumList.appendChild(div);
    });
}

function showAlbum(index) {
    const album = albums[index];
    currentPlaylist = album.songs;
    mainContent.innerHTML = `
    <div class="album-detail-header">
        <img src="${album.cover}" alt="cover" />
        <div class="album-detail-info">
        <div class="album-detail-title">${album.name}</div>
        <div class="album-detail-artist">${album.songs[0]?.artist || ""}</div>
        </div>
    </div>
    <div class="song-header">
        <div>#</div><div>Title</div><div>Album</div><div>Duration</div>
    </div>
    <div class="songs" id="songList"></div>`;
    const songList = document.getElementById("songList");
    album.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.classList.add("song");
    div.onclick = () => playTrack(i);
    div.innerHTML = `
        <div>${i + 1}</div>
        <div class="song-title">${song.title}<div class="song-artist">${song.artist}</div></div>
        <div class="song-album">${song.album}</div>
        <div class="song-duration">${song.duration}</div>`;
    songList.appendChild(div);
    });
}

function showLikedSongs() {
    currentPlaylist = likedSongs;
    mainContent.innerHTML = `<h1>Liked Songs</h1>
    <div class="song-header">
        <div>#</div><div>Title</div><div>Album</div><div>Duration</div>
    </div>
    <div class="songs" id="likedList"></div>`;
    const likedList = document.getElementById("likedList");
    likedSongs.forEach((song, i) => {
    const div = document.createElement("div");
    div.classList.add("song");
    div.onclick = () => playTrack(i);
    div.innerHTML = `
        <div>${i + 1}</div>
        <div class="song-title">${song.title}<div class="song-artist">${song.artist}</div></div>
        <div class="song-album">${song.album}</div>
        <div class="song-duration">${song.duration}</div>`;
    likedList.appendChild(div);
    });
}

function showSearch() {
    currentPlaylist = likedSongs;
    mainContent.innerHTML = `<h1>Search</h1>
    <div class="song-header">
        <div>#</div><div>Title</div><div>Album</div><div>Duration</div>
    </div>
    <div class="songs" id="likedList"></div>`;
    const likedList = document.getElementById("likedList");
    likedSongs.forEach((song, i) => {
    const div = document.createElement("div");
    div.classList.add("song");
    div.onclick = () => playTrack(i);
    div.innerHTML = `
        <div>${i + 1}</div>
        <div class="song-title">${song.title}<div class="song-artist">${song.artist}</div></div>
        <div class="song-album">${song.album}</div>
        <div class="song-duration">${song.duration}</div>`;
    likedList.appendChild(div);
    });
}

function showLibrary() {
    currentPlaylist = likedSongs;
    mainContent.innerHTML = `<h1>Your Library</h1>
    <div class="song-header">
        <div>#</div><div>Title</div><div>Album</div><div>Duration</div>
    </div>
    <div class="songs" id="likedList"></div>`;
    const likedList = document.getElementById("likedList");
    likedSongs.forEach((song, i) => {
    const div = document.createElement("div");
    div.classList.add("song");
    div.onclick = () => playTrack(i);
    div.innerHTML = `
        <div>${i + 1}</div>
        <div class="song-title">${song.title}<div class="song-artist">${song.artist}</div></div>
        <div class="song-album">${song.album}</div>
        <div class="song-duration">${song.duration}</div>`;
    likedList.appendChild(div);
    });
}

function playTrack(index) {
    const song = currentPlaylist[index];
    currentTrack = index;
    audio.src = song.src;
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    trackCover.src = song.cover;
    player.style.display = "flex"; // Player anzeigen
}

function togglePlay() {
    if (!audio.src) return;
    if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % currentPlaylist.length;
    playTrack(currentTrack);
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + currentPlaylist.length) % currentPlaylist.length;
    playTrack(currentTrack);
}

function updateProgress() {
    if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    }
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", function() {
    player.style.display = "none";
    trackTitle.textContent = "No song playing";
    trackArtist.textContent = "";
    trackCover.src = "";
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
});

function showHome() {
    renderAlbums();
}

// Fortschrittsleiste interaktiv machen
const progressContainer = document.querySelector('.progress');

progressContainer.addEventListener('click', function(e) {
    const rect = progressContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    if (audio.duration) {
    audio.currentTime = percent * audio.duration;
    }
});

// Optional: Ziehen unterstützen
let isDragging = false;

progressContainer.addEventListener('mousedown', function(e) {
    isDragging = true;
    seek(e);
});

window.addEventListener('mousemove', function(e) {
    if (isDragging) {
    seek(e);
    }
});

window.addEventListener('mouseup', function() {
    isDragging = false;
});

function seek(e) {
    const rect = progressContainer.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    if (audio.duration) {
    audio.currentTime = percent * audio.duration;
    }
}

function renderSidebarAlbums() {
const sidebarAlbums = document.getElementById("sidebarAlbums");
sidebarAlbums.innerHTML = "";
albums.forEach((album, index) => {
    const div = document.createElement("div");
    div.className = "sidebar-album";
    div.onclick = () => showAlbum(index);
    div.innerHTML = `<img src="${album.cover}" alt="cover"><span>${album.name}</span>`;
    sidebarAlbums.appendChild(div);
});
}

renderAlbums();
renderSidebarAlbums();

if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
    if (!isPlaying) togglePlay();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
    if (isPlaying) togglePlay();
    });
    navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
    navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
}