const startBtn = document.querySelector('#start');
const screen = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const color = ['rgb(255, 161, 177)', 'rgb(209, 28, 140)', 'rgb(222, 86, 235)', 'rgb(167, 11, 11)', 'rgb(255, 119, 119)', 'rgb(235, 86, 166)'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screen[0].classList.add('up');
});


timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screen[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove();
        createRandomCircle()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current);
    }

}
function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет:<span class="primary">${score}</span><h1>`;
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(60, 10);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(width - size, 0);
    const y = getRandomNumber(height - size, 0);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    const circleColor = getRandomColor();
    const a = circle.style.background = circleColor;
    console.log(a);

    board.append(circle);
}

function getRandomNumber(max, min) {
    return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
    return color[Math.floor(Math.random() * color.length)];
}