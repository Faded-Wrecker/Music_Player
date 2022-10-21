console.log("Welcome to spotify");
let songIndex=0;
let audioElement=new Audio('song/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let MasterSongName=document.getElementById('masterSongName');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem')); //used Array.from because it's an html collection
let songs=[
    {songName:"Let me love you-Justin Bieber", filePath:"song/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Nakhre-Zack Knight", filePath:"song/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Tonight-Enrique Iglesias", filePath:"song/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"La gozadera-Gente De Zona ", filePath:"song/4.mp3",coverPath:"covers/4.jpg.jfif"},
    {songName:"Ain't your mama-Jennifer Iglesias", filePath:"song/5.mp3",coverPath:"covers/5.jfif"},
    {songName:"Back to life-Sean Kingston", filePath:"song/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Limbo-Daddy y Yankee", filePath:"song/7.mp3",coverPath:"covers/7.jpg"},
]
songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
// Handle play/pause
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused||audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
       gif.style.opacity=1; 
    }
    
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0; 
        
    }
});

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    // Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})
// For seeking
myProgressBar.addEventListener('change',()=>{
audioElement.currentTime=myProgressBar.value *  audioElement.duration/100;  
// from percentage to duration
})
const makeAllplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
     element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        
        })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click',(e)=>{
    makeAllplays();
    songIndex=parseInt(e.target.id);
    // console.log(e.target);
    e.target.classList.remove('fa-play-circle');   //removing the fa-play-circle class inside e.target
    e.target.classList.add('fa-pause-circle');
    audioElement.src=`song/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
})
})
document.getElementById('next').addEventListener('click',()=>{
    if (songIndex>=7) {
        songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src=`song/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex<=0) {
        songIndex=0;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src=`song/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
})