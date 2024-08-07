

let masterPlay = document.querySelector(".masterplay");
let progressbar = document.querySelector("#progressbar");
let gif = document.querySelector("#gif")
let time = document.querySelector("#initialtime")
let audioElement = new Audio("items/songs/1.mp3")
let songItems = Array.from(document.getElementsByClassName("music"))

let songIndex = 1
let songs = [
    {songName:"JoJo's Bizzare Adventure" , filepath:"items/songs/1.mp3" , coverpath:"items/cover/1.jpeg"},
    {songName:"MONTAGEM - MELODIA ENVOLVENTE" , filepath:"items/songs/2.mp3" , coverpath:"items/cover/2.jpeg"},
    {songName:"killer Queen" , filepath:"items/songs/3.mp3" , coverpath:"items/cover/3.jpeg"},
    {songName:"Josuke Theme - Epic Version" , filepath:"items/songs/4.mp3" , coverpath:"items/cover/4.jpeg"},
    {songName:"Giorno's Theme" , filepath:"items/songs/5.mp3" , coverpath:"items/cover/5.jpeg"},
    {songName:"Bloody Stream" , filepath:"items/songs/6.mp3" , coverpath:"items/cover/6.jpeg"},
    {songName:"Awake" , filepath:"items/songs/7.mp3" , coverpath:"items/cover/7.jpeg"},
    {songName:"Crucified" , filepath:"items/songs/8.mp3" , coverpath:"items/cover/8.jpeg"},
    {songName:"A pimp name slick back" , filepath:"items/songs/9.mp3" , coverpath:"items/cover/9.jpeg"},
    {songName:"Jotaro Theme" , filepath:"items/songs/10.mp3" , coverpath:"items/cover/10.jpeg"},
]


songItems.forEach((e , f)=>{
    e.getElementsByTagName("img")[0].src = songs[f].coverpath;
    e.getElementsByTagName("span")[0].textContent = songs[f].songName;
});

/**------------ adding play pause ---------------*/
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        gif.style.opacity = 1
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    }else{
        audioElement.pause();
        gif.style.opacity = 0
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
    }
})

/**---------------- seek bar ------------------- */
audioElement.addEventListener("timeupdate",()=>{
    let progress = ((audioElement.currentTime/audioElement.duration)*100)
    progressbar.value = progress
    // time.textContent = progressbar.value
})
progressbar.addEventListener("change",()=>{
    audioElement.currentTime = (audioElement.duration*progressbar.value)/100;
})

function makeallplay(){
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add("fa-circle-play")    
        element.classList.remove("fa-circle-pause")    
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeallplay();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src = `items/songs/${songIndex}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.add("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-play")
        newcover()
        newTitle()
    })
})

document.getElementById("forward").addEventListener("click",()=>{
    if(songIndex >9){
        songIndex = 1
        newcover()
        newTitle()
        gif.style.opacity = 1
    }else{
        songIndex += 1
        newcover()
        newTitle()
        gif.style.opacity = 1
    }
    audioElement.src = `items/songs/${songIndex}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.add("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-play")
})

document.getElementById("backward").addEventListener("click",()=>{
    if(songIndex <=1){
        songIndex = 10
        newcover()
        newTitle()
        gif.style.opacity = 1
    }else{
        songIndex -= 1
        newcover()
        newTitle()
        gif.style.opacity = 1
    }
    audioElement.src = `items/songs/${songIndex}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.add("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-play")
})
function newcover(){
    document.getElementById("maincover").src = `items/cover/${songIndex}.jpeg`
}
function newTitle(){
    document.getElementById("MainSongTitle").textContent = songs[`${songIndex-1}`].songName
}
