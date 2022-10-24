// Define EventListener on DOM Content Load:

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn= document.querySelector('#start-button')
  const width = 10
    
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
 
//Define CurrentPosition and Current Rotation variables

let currentPosition = 4
let currentRotation = 0

// Select randomly a Tetromino and first rotation
let random = Math.floor(Math.random() * theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]


//Define and draw tetromino
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
    })
  }

// Remove and undraw the tetromino
function undraw() {
    current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')
    })
  } 
  
//Timer Interval to move tetromino down every second
timerid = setInterval(moveDown, 1000)

// Assign functions to arrow keys using keycodes, http://keycode.info/
function control(e) {
  if(e.keyCode === 37) {
    moveLeft()
  } else if (e.keyCode === 38) {
    rotate()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 40) {
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
function freeze(){
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    // New tetromino falling down the screen 
    random =   Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
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
let displayIndex = 0

// Tetrominos on mini-display without rotation
const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //iTetromino
]
})
