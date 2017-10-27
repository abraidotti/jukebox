function(ENV, ) {
  console.log("Main.js is hooked up.");

  // initialize jukebox
  var jukebox = document.querySelector('#audio');

  // handle the load form
  var playForm = document.querySelector('#play-form');

  // load a track and play it
  var playTrack = document.querySelector('#play-track');

  // play/pause and stop the track
  var playToggle = document.querySelector('#play-toggle');
  var playStop = document.querySelector('#play-stop');

  var elapsedTime = document.querySelector('#elapsed-time');

  // user can paste in a url and submit a song to be played
  // example: http://www.noiseaddicts.com/samples_1w72b820/292.mp3

  playForm.addEventListener('submit', function(event) {
    // since the form reloads the page on submission,
    // we need this special function:
    event.preventDefault();
    // get value from input
    // since we named the input "playTrack," we can call it like a property
    let track = event.target.playTrack
    jukebox.src = track.value;
    jukebox.play();
    document.querySelector("#now-playing").innerHTML = "now playing: " + track.value;
    console.log("Current track:" + jukebox.currentSrc)
  });

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
  playStop.addEventListener('click', function() {
    jukebox.pause();
    jukebox.currentTime = 0;
    console.log("Playback stopped.");
  }, false);

  // // show the current time
  // showElapsedTime = function() {
  //  let currentTime = formatTime(jukebox.currentTime);
  //  let duration = formatTime(jukebox.duration);
  //
  // convert seconds to minutes and seconds
  //  function formatTime(seconds) {
  //     minutes = Math.floor(seconds / 60);
  //     minutes = (minutes >= 10) ? minutes : "0" + minutes;
  //     seconds = Math.floor(seconds % 60);
  //     seconds = (seconds >= 10) ? seconds : "0" + seconds;
  //     return minutes + ":" + seconds;
  //   };
  //
  //  // update elapsed time in the dom
  //  document.querySelector("#elapsed-time").innerHTML = currentTime + '/' + duration;
  // };

  // setInterval(showElapsedTime, 1000);

  // change volume with volume slider
  function changeVolume() {
    var jukeboxVolume = document.getElementById('volume');
    var volumeValue = document.getElementById('volume-value');
    volumeValue.innerHTML = jukeboxVolume.value + " %";
    jukebox.volume = jukeboxVolume.value / 100;
    console.log("jukebox volume: " + jukebox.volume + "%")
  };

  // track time elapsed with time slider

  // change song time with time slider


  // playlist functionality:

  // handle the form
  var playlistForm = document.getElementById('playlist-form');

  // make the list
  var playList = document.getElementById('playlist');

  // add a button to remove the last child
  var removeFirst = document.getElementById('remove-first');

  // add a button to remove the last child
  var removeLast = document.getElementById('remove-last');

  playlistForm.addEventListener('submit', function(event) {
    // since the form reloads the page on submission,
    // we need this special function:
    event.preventDefault();

    // get value from input
    // since we named the input "task," we can call it
    // like a property
    let track = event.target.track
    console.log(track.value)

    // build an <li> tag with value
    let li = '<li>' + track.value + '</li>';
    // let li = '<li onclick=playPlaylistTrack()>'
    // add <li> to <ul>
    playList.innerHTML += li;

    // clear the form box
    track.value = ' ';
  });

  // build a button to remove last child
  removeFirst.addEventListener('click', function() {
    playList.firstElementChild.remove();
  });

  // build a button to remove last child
  removeLast.addEventListener('click', function() {
    playList.lastElementChild.remove();
  });

}(ENV);
