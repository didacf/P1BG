// Define EventListener on DOM Content Load:
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn= document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
    'red', 
    'green',
    'blue',
    'orange',
    'pink',
    'purple'
]
    
// Define Tetrominoes (Tetris blocks) arrays
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width+1, width*2, width*2+1,width*2+2]
]

const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]      
]

const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1,width+2, width*2+1],
    [1, width, width+1, width*2+1]
]

const oTetromino = [
    
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]        
]

const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
]

//Define Tetrominoes array
const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
let currentPosition = 4
let currentRotation = 0

// Select randomly a Tetromino and first rotation
let random = Math.floor(Math.random() * theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]

//Define and draw tetromino
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

// Remove and undraw the tetromino
function undraw() {
    current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
    })
  } 
  
//Timer Interval to move tetromino down every second
//timerid = setInterval(moveDown, 1000)

// Assign functions to arrow keys using keycodes, https://www.toptal.com/developers/keycode
function control(key) {
  if(key.keyCode === 37) {
    moveLeft()
  } else if (key.keyCode === 38) {
    rotate()
  } else if (key.keyCode === 39) {
    moveRight()
  } else if (key.keyCode === 40) {
    moveDown()
}
document.addEventListener('keyup', control)

//Descending Function
function moveDown(){
    undraw()
    currentPosition += width
    draw()
    freeze()
}

// Freeze functions with new tetromino falling down 
function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    // New tetromino falling down the screen 
    random = nextRandom
    nextRandom =   Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
    addScore()
    gameOver()
    }
}
// Move tetromino left, unless edge or blockage
function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
    }
    draw()
}

// Move tetromino right, unless edge or blockage
function moveRight(){
    undraw()
    const isAtRighEdge = current.some(index => (currentPosition + index) % width === -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
    }
    draw()
}

// Rotate function for the tetrominoes
function rotate() {
    undraw()
    currentRotation++
    if(currentRotation === current.length) {
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

// Preview in mini-grid next tetromino
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
const displayIndex = 0

// Tetrominos on mini-display without rotation 
const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //iTetromino
]

//Display shape mini-grid funcion //
function displayShape() {
    // Remove tetromino form the entire grid //
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
}

//Define Start/Pause Functionality
startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayShape()
    }
})

//Score counter and display definition
function addScore() {
    for (let i= 0; i < 199; i +=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+8, i+9]

        if (row.every(index => squares[index].classList.contains('taken'))) {
            score += 10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

//Define function Game Over
function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)
    }
}

})