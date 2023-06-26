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

const handleVideoClick = (video) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

// We want to pass the context to the event handler so that
// the event processing logic can be reused.  What really changes
// is the context. In this case it is the video element.
// To acheive this, we go for a curried version of the event handler
// and then do  a partial application of this to tie the context.
const clickVideoHandlerCreator = (video) => {
  return () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
};

player.addEventListener('click', clickVideoHandlerCreator(video)); // partial application ties up the context

function updateToggleButtonStatus() {
  if (video.paused) {
    toggle.textContent = '►';
  } else {
    toggle.textContent = '❚ ❚';
  }
}

const updateToggleButtonStatusCreator = ({ video, toggle }) => {
  return () => {
    if (video.paused) {
      toggle.textContent = '►';
    } else {
      toggle.textContent = '❚ ❚';
    }
  };
};
const pausePlayHandler = updateToggleButtonStatusCreator({ video, toggle });

video.addEventListener('pause', pausePlayHandler);
video.addEventListener('play', pausePlayHandler);

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

// Avoid globals, and control the mutation by only the explicit methods
// in context.
const scrubContextCreator = (video, progress, progressBar) => {
  const context = { video, progress, progressBar };
  return {
    getVideo() {
      return video;
    },
    getProgress() {
      return progress;
    },
    getProgressBar() {
      return progressBar;
    },
    setPercentage(percentage) {
      context.percentage = percentage;
    },
    getPercentage() {
      return context.percentage;
    },
  };
};

// We shall make both the scub event handler and the debounced scrub video
// method to share a same context so that we can percolate the percentage and other values
// across these methods.
const scrubContext = scrubContextCreator(video, progress, progressBar);

const scrubVideoWithContextCreator = (context) => {
  return () => {
    console.count('scrubWithContext');
    console.log(context.getVideo());
    console.log(context.getPercentage());
    context.getVideo().currentTime =
      context.getPercentage() * context.getVideo().duration;
  };
};

const scrubVideoDebounced = _.debounce(
  scrubVideoWithContextCreator(scrubContext),
  100
);
const scrubWithContextCreator = (context) => {
  return function (event) {
    console.count('scrub');
    context.setPercentage(
      (event.offsetX / context.getProgress().offsetWidth) * 100
    );
    scrubVideoDebounced();
    context.getProgressBar().style.flexBasis = `${context.getPercentage()}%`; // why not width?
  };
};

// both scrub video event handler and the utility method to set the currentTime of video, share
// same context.
const scrubWithContext = scrubWithContextCreator(scrubContext);

// We dont want scrub to be called too many times in succession
// as that might cause some performace issues if the video is not available locally
// and instead is being streamed from  a CDN.
//const debouncedScrub = _.debounce(scrub, 100);

let scrubStarted = false;
progress.addEventListener('click', scrubWithContext);
progress.addEventListener('mousedown', () => {
  scrubStarted = true;
});
progress.addEventListener(
  'mousemove',
  (event) => scrubStarted && scrubWithContext(event)
);
progress.addEventListener('mouseup', (event) => {
  scrubStarted = false;
});
