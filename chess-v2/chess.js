//import "pieces.js";
let whiteCheck = false
let blackCheck = false

let whosTurn = "white"
let whiteTime = 181;
let blackTime = 180; 

let pieceMovement = []
const audio = new Audio('move_sound.wav');

let timerElement = document.getElementById('timer');


function updateTime() {
  if(whosTurn === "white") {
    timerElement.textContent = `White's Turn: ${formatTime(whiteTime)}`;
    timerElement.title=whiteTime;
    if (whiteTime === 0) {
      alert("Black Wins");
      location.reload();
    }
    
  }
  else {
    timerElement.textContent = `Black's Turn: ${formatTime(blackTime)}`;
    timerElement.title=blackTime;
    if (blackTime === 0) {
      alert("White Wins")
      location.reload();
    }
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
              || ((Math.abs(startY - targetY) === 1 && chessboard[targetX][targetY] !== ePiece && (Math.abs(startX - targetX) === 1)))) 
              || (startX + 2 === targetX && startY === targetY 
              && chessboard[startX + 1][startY] === ePiece
              && chessboard[startX + 2][startY] === ePiece))

              {
                console.log("hi buddy")
                // update chessboard array
                chessboard[startX][startY].hasMoved = true
            
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
                  console.log("hi buddy")
                if(targetX === 7) {
                  pawnEvolution(beingDragged, targetX, targetY)
                }
                return true
              }
              // black pawn that has moved takes a piece
              else if ((startX + 1 === targetX && Math.abs(startY - targetY) === 1) 
              && chessboard[targetX][targetY].color !== dragColor 
              && chessboard[targetX][targetY] !== ePiece) {
                
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
                || ((Math.abs(startY - targetY) === 1 && chessboard[targetX][targetY] !== ePiece && (Math.abs(startX - targetX) === 1)))) 
                || (startX - 2 === targetX && startY === targetY 
                && chessboard[startX - 1][startY] === ePiece
                && chessboard[startX - 2][startY] === ePiece)) {
                
                chessboard[startX][startY].hasMoved = true
            
                return true
              }
              else {
                return false
              }
            }
            else {
              //white piece that has moved moves forward
              if(startX - 1 === targetX && targetY === startY && chessboard[targetX][targetY] === ePiece) {
                
            
                if(targetX === 0) {
                  pawnEvolution(beingDragged, targetX, targetY)
                }
                return true
              }
              //white piece that has moved takes another piece
              else if (startX - 1 === targetX && Math.abs(startY - targetY) === 1 
              && chessboard[targetX][targetY].color !== dragColor
              && chessboard[targetX][targetY] !== ePiece) {
                
               
                
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
    
    if(diffX && !diffY) {

      let stepX = targetX > startX ? 1 : -1;
      
      for (let i = 1; i < diffX; i++) {
        if (chessboard[startX + i * stepX][startY] !== ePiece) {
          return false;
        }
      }
    }
    else if (!diffX && diffY){
      let stepY = targetY > startY ? 1 : -1;
      
      for (let i = 1; i < diffY; i++) {
        
        if (chessboard[startX][startY + i * stepY] !== ePiece) {
          return false;
        }
      }
    }
    else {
      
      return false
    }
  
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
    const dragColor = beingDragged.classList.toString();
    if(((diffX === 2 && diffY === 1) || (diffX === 1 && diffY === 2))
      && chessboard[targetX][targetY].color !== dragColor) {
      
     
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
    const colorMatch = beingDragged.classList.contains(chessboard[targetX][targetY].color);
    console.log(startX) 
    console.log(startY)
    if(diffX === 1 && diffY === 0 && !colorMatch) {
     
      return true;
    }
    else if(diffX === 0 && diffY === 1
      && !colorMatch) {
      
      console.log("its here1")
      return true;
    }
    else if (diffX === 1 && diffY === 1 && !colorMatch) {
     
      return true
    }
    
    else if (diffX === 0 && diffY === 2 
      && (chessboard[startX][startY + 3] instanceof Rook && !chessboard[startX][startY + 3].hasMoved)
      && chessboard[startX][startY + 1] === ePiece && chessboard[startX][startY + 2] === ePiece){
        const changedSquare = document.querySelector(`[data-row="${startX}"][data-col="${startY + 3}"]`)
        const squareToChange = document.querySelector(`[data-row="${startX}"][data-col="${startY + 1}"]`);

        if (whosTurn === 'black') {
          changedSquare.innerHTML = `<div class="${chessboard[startX][startY].color}" draggable="true"></div>`;
          squareToChange.innerHTML = `<div class="${chessboard[startX][startY].color}"  id="white-piece" draggable="true">♜</div>`;
        } else {
          changedSquare.innerHTML = `<div class="${chessboard[startX][startY].color}" alt="castle-piece" id="white-piece" draggable="true"></div>`;
          squareToChange.innerHTML = `<div class="${chessboard[startX][startY].color}" id="white-piece" alt="castle-piece" draggable="true">♜</div>`;
        }
        chessboard[startX][startY + 1] = chessboard[startX][startY + 3]
        chessboard[startX][startY + 3] = ePiece
        chessboard[startX][startY + 1].hasMoved = true
        chessboard[startX][startY + 1].posY = 5
        return true
      }
      else if (diffX === 0 && diffY === 2 
        && (chessboard[startX][startY - 4] instanceof Rook && !chessboard[startX][startY - 4].hasMoved)
        && chessboard[startX][startY - 1] === ePiece && chessboard[startX][startY - 2] === ePiece && chessboard[startX][startY - 3] === ePiece){
          const changedSquare = document.querySelector(`[data-row="${startX}"][data-col="${startY - 4}"]`)
          const squareToChange = document.querySelector(`[data-row="${startX}"][data-col="${startY - 1}"]`);
  
          if (whosTurn === 'black') {
            changedSquare.innerHTML = `<div class="${chessboard[startX][startY].color}" draggable="true"></div>`;
            squareToChange.innerHTML = `<div class="${chessboard[startX][startY].color}"  id="white-piece" draggable="true">♜</div>`;
          } else {
            changedSquare.innerHTML = `<div class="${chessboard[startX][startY].color}" alt="castle-piece" id="white-piece" draggable="true"></div>`;
            squareToChange.innerHTML = `<div class="${chessboard[startX][startY].color}" id="white-piece" alt="castle-piece" draggable="true">♜</div>`;
          }
          chessboard[startX][startY - 1] = chessboard[startX][startY - 4]
          chessboard[startX][startY - 4] = ePiece
          chessboard[startX][startY - 1].hasMoved = true
          chessboard[startX][startY - 1].posY = 3
          return true
        }
        
   
    else {
      console.log(chessboard)
      console.log(chessboard[startX][startY + 3] instanceof Rook)
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
    return true
  }  
};

function checkmate(beingDragged, startX, startY) {
  let isBlackKingPresent = chessboard.some(row => row.includes(bKing));
  if (!isBlackKingPresent) {
    alert("White Wins!")
    location.reload();

  }
  let isWhiteKingPresent = chessboard.some(row => row.includes(wKing));
  if (!isWhiteKingPresent) {
    alert("Black Wins")
    location.reload();

  }
  /*
  let whitePossibleMoves = [];
  let blackPossibleMoves = [];
  
        const blackKingPiece = document.querySelector('.king.black');
        if(chessboard[startX][startY].movement(beingDragged, bKing.posX, bKing.posY) 
          && !chessboard[bKing.posX][bKing.posY].movement(blackKingPiece, startX, startY)) {
           
            blackCheck = true
         
          console.log("check");

          for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
              if (chessboard[bKing.posX][bKing.posY].movement(blackKingPiece, i, j)) {
         
              const whitePieces = document.querySelectorAll('.white');
              const pieces = Array.from(whitePieces);

                for (let k = 0; k < pieces.length; k++) {
                  const piece = pieces[k];
                  let posX = piece.parentNode.getAttribute("data-row") - 0;
                  let posY = piece.parentNode.getAttribute("data-col") - 0;
                  console.log(piece)
                  console.log(chessboard[posX][posY].movement(piece, i, j))
                  if (chessboard[posX][posY].movement(piece, i, j)) {
                    break;
                  }
                  if (k === pieces.length - 1) {
                    let formattedString = `[${i}, ${j}]`;
                    whitePossibleMoves.push(formattedString)
                  }
                }
              }
            }
          }
          if(blackPossibleMoves.length === 0 && blackCheck === true) {
            alert("White Won")
            location.reload();
          }
          const blackPieces = document.querySelectorAll('.black:not(.king)');
          const pieces = Array.from(blackPieces);
          let diffX = Math.abs(startX - bKing.posX); 
          let diffY = Math.abs(bKing.posY - startY);
          for (let g = 0; g < pieces.length; g++){
            const piece = pieces[g];
            let posX = piece.parentNode.getAttribute("data-row") - 0;
            let posY = piece.parentNode.getAttribute("data-col") - 0;
              if(diffX && !diffY) {
              console.log("hi baby")
                
                let stepX = bKing.posX > startX ? 1 : -1;
                console.log(stepX)
                for (let i = 0; i < diffX; i++) {
                  let xValue = startX + i * stepX;
                  console.log(xValue)
                  if (chessboard[posX][posY].movement(piece, xValue, startY)) {
                    console.log(piece)

                    let formattedString = `[${xValue}, ${startY}]`;
                    blackPossibleMoves.push(formattedString)
                  }
                }
              }
              else if (!diffX && diffY) {
                let stepY = bKing.posY > posY ? 1 : -1;
    
                for (let i = 0; i < diffY; i++) {
                  let yValue = startY + i * stepY
                  if (chessboard[posX][posY].movement(piece, startX, yValue)) {
                    console.log(piece)

                    let formattedString = `[${startX}, ${yValue}]`;
                    blackPossibleMoves.push(formattedString)
                  }
                }

              }
              else if (diffX === diffY) {
         
              let stepX = bKing.posX > startX ? 1 : -1;
              let stepY = bKing.posY > startY ? 1 : -1;
            
              for (let i = 0; i < diffX; i++) {
                let xValue = startX + i * stepX
                let yValue = startY + i * stepY
                if (chessboard[posX][posY].movement(piece, xValue, yValue)) {
                  console.log(piece)
                  console.log("hello")
                  let formattedString = `[${xValue}, ${yValue}]`;
                  blackPossibleMoves.push(formattedString)
                }
              }
            
              }
          }
    }
    console.log(blackPossibleMoves)
  
  
    const whiteKingPiece = document.querySelector('.king.white')

    if(chessboard[startX][startY].movement(beingDragged, wKing.posX, wKing.posY) 
    && !chessboard[wKing.posX][wKing.posY].movement(whiteKingPiece, startX, startY)) {
      
    
      whiteCheck = true
      console.log("nonwhite")
      whitePossibleMoves = []
        for(let i = 0; i < 8; i++) {
          for(let j = 0; j < 8; j++) {
            if (chessboard[wKing.posX][wKing.posY].movement(whiteKingPiece, i, j)) {
         
              const blackPieces = document.querySelectorAll('.black');
              const pieces = Array.from(blackPieces);

                for (let k = 0; k < pieces.length; k++) {
                  const piece = pieces[k];
                  let posX = piece.parentNode.getAttribute("data-row") - 0;
                  let posY = piece.parentNode.getAttribute("data-col") - 0;
                  console.log(piece)
                  console.log(chessboard[posX][posY].movement(piece, i, j))
                  if (chessboard[posX][posY].movement(piece, i, j)) {
                    break;
                  }
                  if (k === pieces.length - 1) {
                    let formattedString = `[${i}, ${j}]`;
                    blackPossibleMoves.push(formattedString)
                  }
      }
    }
    if(whitePossibleMoves.length === 0 && whiteCheck === true) {

    
      alert("Black Won")
      location.reload();
    
  }
          }
        }
      
    }
    else {
      return false
    }
  

  
  

 */
}

//black pieces
let ePiece = new emptyPiece();
let bRook1 = new Rook(0, 0, false, 'black');
let bRook2 = new Rook(0, 7, false, 'black');
let bKnight1 = new Knight(0, 1, 'black');
let bKnight2 = new Knight(0, 6, 'black');
let bBishop1 = new Bishop(0, 2, 'black');
let bBishop2 = new Bishop(0, 5, 'black');
let bQueen = new Queen(0, 3, 'black');
let bKing = new King(0, 4, false, 'black');
let bPawn1 = new Pawn(1, 0, false, 'black');
let bPawn2 = new Pawn(1, 1, false, 'black');
let bPawn3 = new Pawn(1, 2, false, 'black');
let bPawn4 = new Pawn(1, 3, false, 'black');
let bPawn5 = new Pawn(1, 4, false, 'black');
let bPawn6 = new Pawn(1, 5, false, 'black');
let bPawn7 = new Pawn(1, 6, false, 'black');
let bPawn8 = new Pawn(1, 7, false, 'black');

//white pieces
let wPawn1 = new Pawn(6, 0, false, 'white');
let wPawn2 = new Pawn(6, 1, false,'white');
let wPawn3 = new Pawn(6, 2, false,'white');
let wPawn4 = new Pawn(6, 3, false, 'white');
let wPawn5 = new Pawn(6, 4, false, 'white');
let wPawn6 = new Pawn(6, 5, false, 'white');
let wPawn7 = new Pawn(6, 6, false, 'white');
let wPawn8 = new Pawn(6, 7, false, 'white');
let wRook1 = new Rook(7, 0, false, 'white');
let wRook2 = new Rook(7, 7, false, 'white');
let wKnight1 = new Knight(7, 1, 'white');
let wKnight2 = new Knight(7, 6, 'white');
let wBishop1 = new Bishop(7, 2, 'white');
let wBishop2 = new Bishop(7, 5, 'white');
let wQueen = new Queen(7, 3, 'white');
let wKing = new King(7, 4, false, 'white');

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

let squares = document.querySelectorAll('.draggable')

squares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('dragenter', dragEnter)
  square.addEventListener('dragleave', dragLeave)
  square.addEventListener('drop', dragDrop)
})

let beingDragged;
function dragStart(e) {
    if (e.target.classList.contains(whosTurn)) {
      
      beingDragged = e.target;

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
  if ((!e.target.classList.contains(whosTurn))) {
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

  if(moveMade && dragColor !== targetColor) {
    
    if (existingPiece) {
      existingPiece.remove();
      targetElement.append(beingDragged);
      chessboard[startX][startY].posX = targetX
      chessboard[startX][startY].posY = targetY
      chessboard[targetX][targetY] = chessboard[startX][startY]
      chessboard[startX][startY] = ePiece
    }
    else if(!existingPiece) {
      targetElement.append(beingDragged);
      chessboard[startX][startY].posX = targetX
      chessboard[startX][startY].posY = targetY
      chessboard[targetX][targetY] = chessboard[startX][startY]
      chessboard[startX][startY] = ePiece
    }
    audio.play();
    e.target.classList.remove('highlight');
    
    switchTurns();
    
    checkmate(beingDragged, targetX, targetY)
  }
  else {
    e.target.classList.remove('highlight');
  } 
  console.log(chessboard)
}
 
 
