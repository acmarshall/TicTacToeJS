let whosTurn = 1; 
let gameOver = false; 
const messageDiv = document.getElementById('message'); 

let player1Squares = []; 
let player2Squares = []; 
let computerSquares = []; 

let player1Wins = 0; 
let player2Wins = 0; 
let computerWins = 0; 
 
const winningCombos = [
	['A1','B1','C1'], //ROW 1
	['A2','B2','C2'], //ROW 2
	['A3','B3','C3'], //ROW 3
	['A1','A2','A3'], //COLUMN 1
	['B1','B2','B3'], //COLUMN 2
	['C1','C2','C3'], //COLUMN 3
	['A1','B2','C3'], //DIAG 1
	['A3','B2','C1'] //DIAG 2
];

const squares = document.getElementsByClassName ('square');

document.getElementById ('1P').addEventListener('click', function(event){ 
	messageDiv.innerHTML = 'One is the loneliest number'
	$(".player").hide(); 
	onePlayer();    
})

document.getElementById ('2P').addEventListener('click', function(event){
	messageDiv.innerHTML = 'You gotta friend in me'
	$(".player").hide();
	twoPlayer();    
})

function onePlayer(){
	for (let i = 0; i < squares.length; i++){
	squares[i].addEventListener('click', function(event){
		markSquare1(squares[i]); 
		})
	}
}

function twoPlayer(){
	for (let i = 0; i < squares.length; i++){
	squares[i].addEventListener('click', function(event){
		markSquare(squares[i]); 
		})
	}
}

function markSquare(clickedSquare){
	
	if(!gameOver) {
		if(clickedSquare.innerHTML !== '-') {
			messageDiv.innerHTML = 'That square is taken!!!'; 
		 } else if(whosTurn === 1){
		 	messageDiv.innerHTML = '';
			clickedSquare.innerHTML = 'X'; 
			whosTurn = 2; 
			player1Squares.push(clickedSquare.id); 
			checkWin(1,player1Squares); 
		}else {
			messageDiv.innerHTML = '';
			clickedSquare.innerHTML = 'O'; 
			whosTurn = 1; 
			player2Squares.push(clickedSquare.id); 
			checkWin(2,player2Squares); 
		}
	}
} 

function checkWin(whoJustMarked,playerSquares){

	for (let i = 0; i <winningCombos.length; i++){
		let squareCount = 0; 
		for(let j=0; j<winningCombos[i].length; j++){
			const currentWinningSquare = winningCombos[i][j];
			//built in method for arrays 
			if(playerSquares.indexOf(currentWinningSquare) > -1){
				squareCount++; 
			}
		}				

			if(squareCount === 3){
				if (whoJustMarked === 1){
				player1Wins++;
				messageDiv.innerHTML = `Player ${whoJustMarked} has won the game! You have ${player1Wins} wins`;
				 
				
				}else {
				player2Wins++; 
				messageDiv.innerHTML = `Player ${whoJustMarked} has won the game! You have ${player2Wins} wins`;
				
			} 
				gameOver = true; 
				for(let w = 0; w <winningCombos[i].length; w++){
					const thisSquare = document.getElementById(winningCombos[i][w]); 
					thisSquare.className += ' winning-square'; 
			}
			
		}
	}
}

function markSquare1(clickedSquare){

	if(!gameOver) {

		if(clickedSquare.innerHTML !== '-') {

			messageDiv.innerHTML = 'That square is taken!!!'; 
			whosTurn = 1; 

		 } else if(whosTurn === 1){
		 	messageDiv.innerHTML = '';
			clickedSquare.innerHTML = 'X'; 
			player1Squares.push(clickedSquare.id); 
			if (!checkWin1(1,player1Squares)){
			randomClick();
			}
		}	 
	}
}

function checkWin1(whoJustMarked,playerSquares){
	let check = false; 

	for (let i = 0; i <winningCombos.length; i++){
		let squareCount = 0; 
		for(let j=0; j<winningCombos[i].length; j++){
			const currentWinningSquare = winningCombos[i][j];
			//built in method for arrays 
			if(playerSquares.indexOf(currentWinningSquare) > -1){
				squareCount++; 
			}
		}				

			if(squareCount === 3){
				if (whoJustMarked === 1){
				player1Wins++;
				messageDiv.innerHTML = `Player ${whoJustMarked} has won the game! You have ${player1Wins} wins`;
				check = true; 
				 
				
				}else {
				computerWins++; 
				messageDiv.innerHTML = `You suck! Computer has  ${computerWins} wins`;
				
			} 
				gameOver = true; 
				for(let w = 0; w <winningCombos[i].length; w++){
					const thisSquare = document.getElementById(winningCombos[i][w]); 
					thisSquare.className += ' winning-square'; 
			}
			
		}
	}
	return check;
}
 
 
function randomClick(random){
	random = squares[Math.floor(Math.random()*squares.length)];

	if(random.innerHTML === '-') {
		random.innerHTML = 'O'; 
		computerSquares.push(random.id);  
		checkWin1(2,computerSquares); 

	} else {

		randomClick(random)

	}
	whosTurn = 1; 
}

function resetTheButton(){

	for(let i =0; i<squares.length; i++){
		squares[i].innerHTML = '-'; 
		squares[i].className = 'square'; 
	}
	messageDiv.innerHTML = 'You have cleared the game board'
	whosTurn = 1; 

gameOver = false; 
player1Squares = []; 
player2Squares = []; 
computerSquares = []; 
}

function resetTheGameMode(){
	location.reload(); 
}
