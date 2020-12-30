//checks if the browser supports WebRTC 

// var conn = new RTCPeerConnection(conf); 

// conn.onaddstream = function(stream) { 
//    // use stream here 
// }; 

// var peerConn = new RTCPeerConnection(); 

// //establishing peer connection 
// //... 
// //end of establishing peer connection 

// var dataChannel = peerConnection.createDataChannel("myChannel", dataChannelOptions); 

// // here we can start sending direct messages to another peer 

function hasUserMedia() { 
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia 
     || navigator.mozGetUserMedia || navigator.msGetUserMedia; 
  return !!navigator.getUserMedia; 
}

if (hasUserMedia()) { 
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
     || navigator.mozGetUserMedia || navigator.msGetUserMedia;
   
  //get both video and audio streams from user's camera 
  navigator.getUserMedia({ video: true, audio: true }, function (stream) { 
     var video = document.querySelector('video'); 
   
     //insert stream into the video tag 
    //  video.src = window.URL.createObjectURL(stream); 
    video.srcObject = stream;
  }, function (err) {
    console.error(err)
  }); 
 
}else {
  alert("Error. WebRTC is not supported!"); 
}
