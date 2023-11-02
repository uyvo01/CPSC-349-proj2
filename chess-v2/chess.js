//import "pieces.js";
let whosTurn = "white"
let whiteTime = 181;
let blackTime = 180; 
const audio = new Audio('move_sound.wav');

const timerElement = document.getElementById('timer');


function updateTime() {
  if(whosTurn === "white") {
    
    timerElement.textContent = `White's Turn: ${formatTime(whiteTime)}`;
  }
  else {
    timerElement.textContent = `Black's Turn: ${formatTime(blackTime)}`;

  }
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchTurns() {
  if (whosTurn === "white") {
    whiteTime += 2;
    whosTurn = "black";
    updateTime();
    
  } else {
    blackTime += 2;
    whosTurn = "white";
    updateTime();
  }
}
setInterval(() => {
  if (whosTurn === 'white') {
      whiteTime--;
  } else {
      blackTime--;
  }
  updateTime();
}, 1000);
function pawnEvolution(beingDragged, targetX, targetY) {
  let dragColor = beingDragged.classList.toString();
  const piece = prompt(
    "Choose a piece to replace the pawn:\nQueen, Rook, Bishop, or Knight"
  );
  if (piece) {
    switch (piece.toLowerCase()) {
      case "queen":
        beingDragged.innerHTML = "♛"; 
        chessboard[targetX][targetY] = new Queen(targetX, targetY, dragColor);
        beingDragged.id = "queen"
        break;
      case "rook":
        beingDragged.textContent = "♜";
        chessboard[targetX][targetY] = new Rook(targetX, targetY, true, dragColor);
        beingDragged.id = "rook"
        break;
      case "bishop":
        beingDragged.textContent = "♝";
        chessboard[targetX][targetY] = new Bishop(targetX, targetY, dragColor);
        beingDragged.id = "bishop"
        break;
      case "knight":
        beingDragged.textContent = "♞";
        chessboard[targetX][targetY] = new Knight(targetX, targetY, dragColor);
        beingDragged.id = "knight"
        break;
      default:
        alert("Invalid choice. Please select again.");
        pawnEvolution(beingDragged, targetX, targetY);
    }
  }
  else {
    pawnEvolution(beingDragged, targetX, targetY);
  }
}

class emptyPiece {
  constructor() {

  }
  movement() {
    return false;
  }
}
class Pawn {
  constructor(posX, posY, 
    hasMoved, color) {
          this.posX = posX;
          this.posY = posY;
          this.hasMoved = hasMoved;
          this.color = color;
  }
  pawnPassant() {

  }
      movement(beingDragged, targetX, targetY) {
          let startX = beingDragged.parentNode.getAttribute('data-row') - 0;
          let startY = beingDragged.parentNode.getAttribute('data-col') - 0;
          let dragColor = beingDragged.classList.toString();
          if (targetX === startX) {
            return false;
          }
          if (dragColor === 'black') {

            if (!chessboard[startX][startY].hasMoved) {
              //black chess pawn that has not moved moves forward or takes a piece
              if ((startX + 1 === targetX && startY === targetY && chessboard[targetX][targetY] === ePiece
              || ((Math.abs(startY - targetY) === 1 && chessboard[targetX][targetY] !== ePiece))) 
              || (startX + 2 === targetX && startY === targetY 
              && chessboard[startX + 1][startY] === ePiece
              && chessboard[startX + 2][startY] === ePiece))

              {
                // update chessboard array
                chessboard[startX][startY].hasMoved = true
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece
                return true
              }
              //invalid move
              else {
                return false
              }
            }
            else {
              //black piece that has moved before moves forward
              if(startX + 1 === targetX && targetY === startY 
                && chessboard[targetX][targetY] === ePiece) {
                console.log("impervious")
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece;
                if(targetX === 7) {
                  pawnEvolution(beingDragged, targetX, targetY)
                }
                return true
              }
              // black pawn that has moved takes a piece
              else if ((startX + 1 === targetX && Math.abs(startY - targetY) === 1) 
              && chessboard[targetX][targetY].color !== dragColor 
              && chessboard[targetX][targetY] !== ePiece) {
                
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece
                if(targetX === 7) {
                  pawnEvolution(beingDragged, targetX, targetY)
                }
                return true
            }
            else {
              return false
            }
          }
          }
          else if (dragColor === 'white'){
            if(!chessboard[startX][startY].hasMoved) {
              // white piece that hasnt moved moves forward or takes a piece
              if((startX - 1 === targetX && startY === targetY && chessboard[targetX][targetY] === ePiece
                || ((Math.abs(startY - targetY) === 1 && chessboard[targetX][targetY] !== ePiece))) 
                || (startX - 2 === targetX && startY === targetY 
                && chessboard[startX - 1][startY] === ePiece
                && chessboard[startX - 2][startY] === ePiece)) {

                chessboard[startX][startY].hasMoved = true
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece
                return true
              }
              else {
                return false
              }
            }
            else {
              //white piece that has moved moves forward
              if(startX - 1 === targetX && targetY === startY && chessboard[targetX][targetY] === ePiece) {
                
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece
                if(targetX === 0) {
                  pawnEvolution(beingDragged, targetX, targetY)
                }
                return true
              }
              //white piece that has moved takes another piece
              else if (startX - 1 === targetX && Math.abs(startY - targetY) === 1 
              && chessboard[targetX][targetY].color !== dragColor
              && chessboard[targetX][targetY] !== ePiece) {
                
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece
                
                if(targetX === 0) {
                  pawnEvolution(beingDragged, targetX, targetY)
                }
                return true
              }
              else {
                return false
              }
            }
          }
      }
}
class Bishop {
  constructor(posX, posY, color) {
          this.posX = posX;
          this.posY = posY;
          this.color = color;
  }
  movement(beingDragged, targetX, targetY) {
    let startX = beingDragged.parentNode.getAttribute('data-row') - 0;
    let startY = beingDragged.parentNode.getAttribute('data-col') - 0;
    let diffX = Math.abs(targetX - startX);
    let diffY = Math.abs(targetY - startY);
    // if target square is not diagonal
    if (diffX !== diffY) {
      return false;
    }
    // determine which quadrant your target square is in, top left, top right, bottom left, bottom right
    let stepX = targetX > startX ? 1 : -1;
    let stepY = targetY > startY ? 1 : -1;
    // make sure there are no pieces in the path of bishop
    for (let i = 1; i < diffX; i++) {
      if (chessboard[startX + i * stepX][startY + i * stepY] !== ePiece) {
        return false;
      }
    }
    //update chessboard array
    chessboard[startX][startY].posX = targetX
    chessboard[startX][startY].posY = targetY
    chessboard[targetX][targetY] = chessboard[startX][startY]
    chessboard[startX][startY] = ePiece
    return true;
  }
};
class Rook {
  constructor(posX, posY, hasMoved, color) {
    this.posX = posX;
    this.posY = posY;
    this.hasMoved = hasMoved;
    this.color = color;
  }
  // start: 2, 0 end: 2, 2
  movement(beingDragged, targetX, targetY) {
    let startX = beingDragged.parentNode.getAttribute('data-row') - 0;
    let startY = beingDragged.parentNode.getAttribute('data-col') - 0;
    let diffX = Math.abs(targetX - startX);
    let diffY = Math.abs(targetY - startY);
    console.log(diffX)
    console.log(diffY)
    if(diffX && !diffY) {

      let stepX = targetX > startX ? 1 : -1;
      console.log(stepX)
      console.log("stepX")
      for (let i = 1; i < diffX; i++) {
        if (chessboard[startX + i * stepX][startY] !== ePiece) {
          return false;
        }
      }
    }
    else if (!diffX && diffY){
      let stepY = targetY > startY ? 1 : -1;
      console.log(stepY)
      for (let i = 1; i < diffY; i++) {
        
        if (chessboard[startX][startY + i * stepY] !== ePiece) {
          return false;
        }
      }
    }
    else {
      console.log("we got here")
      return false
    }
    chessboard[startX][startY].posX = targetX
    chessboard[startX][startY].posY = targetY
    chessboard[targetX][targetY] = chessboard[startX][startY]
    chessboard[startX][startY] = ePiece
    return true
  }
};
class Knight {
  constructor(posX, posY, color) {
          this.posX = posX;
          this.posY = posY;
          this.color = color;
  }
  movement(beingDragged, targetX, targetY) {
    let startX = beingDragged.parentNode.getAttribute('data-row') - 0;
    let startY = beingDragged.parentNode.getAttribute('data-col') - 0;
    let diffX = Math.abs(targetX - startX);
    let diffY = Math.abs(targetY - startY);
    if((diffX === 2 && diffY === 1) || (diffX === 1 && diffY === 2)) {
      chessboard[startX][startY].posX = targetX
      chessboard[startX][startY].posY = targetY
      chessboard[targetX][targetY] = chessboard[startX][startY]
      chessboard[startX][startY] = ePiece
      return true
    }
    else {
      return false
    }
  }  
};
class King {
  constructor(posX, posY, hasMoved,
      color) {
          this.posX = posX;
          this.posY = posY;
          this.hasMoved = hasMoved;
          this.color = color;
  }
  movement(beingDragged, targetX, targetY) {
    let startX = beingDragged.parentNode.getAttribute('data-row') - 0;
    let startY = beingDragged.parentNode.getAttribute('data-col') - 0;
    let diffX = Math.abs(targetX - startX);
    let diffY = Math.abs(targetY - startY);
    
    if(diffX === 1 && diffY === 0) {
      chessboard[startX][startY].posX = targetX
      chessboard[startX][startY].posY = targetY
      chessboard[targetX][targetY] = chessboard[startX][startY]
      chessboard[startX][startY] = ePiece
      return true;
    }
    else if(diffX === 0 && diffY === 1) {
      chessboard[startX][startY].posX = targetX
      chessboard[startX][startY].posY = targetY
      chessboard[targetX][targetY] = chessboard[startX][startY]
      chessboard[startX][startY] = ePiece
      return true;
    }
    else if (diffX === 1 && diffY === 1) {
      chessboard[startX][startY].posX = targetX
      chessboard[startX][startY].posY = targetY
      chessboard[targetX][targetY] = chessboard[startX][startY]
      chessboard[startX][startY] = ePiece
      return true
    }
    else {
      return false
    }
  }  
};
class Queen {
  constructor(posX, posY, color) {
          this.posX = posX;
          this.posY = posY;
          this.color = color;
  }
  movement(beingDragged, targetX, targetY) {
    let startX = beingDragged.parentNode.getAttribute('data-row') - 0;
    let startY = beingDragged.parentNode.getAttribute('data-col') - 0;
    let diffX = Math.abs(targetX - startX);
    let diffY = Math.abs(targetY - startY);
    if(diffX && !diffY) {

      let stepX = targetX > startX ? 1 : -1;
      console.log(stepX)
      console.log("stepX")
      for (let i = 1; i < diffX; i++) {
        if (chessboard[startX + i * stepX][startY] !== ePiece) {
          return false;
        }
      }
    }
    else if (diffX === diffY) {
      let stepX = targetX > startX ? 1 : -1;
      let stepY = targetY > startY ? 1 : -1;
      // make sure there are no pieces in the path of bishop
      for (let i = 1; i < diffX; i++) {
        if (chessboard[startX + i * stepX][startY + i * stepY] !== ePiece) {
          return false;
        }
      }
    }
    else if (!diffX && diffY){
      let stepY = targetY > startY ? 1 : -1;
      console.log(stepY)
      for (let i = 1; i < diffY; i++) {
        
        if (chessboard[startX][startY + i * stepY] !== ePiece) {
          return false;
        }
      }
    }
    else {
      console.log("we got here")
      return false
    }
    chessboard[startX][startY].posX = targetX
    chessboard[startX][startY].posY = targetY
    chessboard[targetX][targetY] = chessboard[startX][startY]
    chessboard[startX][startY] = ePiece
    return true
  }  
};

//black pieces
let ePiece = new emptyPiece();
let bRook1 = new Rook(0, 0, false, 'Black');
let bRook2 = new Rook(0, 7, false, 'Black');
let bKnight1 = new Knight(0, 1, 'Black');
let bKnight2 = new Knight(0, 6, 'Black');
let bBishop1 = new Bishop(0, 2, 'Black');
let bBishop2 = new Bishop(0, 5, 'Black');
let bQueen = new Queen(0, 3, 'Black');
let bKing = new King(0, 4, false, 'Black');
let bPawn1 = new Pawn(1, 0, false, 'Black');
let bPawn2 = new Pawn(1, 1, false, 'Black');
let bPawn3 = new Pawn(1, 2, false, 'Black');
let bPawn4 = new Pawn(1, 3, false, 'Black');
let bPawn5 = new Pawn(1, 4, false, 'Black');
let bPawn6 = new Pawn(1, 5, false, 'Black');
let bPawn7 = new Pawn(1, 6, false, 'Black');
let bPawn8 = new Pawn(1, 7, false, 'Black');

//white pieces
let wPawn1 = new Pawn(6, 0, false, 'White');
let wPawn2 = new Pawn(6, 1, false,'White');
let wPawn3 = new Pawn(6, 2, false,'White');
let wPawn4 = new Pawn(6, 3, false, 'White');
let wPawn5 = new Pawn(6, 4, false, 'White');
let wPawn6 = new Pawn(6, 5, false, 'White');
let wPawn7 = new Pawn(6, 6, false, 'White');
let wPawn8 = new Pawn(6, 7, false, 'White');
let wRook1 = new Rook(7, 0, false, 'White');
let wRook2 = new Rook(7, 7, false, 'White');
let wKnight1 = new Knight(7, 1, 'White');
let wKnight2 = new Knight(7, 6, 'White');
let wBishop1 = new Bishop(7, 2, 'White');
let wBishop2 = new Bishop(7, 5, 'White');
let wQueen = new Queen(7, 3, 'White');
let wKing = new King(7, 4, false, 'White');

let chessboard = [
  [bRook1, bKnight1, bBishop1, bQueen, bKing, bBishop2, bKnight2, bRook2],
  [bPawn1, bPawn2, bPawn3, bPawn4, bPawn5, bPawn6, bPawn7, bPawn8],
  [ePiece, ePiece, ePiece, ePiece, ePiece, ePiece, ePiece, ePiece],
  [ePiece, ePiece, ePiece, ePiece, ePiece, ePiece, ePiece, ePiece],
  [ePiece, ePiece, ePiece, ePiece, ePiece, ePiece, ePiece, ePiece],
  [ePiece, ePiece, ePiece, ePiece, ePiece, ePiece, ePiece, ePiece],
  [wPawn1, wPawn2, wPawn3, wPawn4, wPawn5, wPawn6, wPawn7, wPawn8],
  [wRook1, wKnight1, wBishop1, wQueen, wKing, wBishop2, wKnight2, wRook2],
];

const pieces = document.querySelectorAll('.piece');

pieces.forEach(piece => {
    piece.addEventListener('dragstart', (event) => {
        // Set the dragged piece's data and style it during the drag
        event.dataTransfer.setData('text/plain', ''); // Essential for Firefox
        event.target.style.opacity = '1'; // Ensure full opacity while dragging
        // Other custom drag behaviors you might want to add
    });

    piece.addEventListener('dragend', (event) => {
        // Reset the style of the piece after the drag
        event.target.style.opacity = '1'; // Set back to 100% opacity
        // Other actions after the drag ends
    });
});


const squares = document.querySelectorAll('.draggable')

squares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('dragenter', dragEnter)
  square.addEventListener('dragleave', dragLeave)
  square.addEventListener('drop', dragDrop)
})

