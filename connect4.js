let ROWS = 6
let COLS = 7
let currentPlayer = 1
let gameOver = false
let winAnimating = false;

let boardState = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]


function setStatus(msg){
  statusTxt = document.getElementById("status")
  statusTxt.innerText = msg;
}

function setCellClass(row, col, newclass){
  let cell = document.getElementById(row+"_"+col)
  cell.className = newclass;
}

function showCurrentPlayer(){
  playerWidget = document.getElementById("current_player")
  playerWidget.className = "cell player"+currentPlayer
  playerWidget.firstElementChild.innerText = "Player "+currentPlayer
}

function resetGame(){
  for(let i=0;i<ROWS;i++){
    for(let j=0;j<COLS;j++){
      boardState[i][j] = 0;
      currentPlayer = 1;
      setCellClass(i, j, "cell")
      setStatus("");
    }
  }

  gameOver = false;
  winAnimating = false;
  currentPlayer = Math.ceil(Math.random()*2)
  showCurrentPlayer()
}

function blinkWin(player, row, col, dx, dy){
  // turn winning cells off
  setTimeout(()=>{
    let r=row, c=col;
    for(let i=0;i<4;i++){
      setCellClass(r, c, "cell")
      r+=dx; c+=dy;
    }
  }, 400)

  // turn winning cells on
  r=row, c=col;
  setTimeout(()=>{
    let r=row, c=col;
    for(let i=0;i<4;i++){
      setCellClass(r, c, "cell player"+player)
      r+=dx; c+=dy;
    }
  }, 800)
}

function blinkEntireBoard(){
  // clear onscreen board
  setTimeout(()=>{
    for(let i=0; i<ROWS; i++){
      for(let j=0; j<COLS; j++){
        setCellClass(i,j, "cell")
      }
    } 
  }, 400);


  // make screen board same as boardState again
  setTimeout(()=>{
    for(let i=0; i<ROWS; i++){
      for(let j=0; j<COLS; j++){

        if(boardState[i][j]>0) setCellClass(i, j, "cell player"+boardState[i][j] )
      }
    } 
  }, 800);
}


function checkEndingString(player, row, col){
    //check bounds
    if( (col<0) || (row<0) ) return true;
    if( (col>=COLS) || (row>=ROWS) ) return true;
     
    //check same color as player color
    if( boardState[row][col] != player ) return true;

    return false;
}

function checkDirection(player, row, col, dx, dy){

  // first walk in opposite direction to beginning of a string
  let prevRow, prevCol;
  while(true){
    prevRow = row;
    prevCol = col;

    row -= dx;
    col -= dy;

    // reach different color, or out of bounds, break
    // so we can count the total length of same color cells
    if( checkEndingString(player, row, col) ) break;
  }

  // get last good pos at beginning of string
  row = prevRow;
  col = prevCol;

  // now see if we have 4 in a row, exit if we hit wall or go out of bounds
  for(let count=1; count<4; count++){
    row += dx;
    col += dy;
    if( checkEndingString(player, row, col) ) return false
  }

  // we've found 4 successive cells with player color in a row
  // blink the winning string
  winAnimating = true;
  setTimeout( ()=>{blinkWin(player, prevRow, prevCol, dx, dy)}, 10 )
  setTimeout( ()=>{blinkWin(player, prevRow, prevCol, dx, dy)}, 1000 )
  setTimeout( ()=>{blinkWin(player, prevRow, prevCol, dx, dy)}, 2000 )
  setTimeout( ()=>{winAnimating=false}, 3000 ); // after 4 seconds animation is done

  return true;
}


function checkPlayerWins(player, row, col){
  if( checkDirection(player, row, col,  0, 1) ) return true;  // check vertical wins
  if( checkDirection(player, row, col,  1, 0) ) return true;  // check horizonal wins
  if( checkDirection(player, row, col,  1, 1) ) return true;  // check diagonal 1
  if( checkDirection(player, row, col, -1, 1) ) return true;  // check diagonal 2

  return false;
}


function checkFullBoard(){
  for(let i=0;i<ROWS;i++){
    for(let j=0;j<COLS;j++){
      if( boardState[i][j]==0 ) return false;
    }
  }

  return true;
}


function clickColumn(col){
  if(winAnimating){
    console.log("ignoring clicks!")
    return; //ignore clicks until animation is done
  }

  if(gameOver){ 
    resetGame();
    return; //stop clicks with game over state
  }

  let foundEmpty=false;
  for(let row=5; row>=0; row--){
    if( boardState[row][col] == 0 ){
      boardState[row][col] = currentPlayer;
      setCellClass(row, col, "cell player"+currentPlayer)
      foundEmpty = true;
      gameOver = checkPlayerWins(currentPlayer, row, col)
      break;
    }
  }

  if(!foundEmpty){
    console.log("user clicked full row, let him try again!")
    return
  }

  if(gameOver){
    setStatus("Player " + currentPlayer + " wins!");
    return;
  }

  if(checkFullBoard()){
    setStatus("It's a tie! You are both winners ;)")
    gameOver = true;
    winAnimating = true;
    setTimeout(()=>{blinkEntireBoard()}, 500);
    setTimeout(()=>{blinkEntireBoard()}, 1500);
    setTimeout(()=>{blinkEntireBoard()}, 2500);
    setTimeout(()=>{winAnimating=false}, 3000);
  }

  //switch player
  if( currentPlayer == 1 )
    currentPlayer = 2
  else
    currentPlayer = 1

  showCurrentPlayer()
}

function addCol(board, col_index){
  let col = document.createElement("div")
  col.classList.add("column")
  board.appendChild(col)
  col.onclick = ()=>{ clickColumn(col_index) }
  return col
}

function addCell(coldiv, row, col){
  let cell = document.createElement("div")
  cell.className = "cell"
  cell.id = row + "_" + col
  coldiv.appendChild(cell)
}

function createBoard(){
  let game = document.getElementById("game")
  let board = document.createElement("div")
  board.classList.add("board")
  game.appendChild(board)

  for(let i=0;i<COLS;i++){
    let coldiv = addCol(board, i)
    for(let j=0;j<ROWS;j++){
      addCell(coldiv, j, i)
    }
  }
  resetGame();
}

document.addEventListener('DOMContentLoaded', function(event) {
  createBoard()
})

