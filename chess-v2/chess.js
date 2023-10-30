//import "pieces.js";
let whosTurn = "white"
const turnDisplayElement = document.getElementById("turnDisplay");
turnDisplayElement.textContent = "Turn: " + whosTurn.charAt(0).toUpperCase() + whosTurn.slice(1);;

function switchTurns() {
  if (whosTurn === "white") {
    whosTurn = "black";
    turnDisplayElement.textContent = "Turn: " + whosTurn.charAt(0).toUpperCase() + whosTurn.slice(1);;
  } else {
    whosTurn = "white";
    turnDisplayElement.textContent = "Turn: " + whosTurn.charAt(0).toUpperCase() + whosTurn.slice(1);;
  }
}
class emptyPiece {
  constructor() {

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
      pawnMovement(startX, startY, targetX, targetY, dragColor) {
          if (dragColor === 'black') {
            if (!chessboard[startX][startY].hasMoved) {
              if ((startX + 1 === targetX && (startY === targetY 
              || (Math.abs(startY - targetY) === 1 && chessboard[targetX][targetY] != ePiece))) 
              || (startX + 2 === targetX && startY === targetY))  {
                chessboard[startX][startY].hasMoved = true
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece
                return true
              }
              else{
                return false
              }
            }
            else {
              if(startX + 1 === targetX) {
                chessboard[startX][startY].hasMoved = true
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece
                if(targetX === 7) {
                  console.log("pwn pop up menu")
                }
                return true
              }
              else if ((startX + 1 === targetX && Math.abs(startY - targetY) === 1)) {
                if(targetX === 7) {
                  console.log("pwn pop up menu")
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
              if((startX - 1 === targetX && (startY === targetY 
                || (Math.abs(startY - targetY) === 1 && chessboard[targetX][targetY] != ePiece))) 
                || (startX - 2 === targetX && startY === targetY)) {
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
              if(startX - 1 === targetX) {
                chessboard[startX][startY].hasMoved = true
                chessboard[startX][startY].posX = targetX
                chessboard[startX][startY].posY = targetY
                chessboard[targetX][targetY] = chessboard[startX][startY]
                chessboard[startX][startY] = ePiece
                if(targetX === 0) {
                  console.log("pwn pop up menu")
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
  constructor(posX, posY, hasMoved, color) {
          this.posX = posX;
          this.posY = posY;
          this.color = color;
      }
};
class Rook {
  constructor(posX, posY, hasMoved, color) {
    this.posX = posX;
    this.posY = posY;
    this.hasMoved = hasMoved;
    this.color = color;
  }
  rookMovement() {
    console.log()
  }
}
class Knight {
  constructor(posX, posY, color) {
          this.posX = posX;
          this.posY = posY;
      
          this.color = color;
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
};
class Queen {
  constructor(posX, posY, color) {
          this.posX = posX;
          this.posY = posY;
          this.color = color;
      }
};

//black pieces
let ePiece = new emptyPiece();
let bRook1 = new Rook(0, 0, false, 'Black');
let bRook2 = new Rook(0, 1, false, 'Black');
let bKnight1 = new Knight(0, 2, 'Black');
let bKnight2 = new Knight(0, 3, 'Black');
let bBishop1 = new Bishop(0, 4, 'Black');
let bBishop2 = new Bishop(0, 5, 'Black');
let bQueen = new Queen(0, 6, 'Black');
let bKing = new King(0, 7, false, 'Black');
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
let wRook2 = new Rook(7, 1, false, 'White');
let wKnight1 = new Knight(7, 2, 'White');
let wKnight2 = new Knight(7, 3, 'White');
let wBishop1 = new Bishop(7, 4, 'White');
let wBishop2 = new Bishop(7, 5, 'White');
let wQueen = new Queen(7, 6,  'White');
let wKing = new King(7, 7, false, 'White');

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
console.log(chessboard[0][1])

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
  const id = beingDragged.getAttribute('id');
  const startX = beingDragged.parentNode.getAttribute('data-row') - 0;
  const startY = beingDragged.parentNode.getAttribute('data-col') - 0;
  const targetX = targetElement.getAttribute('data-row') - 0;
  const targetY = targetElement.getAttribute('data-col') - 0;
  const dragColor = beingDragged.classList.toString();
  console.log(chessboard)
  if(id === "pawn") {
    if(bPawn1.pawnMovement(startX, startY, targetX, targetY, dragColor)) {
      if (existingPiece && beingDragged.classList.toString() !== e.target.classList.toString()) {
        existingPiece.remove();
        targetElement.appendChild(beingDragged);
      }
      else if(!existingPiece) {
        targetElement.append(beingDragged);
      }
      targetElement.classList.remove('highlight');
      switchTurns();
  }
  else if(existingPiece) {
    existingPiece.classList.remove('highlight');
    console.log("deez")
  } 
  else {
    targetElement.classList.remove('highlight');
  }
  }
  else {
    if (existingPiece && beingDragged.classList.toString() !== e.target.classList.toString()) {
      chessboard[targetX][targetY] = chessboard[startX][startY];
      chessboard[startX][startY] = ePiece;
      existingPiece.remove();
      targetElement.appendChild(beingDragged);
    }
    else if(!existingPiece) {
      targetElement.appendChild(beingDragged);
    }
    targetElement.classList.remove('highlight');
    switchTurns();
  }
  targetElement.classList.remove('highlight');
  console.log(chessboard[targetX][targetY])
}