let beingDragged;
function dragStart(e) {
    if (e.target.classList.toString() === whosTurn) {
      beingDragged = e.target;
      console.log(beingDragged)
      e.stopPropagation();
      beingDragged.parentNode.style.opacity = '1';
    }
    else {
      e.preventDefault();
    } 
}
function dragOver(e) {
  e.preventDefault()
}
function dragEnter (e) {
  if (beingDragged.classList.toString() !== e.target.classList.toString()) {
    e.target.classList.add('highlight');
  }
}
function dragLeave (e) { 
  e.target.classList.remove('highlight')
}
function dragDrop(e) {
  const targetElement = e.currentTarget;
  
  const existingPiece = targetElement.querySelector('.black, .white');
  const targetX = targetElement.getAttribute('data-row') - 0;
  const targetY = targetElement.getAttribute('data-col') - 0;
  const dragColor = beingDragged.classList.toString();
  const targetColor = e.target.classList.toString();
  const startX = beingDragged.parentNode.getAttribute('data-row') - 0;
  const startY = beingDragged.parentNode.getAttribute('data-col') - 0;
  const moveMade = chessboard[startX][startY].movement(beingDragged, targetX, targetY);

  console.log(targetColor)
  console.log(dragColor)
  if(moveMade && dragColor !== targetColor) {
    if (existingPiece && dragColor !== targetColor) {
      existingPiece.remove();
      targetElement.append(beingDragged);
    }
    else if(!existingPiece) {
      targetElement.append(beingDragged);
    }
    audio.play();
    e.target.classList.remove('highlight');
    switchTurns();
  }
  else {
    e.target.classList.remove('highlight');
  } 
}
