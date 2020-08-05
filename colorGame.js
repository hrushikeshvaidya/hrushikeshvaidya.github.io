//Define the function to call if the right color is picked
function correctChoice () {
    if (mode === 'hard') {
        for (var i = 0; i < colorBtns.length; i++) {
            colorBtns[i].classList.add('correct');
            colorBtns[i].style.backgroundColor = pickedColor;
            head.style.backgroundColor = pickedColor;
        }
    }
    else {
        for (var i = 0; i < 3; i++) {
            colorBtns[i].classList.add('correct');
            colorBtns[i].style.backgroundColor = pickedColor;
            head.style.backgroundColor = pickedColor;
        }
    }
}

function randColor () {
    var index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function generateColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        r = Math.floor(Math.random()*255);
        g = Math.floor(Math.random()*255);
        b = Math.floor(Math.random()*255);
        arr.push('rgb('+r+', '+g+', '+b+')');
    }
    return arr;
}

function resetGame () {
    if (mode === 'easy') {
        colors = generateColors(3);
        colorBtns[3].style.opacity = 0;
        colorBtns[4].style.opacity = 0;
        colorBtns[5].style.opacity = 0;
    }
    else {
        colors = generateColors(6);
    }
    pickedColor = randColor();
    colorDisplay.textContent = pickedColor;
    message.textContent = 'Click A Square';
    for (var i = 0; i < colorBtns.length; i++) {
        colorBtns[i].style.backgroundColor = colors[i];
        colorBtns[i].classList.add('correct');
        head.style.backgroundColor = 'grey';
    }
    if (mode === 'easy') {
        colorBtns[3].style.opacity = 0;
        colorBtns[4].style.opacity = 0;
        colorBtns[5].style.opacity = 0;
        colorBtns[3].classList.remove('correct');
        colorBtns[4].classList.remove('correct');
        colorBtns[5].classList.remove('correct');
    }
}

//Get all the buttons
var colorBtns = document.querySelectorAll('.color');
var colorDisplay = document.querySelector('.color-code');
var resetBtn = document.getElementById('play-again');
var head = document.querySelector('.header');
var message = document.querySelector('#message');
var easy = document.querySelector('#easy');
var hard = document.querySelector('#hard');
var mode = 'hard';

colors = generateColors(6);

easy.addEventListener('click', function() {
    console.log('easy mode');
    mode = 'easy';
    colors = generateColors(3);
    colorBtns[3].style.opacity = 0;
    colorBtns[4].style.opacity = 0;
    colorBtns[5].style.opacity = 0;
    resetGame();
})

hard.addEventListener('click', function() {
    console.log('hard mode');
    mode = 'hard';
    colors = generateColors(6);
    resetGame();
})

pickedColor = randColor();

//Add the reset button click listener
resetBtn.addEventListener('click', function () {
    resetGame();
})

//Set initial color from the colors array and add the listeners
for (var i = 0; i < colorBtns.length; i++) {
    colorBtns[i].style.backgroundColor = colors[i];
    colorBtns[i].addEventListener('click', function () {
        if (this.style.backgroundColor === pickedColor) {
            console.log('Correct color');
            message.textContent = 'Correct!';
            correctChoice();
        }
        else {
            console.log('Wrong color');
            message.textContent = 'Try Again';
            this.classList.remove('correct');
            this.classList.add('fade-out');
        }
    });
}
//Set the textContent of the heading to be the initial color
colorDisplay.textContent = pickedColor;
colorDisplay.style.color = 'black';