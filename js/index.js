const HOUR = 60 * 60; // 3600 seconds
const MINUTE = 60;
const SECOND = 1;

let timerIntervalRef = undefined;
let timeLeft = 0;
let domTimeStr = undefined;
let domInputHour = undefined;
let domInputMinute = undefined;
let domInputSeconds = undefined;

let isPaused = false;

window.onload = function () {
    setup();
}

function setup() {
    domTimeStr = document.getElementById('timestring');

    domInputHour = document.getElementById('txt_hours');
    domInputMinute = document.getElementById('txt_minutes');
    domInputSeconds = document.getElementById('txt_seconds');

    document.getElementById('start').onclick = function (evt) {
        startTimer();
    }
    document.getElementById('stop').onclick = function (evt) {
        stopTimer();
    }
    document.getElementById('pause').onclick = function (evt) {
        pauseTimer();
    }
    document.getElementById('reset').onclick = function (evt) {
        resetTimer();
    }

    document.querySelectorAll('input').forEach(function (input) {
        input.addEventListener('input', function (event) {
            if (!isTimerRunning()) {
                setTimeRemainingFromInputs();
                showTimeRemainingOnScreen();
            }
        });
    });
    setTimeRemainingFromInputs();
    showTimeRemainingOnScreen();

}

function isTimerRunning() {
    return timerIntervalRef !== undefined;
}

function setTimeRemainingFromInputs() {
    timeLeft = getTimeValues();
}

function stopTimer() {
    clearInterval(timerIntervalRef);
    timerIntervalRef = undefined;
}

function resetTimer() {
    stopTimer();
    setTimeRemainingFromInputs();
    showTimeRemainingOnScreen();
}

function pauseTimer() {
    isPaused = !isPaused;
    if (isPaused) {
        domTimeStr.classList.add('paused');
    } else {
        domTimeStr.classList.remove('paused');
    }

}

/**
 * Get the value of the user input, in seconds
 * @returns {number}
 */
function getTimeValues() {
    if (domInputHour && domInputMinute && domInputSeconds) {
        const hours = parseInt(domInputHour.value);
        const minutes = parseInt(domInputMinute.value);
        const seconds = parseInt(domInputSeconds.value);
        return hours * HOUR + minutes * MINUTE + seconds * SECOND;
    }
    return 0;
}

function showTimeFinished() {
    domTimeStr.classList.add('timeFinished');
}

function resetClassListOnTimer() {
    domTimeStr.classList.remove('timeFinished');
}

function createTimeString() {
    let calcValue = timeLeft;
    const hours = Math.trunc(calcValue / HOUR);
    calcValue -= hours * HOUR;
    const minutes = Math.trunc(calcValue / MINUTE);
    calcValue -= minutes * MINUTE;
    const seconds = calcValue / SECOND;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;

}

function showTimeRemainingOnScreen(){
    domTimeStr.textContent = createTimeString();
}

function startTimer() {
    stopTimer();
    isPaused = false;
    resetClassListOnTimer();

    setTimeRemainingFromInputs();

    timerIntervalRef = setInterval(function () {
        if (!isPaused) {
            if (timeLeft > 0) {
                timeLeft--;
                showTimeRemainingOnScreen();
            } else {
                stopTimer();
                showTimeFinished();
            }
        }
    }, 1000);

}
