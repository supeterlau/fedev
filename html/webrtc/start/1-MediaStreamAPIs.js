//checks if the browser supports WebRTC 
var stream;

const getId = id => document.getElementById(id)

let btnGetAudioTracks = getId('btnGetAudioTracks')
let btnGetTrackById = getId('btnGetTrackById')
let btnGetTracks = getId('btnGetTracks')
let btnGetVideoTracks = getId('btnGetVideoTracks')
let btnRemoveAudioTrack = getId('btnRemoveAudioTrack')
let btnRemoveVideoTrack = getId('btnRemoveVideoTrack')

function hasUserMedia() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  return !!navigator.getUserMedia;
}

if (hasUserMedia()) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  //get both video and audio streams from user's camera 
  navigator.getUserMedia({ video: true, audio: true }, function (userStream) {
    var video = document.querySelector('video');

    //insert stream into the video tag 
    //  video.src = window.URL.createObjectURL(stream); 
    video.srcObject = userStream;

    addBtn(userStream)

  }, function (err) {
    console.error(err)
  });

} else {
  alert("Error. WebRTC is not supported!");
}


function addBtn(stream) {
  btnGetAudioTracks.addEventListener("click", function () {
    console.log("getAudioTracks");
    console.log(stream.getAudioTracks());
  });

  btnGetTrackById.addEventListener("click", function () {
    console.log("getTrackById");
    if (stream.getAudioTracks() && stream.getAudioTracks().length > 0)
      console.log(stream.getTrackById(stream.getAudioTracks()[0].id));
    else
      console.log("no tracks")
  });

  btnGetTracks.addEventListener("click", function () {
    console.log("getTracks()");
    console.log(stream.getTracks());
  });

  btnGetVideoTracks.addEventListener("click", function () {
    console.log("getVideoTracks()");
    console.log(stream.getVideoTracks());
  });

  btnRemoveAudioTrack.addEventListener("click", function () {
    console.log("removeAudioTrack()");
    if (stream.getAudioTracks() && stream.getAudioTracks().length > 0)
      stream.removeTrack(stream.getAudioTracks()[0]);
    else
      console.log("no tracks")
  });

  btnRemoveVideoTrack.addEventListener("click", function () {
    console.log("removeVideoTrack()");
    if (stream.getVideoTracks() && stream.getVideoTracks().length > 0)
      stream.removeTrack(stream.getVideoTracks()[0]);
    else
      console.log("no tracks")

  });
}