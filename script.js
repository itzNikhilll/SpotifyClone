// Ininitialize the variables
let songIndex = 1;
let audioElement = new Audio('songs/1.m4a');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let songItemPlay = document.getElementsByClassName('songItemPlay')

let songs = [
    { songName: "Alone - Alan Walker", filePath: "songs/1.m4a", coverPath: "covers/1.png" },
    { songName: "Darkside - Alan Walker", filePath: "songs/2.m4a", coverPath: "covers/2.png" },
    { songName: "Headlights - Alan Walker", filePath: "songs/3.m4a", coverPath: "covers/3.jpg" },
    { songName: "Heat Waves - Glass Animals", filePath: "songs/4.m4a", coverPath: "covers/4.png" },
    { songName: "Hello World - Alan Walker", filePath: "songs/5.m4a", coverPath: "covers/5.png" },
    { songName: "Ignite - Alan Walker", filePath: "songs/6.m4a", coverPath: "covers/6.png" },
    { songName: "Infinity - Jaymes Young", filePath: "songs/7.m4a", coverPath: "covers/7.jpg" },
    { songName: "Sing Me to Sleep - Alan Walker", filePath: "songs/8.m4a", coverPath: "covers/8.png" },
]
document.getElementById("masterSongName").innerText = songs[0].songName;
songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    const audio = new Audio();

    // Set the audio source to your m4a file
    audio.src = songs[i].filePath;

    // Wait for the metadata to load (including duration)
    audio.addEventListener('loadedmetadata', function () {

        // Get the duration in seconds
        const duration = audio.duration;
        // Do something with the duration
        // console.log(`The duration of the audio file is ${} seconds.`);
        document.getElementById(`timestamp${i+1}`).innerText = formatTime(duration)

    });
})
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = Math.floor(remainingSeconds).toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
  }


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // console.log(audioElement.duration)
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        Array.from(songItemPlay).forEach((element) => {
            element.classList.remove('fa-circle-pause')
            element.classList.add('fa-circle-play')
        })
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const currentTime = audioElement.currentTime
    const duration = audioElement.duration
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    document.getElementById("duration").innerText = `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

let makeAllPlays = () => {
    Array.from(songItemPlay).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(songItemPlay).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays()
        songIndex = parseInt(e.target.id)
        if (audioElement.paused || audioElement.currentTime <= 0) {
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex}.m4a`
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex - 1].songName;
            audioElement.currentTime = 0;
            audioElement.play()
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
            gif.style.opacity = 0;
        }

    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 8) {
        songIndex = 1;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.m4a`
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.m4a`
    masterSongName.innerHTML = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    masterSongName.innerText = songs[songIndex - 1].songName;
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

const convertTimeToString = (time) => {
    totalNumberOfSeconds = Math.floor(time)
    const hours = parseInt(totalNumberOfSeconds / 3600);
    const minutes = parseInt((totalNumberOfSeconds - (hours * 3600)) / 60);
    const seconds = Math.floor((totalNumberOfSeconds - ((hours * 3600) + (minutes * 60))));
    const result = (minutes < 10 ? + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result
}