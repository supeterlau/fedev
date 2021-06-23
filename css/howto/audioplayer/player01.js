/*
 * player01.js
 * Copyright (C) 2021 Peter Lau <superpeterlau@outlook.com>
 *
 * Distributed under terms of the MIT license.
 */

import lottieWeb from "https://cdn.skypack.dev/lottie-web";

const playIcon = document.getElementById("play-icon");
const audioPlayer = document.getElementById("audio-player");
const seekSlider = document.getElementById("seek-slider");
const volumeSlider = document.getElementById("volume-slider");
const muteIcon = document.getElementById("mute-icon");

const audio = document.querySelector("#audio-player audio");
const duration = document.getElementById("duration");
const currentTime = document.getElementById("current-time");
const output = document.getElementById("volume-output");

let rAF = null;
let state = "play";
let muteState = "unmute";

const whilePlaying = () => {
  seekSlider.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(seekSlider.value);
  audioPlayer.style.setProperty(
    "--seek-before-width",
    `${(seekSlider.value / seekSlider.max) * 100}%`
  );
  rAF = requestAnimationFrame(whilePlaying);
};

const calculateTime = (secs) => {
  // console.log(secs);
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnSeconds}`;
};

const displayDuration = () => {
  duration.textContent = calculateTime(audio.duration);
};

const setSliderMax = () => {
  seekSlider.max = Math.floor(audio.duration);
};

const displayBufferedAmount = () => {
  const bufferedAmount = Math.floor(
    audio.buffered.end(audio.buffered.length - 1)
  );
  audioPlayer.style.setProperty(
    "--buffered-width",
    `${(bufferedAmount / seekSlider.max) * 100}%`
  );
};

const playAnimation = lottieWeb.loadAnimation({
  container: playIcon,
  path:
    "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json",
  renderer: "svg",
  loop: false,
  autoplay: false,
  name: "play-pause Animation",
});

const muteAnimation = lottieWeb.loadAnimation({
  container: muteIcon,
  path:
    "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json",
  renderer: "svg",
  loop: false,
  autoplay: false,
  name: "mute Animation",
});

playAnimation.goToAndStop(14, true);

playIcon.addEventListener("click", () => {
  console.log(audio.duration);
  console.log(audio.currentTime);
  if (state == "play") {
    audio.play();
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    state = "pause";
  } else {
    audio.pause();
    playAnimation.playSegments([0, 14], true);
    cancelAnimationFrame(rAF);
    state = "play";
  }
});

muteIcon.addEventListener("click", () => {
  if (muteState === "unmute") {
    muteAnimation.playSegments([0, 15], true);
    audio.muted = true;
    muteState = "mute";
  } else {
    muteAnimation.playSegments([15, 25], true);
    audio.muted = false;
    muteState = "unmute";
  }
});

const showRangeProgress = (rangeInput) => {
  if (rangeInput === seekSlider) {
    audioPlayer.style.setProperty(
      "--seek-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
  } else {
    audioPlayer.style.setProperty(
      "--volume-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
  }
};

seekSlider.addEventListener("input", (e) => {
  showRangeProgress(e.target);
});

seekSlider.addEventListener("input", () => {
  currentTime.textContent = calculateTime(seekSlider.value);
  if (!audio.paused) {
    cancelAnimationFrame(rAF);
  }
});

volumeSlider.addEventListener("input", (e) => {
  showRangeProgress(e.target);
});

seekSlider.addEventListener("change", () => {
  // 设置 audio current time 为 slider 值
  audio.currentTime = seekSlider.value;
  if (!audio.paused) {
    requestAnimationFrame(whilePlaying);
  }
});

if (audio.readyState > 0) {
  displayDuration();
  setSliderMax();
  displayBufferedAmount();
} else {
  audio.addEventListener("loadeddata", () => {
    console.log(audio.duration);
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
  });
}

audio.addEventListener("progress", displayBufferedAmount);

audio.addEventListener("timeupdate", () => {
  // 设置 seekSlider 值和 audio 进度一致
  seekSlider.value = Math.floor(audio.currentTime);
});

volumeSlider.addEventListener("input", (e) => {
  const value = e.target.value;
  output.textContent = value;
  audio.volume = value / 100;
});

if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: "Komorebi",
    artist: "Anitek",
    album: "MainStay",
    artwork: [
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "https://assets.codepen.io/4358584/1.300.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });

  navigator.mediaSession.setActionHandler("play", () => {
    if (state === "play") {
      audio.play();
      playAnimation.playSegments([14, 27], true);
      requestAnimationFrame(whilePlaying);
      state = "pause";
    } else {
      audio.pause();
      playAnimation.playSegments([0, 14], true);
      cancelAnimationFrame(rAF);
      state = "play";
    }
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    if (state === "play") {
      audio.play();
      playAnimation.playSegments([14, 27], true);
      requestAnimationFrame(whilePlaying);
      state = "pause";
    } else {
      audio.pause();
      playAnimation.playSegments([0, 14], true);
      cancelAnimationFrame(rAF);
      state = "play";
    }
  });

  navigator.mediaSession.setActionHandler("seekbackward", (details) => {
    console.log(details);
    audio.currentTime = audio.currentTime - (details.seekOffset || 10);
  });

  navigator.mediaSession.setActionHandler("seekforward", (details) => {
    console.log(details);
    audio.currentTime = audio.currentTime + (details.seekOffset || 10);
  });

  navigator.mediaSession.setActionHandler("seekto", (details) => {
    console.log(details);
    if (details.fastSeek && "fastSeek" in audio) {
      audio.fastSeek(details.seekTime);
      return;
    }
    audio.currentTime = details.seekTime;
  });

  navigator.mediaSession.setActionHandler("stop", () => {
    audio.currentTime = 0;
    seekSlider.value = 0;
    audioPlayer.style.setProperty("--seek-before-width", "0%");
    currentTime.textContent = "0:00";
    if (state === "pause") {
      playAnimation.playSegments([0, 14], true);
      cancelAnimationFrame(rAF);
      state = "play";
    }
  });
}
