let process = false

function clear(params) {
    
}


function game()

{var button1 = document.getElementById("myButton1");
var button2 = document.getElementById("myButton2");
var button3 = document.getElementById("myButton3");
var button4 = document.getElementById("myButton4");
let cont = document.querySelector('.cont')
let numb=0
let score = document.querySelector('#score')
let start = document.querySelector('.start')
process=(true)
if (process) {
    start.classList.add('none')
}

for (let i = 0; i < 414; i++) {
    let block = document.createElement('div')
    cont.appendChild(block)
    block.classList.add('block')
}
let block = document.getElementsByClassName('block')

let x = 1,
    y = 23

for (let i = 0; i < block.length; i++) {
    if (x > 18) {
        x = 1
        y--;
    }
    block[i].setAttribute('posX', x)
    block[i].setAttribute('posY', y)
    x++
}

let coordinates = [9, 16]

function generateSnake() { }
let snakebody = [document.querySelector('[posX ="' + coordinates[0] + '"][posY ="' + coordinates[1] + '"]'),
document.querySelector('[posX ="' + (coordinates[0] - 1) + '"][posY ="' + coordinates[1] + '"]'),
document.querySelector('[posX ="' + (coordinates[0] - 2) + '"][posY ="' + coordinates[1] + '"]')]

for (let i = 0; i < snakebody.length; i++) {
    snakebody[i].classList.add('body')
}
snakebody[0].classList.add('head')

let fruit

function createFruit() {
    let posX = Math.round(Math.random() * (13 - 3) + 3)
    let posY = Math.round(Math.random() * (23 - 1) + 1)
    return [posX, posY]
}

function cfruit() {
    let fCoordinates = createFruit()
    fruit = document.querySelector('[posX ="' + (fCoordinates[0]) + '"][posY ="' + fCoordinates[1] + '"]')

    while (fruit.classList.contains('body')) {
        let fCoordinates = createFruit()
        fruit = document.querySelector('[posX ="' + (fCoordinates[0]) + '"][posY ="' + fCoordinates[1] + '"]')
    }

    fruit.classList.add('fruit')
}
cfruit()

let direction = 'right'

function move() {
    let coordinates = [snakebody[0].getAttribute('posX'), snakebody[0].getAttribute('posY')];
    snakebody[0].classList.remove('head');
    snakebody[snakebody.length - 1].classList.remove('body');
    snakebody.pop();

    let newElement;
    if (direction == 'right') {
        if (coordinates[0] < 18) {
            newElement = document.querySelector('[posX = "' + (+coordinates[0] + 1) + '"][posY = "' + coordinates[1] + '"]');
        } else {
            newElement = document.querySelector('[posX = "1"][posY = "' + coordinates[1] + '"]');
        }
    } else if (direction == 'left') {
        if (coordinates[0] > 1) {
            newElement = document.querySelector('[posX = "' + (+coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]');
        } else {
            newElement = document.querySelector('[posX = "18"][posY = "' + coordinates[1] + '"]');
        }
    } else if (direction == 'up') {
        if (coordinates[1] < 23) {
            newElement = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + (+coordinates[1] + 1) + '"]');
        } else {
            newElement = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "1"]');
        }
    } else if (direction == 'bottom') {
        if (coordinates[1] > 1) {
            newElement = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + (+coordinates[1] - 1) + '"]');
        } else {
            newElement = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "23"]');
        }
    }

    if (newElement) {
        snakebody.unshift(newElement);
    }

    // Проверяем, что snakebody[0] и fruit существуют, прежде чем получать их атрибуты
    if (snakebody[0] && fruit) {
        if (snakebody[0].getAttribute('posX') == fruit.getAttribute('posX') && snakebody[0].getAttribute('posY') == fruit.getAttribute('posY')) {
            fruit.classList.remove('fruit');
            let a = snakebody[snakebody.length - 1].getAttribute('posX');
            let b = snakebody[snakebody.length - 1].getAttribute('posY');
            snakebody.push(document.querySelector('[posX="' + a + '"][posY="' + b + '"]'));
            cfruit();
           numb++
            score.innerHTML= numb
            
        }
    }
    if (snakebody[0].classList.contains('body')) {alert('game over')
        
    }

    if (snakebody[0]) {
        snakebody[0].classList.add('head');
    }

    for (let i = 1; i < snakebody.length; i++) {
        snakebody[i].classList.add('body');
    }
}









let interval = setInterval(move, 250)




































document.addEventListener("keydown", function (event) {
    if (event.keyCode === 40 & direction!== 'up') { // Стрелка вниз
        direction = 'bottom';
    } else if (event.keyCode === 37 & direction!== 'right' ) { // Стрелка влево
        direction = 'left';
    } else if (event.keyCode === 39 & direction!== 'left') { // Стрелка вправо
        direction = 'right';
    } else if (event.keyCode === 38 & direction!== 'bottom') { // Стрелка вверх
        direction = 'up';
    }
});

button1.addEventListener("click", function () {
    if (direction != 'up') {
        direction = 'bottom';
    }
});

button2.addEventListener("click", function () {
    if (direction != 'right') {
        direction = 'left';
    }
});

button3.addEventListener("click", function () {
    if (direction != 'left') {
        direction = 'right';
    }
});

button4.addEventListener("click", function () {
    if (direction != 'bottom') {
        direction = 'up';
    }
});


}
let startX, startY, endX, endY;

document.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener("touchend", function (event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Горизонтальный свайп
        if (deltaX > 0 && direction !== 'left') {
            direction = 'right';
        } else if (deltaX < 0 && direction !== 'right') {
            direction = 'left';
        }
    } else {
        // Вертикальный свайп
        if (deltaY > 0 && direction !== 'up') {
            direction = 'bottom';
        } else if (deltaY < 0 && direction !== 'bottom') {
            direction = 'up';
        }
    }
});

