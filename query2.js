var player1 = prompt("Player 1: You are BLUE!, Enter your NAme:");
var color1 = 'rgb(86, 151, 255)';

var player2 = prompt("Player 2: You are RED!, Enter your NAme:");
var colorp2 = 'rgb(237, 0, 0)';

var gameOn = true;
var table = $('table tr');

// Find table CEll and change its color
function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

// Find table CEll and returns its color
function returnColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Check the color of the bottommost cell of column
function checkBottom(colIndex){
  var colr = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--)
  {
      colr = returnColor(row,colIndex);
      if(colr === 'rgb(128, 128, 128)')
      {
        return row;
      }
    }
}

function winSituation(one,two,three,four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horiontalWin(){
  for(row = 0; row < 6; row++){
    for(col = 0; col < 4; col++){
      if(winSituation(returnColor(row,col),returnColor(rwo,col+1),returnColor(row,col+2),returnColor(row,col+3))){
        return true;
      }
      else{
        continue;
      }
    }
  }
}


function verticalWin(){
  for(col = 0; col < 7; col++){
    for(row = 0; row < 3; row++){
      if(winSituation(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
        return true;
      }
      else{
        continue;
      }
    }
  }
}


function diagonalWin(){
  for (col = 0; col < 5; col++){
    for (row = 0; row < 7; row++){
      if (winSituation(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
        return true;
      }
      else if (winSituation(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
        return true;
      }else{
        continue;
      }
    }
  }
}

// Game End
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = color1;

$('h1').text(player1+" Its is Your turn, select column to drop Chip!!");

$('.board button').on('click',function(){

  var col = $(this).closest("td").index();

  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail,col,currentColor);

  if(horiontalWin() || verticalWin() || diagonalWin()){
    gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1 ;

  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+" it is Your Turn!");
    currentColor = color1;
  }else{
    currentName = player2
    $('h3').text(currentName+" it is your turn!");
    currentColor = colorp2;
  }
})
