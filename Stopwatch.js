
const minutesEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.sec');
const millisecondsEl = document.querySelector('.msec');
const lapsContainer = document.querySelector('.laps');
const resetButton = document.querySelector('.button:nth-child(1)');
const playButton = document.querySelector('.button:nth-child(2)');
const lapsButton = document.querySelector('.button:nth-child(3)');
const clearLapsButton = document.querySelector('.lap-clear-button');

let minutes = 0, seconds = 0, milliseconds = 0;
let interval = null;
let isRunning = false;


function updateDisplay() {
    minutesEl.textContent = String(minutes).padStart(2, '0') + ':';
    secondsEl.textContent = String(seconds).padStart(2, '0') + '.';
    millisecondsEl.textContent = String(milliseconds).padStart(2, '0');
}


function toggleStopwatch() {
    if (isRunning) {
        clearInterval(interval);
        playButton.textContent = 'Play';
    } else {
        interval = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
        playButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}


function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    playButton.textContent = 'Play';
}

function recordLap() {
    if (!isRunning) return; 
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.innerHTML = `
        <span class="number">#${lapsContainer.children.length + 1}</span>
        <span class="time-stamp">${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}</span>
    `;
    lapsContainer.appendChild(lapItem);
}


function clearLaps() {
    lapsContainer.innerHTML = '';
}


playButton.addEventListener('click', toggleStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapsButton.addEventListener('click', recordLap);
clearLapsButton.addEventListener('click', clearLaps);


updateDisplay();
