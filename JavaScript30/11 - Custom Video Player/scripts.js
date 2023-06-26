/* Get Our Elements */
const player = document.querySelector('.player');
console.assert(player !== null, 'player should be non null');
/**
 *  * @type {HTMLVideoElement}
 */
const video = player.querySelector('.viewer');
console.assert(video !== null);
const progress = player.querySelector('.progress');
console.assert(video !== null);

const progressBar = player.querySelector('.progress__filled');
console.assert(progressBar !== null);

const toggle = player.querySelector('.toggle');
console.assert(toggle !== null);

const skipButtons = player.querySelectorAll('[data-skip]');
console.assert(skipButtons !== null);

const ranges = player.querySelectorAll('.player__slider');
console.assert(ranges !== null);

const fullscreenButton = document.querySelector('.fullscreen');
console.assert(fullscreenButton !== null);

const loader = document.querySelector('.loader');
console.assert(loader !== null);

const tooltip = document.querySelector('.tooltip');
console.assert(tooltip !== null);

// show progress
function showProgress() {
  loader.style.display = 'block';
}
function hideProgress() {
  loader.style.display = 'none';
}
showProgress();
player.addEventListener('click', (event) => {
  // Check if video is playing, if so pause it, otherwise play it
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

function updateToggleButtonStatus() {
  if (video.paused) {
    toggle.textContent = '►';
  } else {
    toggle.textContent = '❚ ❚';
  }
}

video.addEventListener('pause', () => {
  updateToggleButtonStatus();
});
video.addEventListener('play', () => {
  updateToggleButtonStatus();
});

function enterFullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); // Firefox
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // Safari
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen(); // IE/Edge
  }
}

fullscreenButton.addEventListener('click', enterFullScreen);

video.oncanplay = () => {
  hideProgress();
};

function scrub(event) {
  const percentage = (event.offsetX / progress.offsetWidth) * 100;
  console.log(percentage);
  video.currentTime = percentage * video.duration;
  progressBar.style.flexBasis = `${percentage}%`;
  tooltip.style.left = `${percentage}%`;
  tooltip.style.right = `4px`;
}
let scrubStarted = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => {
  scrubStarted = true;
  showProgress();
});
progress.addEventListener('mousemove', (event) => scrubStarted && scrub(event));
progress.addEventListener('mouseup', (event) => {
  scrubStarted = false;
});
