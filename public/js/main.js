// initialize jukebox
const jukebox = document.querySelector('#audio');
const playForm = document.forms[0];
const playButton = document.querySelector('#play-button');
const playToggle = document.querySelector('#play-toggle');
const stopButton = document.querySelector('#stop-button');
const elapsedTime = document.querySelector('#elapsed-time');
const timeSlider = document.querySelector('#time-slider');
const volume = document.querySelector('#volume');
const volumeValue = document.querySelector('#volume-value');

// user can paste in a url and submit a song to be played
// http://www.noiseaddicts.com/samples_1w72b820/292.mp3" autofocus required
// or try this one: http://www.noiseaddicts.com/samples_1w72b820/292.mp3
// or this one: http://www.sample-videos.com/audio/mp3/wave.mp3

playForm.addEventListener('submit', function(event) {
  event.preventDefault();
  loadTrack(playForm.song.value);
});

function loadTrack(song) {
  //check if valid file
  if (song.match(/mp3$/)) {
    jukebox.src = song;
    jukebox.play();
    document.querySelector("#now-playing").textContent = "now playing: " + song;
    console.log("Current song: " + song);
  } else {
    playForm.song.value = "need valid mp3 url";
  };
};

// toggle play/pause function
function playbackToggle() {
  if (jukebox.paused == true) {
    jukebox.play();
    playToggle.innerHTML = "pause";
    console.log("Playback continued.");
  } else {
    jukebox.pause();
    playToggle.innerHTML = "play";
    console.log("Playback paused.");
  }
};

// use the play/pause button to toggle play/pause
playToggle.addEventListener('click', function() {
  playbackToggle();
}, false);

// use the stop button to stop play and reset time to 0
stopButton.addEventListener('click', function() {
  jukebox.pause();
  jukebox.currentTime = 0;
  console.log("Playback stopped.");
}, false);

// show the current time
jukebox.addEventListener("timeupdate", function() {
  // Could probably condense this stuff to a sweet ternary op statement
  let s = parseInt(jukebox.currentTime % 60);
  let m = parseInt((jukebox.currentTime / 60) % 60);
  if (m <= 9) m = '0' + m;
  if (s <= 9) s = '0' + s;
  let totalS = parseInt(jukebox.duration % 60);
  let totalM = parseInt((jukebox.duration / 60) % 60);
  if (totalM <= 9) totalM = '0' + totalM;
  if (totalS <= 9) totalS = '0' + totalS;

  setTime();

  elapsedTime.textContent = m + ':' + s + '/' + totalM + ':' + totalS;
}, false);

function setTime() {
  let newTime = jukebox.currentTime * (100 / jukebox.duration);
  timeSlider.value = newTime;
};

// change song time with time slider
timeSlider.addEventListener("input", function() {
  jukebox.currentTime = timeSlider.value;
}, false);

// change volume with slider, display volume
volume.addEventListener("input", function() {
  jukebox.volume = volume.value;
  volumeValue.innerHTML = volume.value;
}, false);
