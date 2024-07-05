import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/PlayerInfo"
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winningCombinations";
import { GameOver } from "./components/GameOver";

const PLAYERS={
  "X":"Players 1",
  "O":"Players 2"
};
const  INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
// Arrays and obejct are the refrence value in the JS, so it's good to make a copy of the orignal Array and use it for App.
function deriveActivePlayer(turn) {
  let currentPlayer = "X";
  if (turn.length > 0 && turn[0].player === 'X') {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard,players){
  let winner;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol ){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArr => [...innerArr])];  /// Always make a copy of the orignal Array It's a good way to Practise/
  for(const turn of gameTurns ){
    const {square,player} = turn; 
    gameBoard[square.row][square.col] = player;
  }
  return gameBoard;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);  const [players,setPlayers] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);

  let hasDraw = gameTurns.length===9 && !winner;

  function handleActivePlayerTurns(rowIndex, colIndex) {
    setGameTurns((prevGameTurn) => {
      const currentPlayer = deriveActivePlayer(prevGameTurn);
      const updateTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurn];
      return updateTurn;
    });
  }
  
  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }

  return (
    <main>
      <h1>Tic-Tac-Toe Game</h1>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.O} onChangeName={handlePlayerNameChange} symbol={"X"} isActivePlayer={activePlayer === "X"} />
          <Player name={PLAYERS.X} onChangeName={handlePlayerNameChange} symbol={"O"} isActivePlayer={activePlayer === "O"} />
        </ol>
        {(winner||hasDraw ) &&  <GameOver winner={winner} rematch={handleRematch}/>}
        <GameBoard handleActivePlayerTurns={handleActivePlayerTurns} board={gameBoard} />
      </div>
      <Logs logs={gameTurns} />
    </main>
  )
}

export default App;