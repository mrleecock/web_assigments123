//import "./styles.css";

const rows = 5;
const cols = 5;
const win_condition = 5;
var player_1_turn = 1;
var time_left = 10.0;

drawBoard();

setInterval(gameLoop, 10);

function gameLoop()
{
	
		if (time_left <= 0.0) 
		{
			player_1_turn = !player_1_turn;
			time_left = 10.0;
		}
		else 
		 {
			time_left -= 0.01;
	  	 }
		let p_bar = document.getElementById("progress-bar");
		p_bar.style.width = time_left/0.1 + "%";
		
}


function drawBoard()
{
	// get container
	let board_element = document.getElementById("board");
	
  // create child divs
  let i;
	for (i = 0; i < rows; i++)
	 {
	 	let row_element = document.createElement("DIV");
	 	row_element.classList.add("row");
		
	 	board_element.appendChild(row_element);
     let j;
			for (j = 0; j < cols; j++)
			 {
				let cell_element = document.createElement("DIV");
				cell_element.classList.add("col");
				cell_element.classList.add("s1");
				
				cell_element.addEventListener('click', cellClickAction, {once : true});
				row_element.appendChild(cell_element);
			 }
	 }
}

function getCellIndex(cur_cell_element)
{
  let board_element = document.getElementById("board");
  let i;
	for (i = 0; i < rows; i++)
	 {
     let row_element = board_element.childNodes[i];
     let j;
		for (j = 0; j < cols; j++)
		 {
			if (row_element.childNodes[j] == cur_cell_element)
			 {
				return [i, j];			 
			 }		 
		 }	 
	 }
}

function checkLine(row_inc, col_inc, cur_row, cur_col)
{
	let board_element = document.getElementById("board");
	let cur_symbol = board_element.childNodes[cur_row].childNodes[cur_col].innerHTML;
	let counter = 0;
	
	do
	 {
	 	if (board_element.childNodes[cur_row].childNodes[cur_col].innerHTML != cur_symbol)
	 	 {
			break;	 	 
	 	 }
	 	cur_row -= row_inc;
		cur_col -= col_inc;
	 }
	 while (cur_row >= 0
	 		&& cur_row < rows
	 		&& cur_col >= 0
	 		&& cur_col < cols);
	 		
	 cur_row += row_inc;
	 cur_col += col_inc;
	 
	 while (cur_row >= 0
	 		&& cur_row < rows
	 		&& cur_col >= 0
	 		&& cur_col < cols)
	  {
	 	if (board_element.childNodes[cur_row].childNodes[cur_col].innerHTML != cur_symbol)
   	 {
			break;
   	 }	 	
	 	
		counter++;
		cur_row += row_inc;
		cur_col += col_inc;  
	  }
	  
	  if (counter >= win_condition)
	   {
			return 1;	   
	   }
	   
	   return 0;
}

function checkWin(cur_cell_element)
{
	let index = getCellIndex(cur_cell_element);

	
	return (checkLine(1,0,index[0], index[1]) || checkLine(0,1, index[0], index[1]) || checkLine(1,1, index[0], index[1]) || checkLine(1,-1, index[0], index[1]));

}

function drawSymbol(cell_element)
{
	if (player_1_turn)
	 {
		cell_element.innerHTML = "x";
		cell_element.classList.add("x");
	 }
	else 
	 {
		cell_element.innerHTML = "o";	 
		cell_element.classList.add("o");
	 }
}

function cellClickAction (e)
{
	// get element
	let cur_cell_element = e.target;
	
	// draw symbol
	drawSymbol(cur_cell_element);
	
	
	if (checkWin(cur_cell_element))
	 {
	 	let alert_text = player_1_turn ? "Player 1 won!" : "Player 2 won";
		alert(alert_text);	 
	 }
	
		
	// change turn
	player_1_turn = !player_1_turn;
	time_left = 10.0;
}

