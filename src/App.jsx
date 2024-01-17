import { useEffect, useState } from 'react'
import { Square } from './components/Square'
import './App.css'

function Board({ squares, xIsNext, onPlay, jumpTo, hideContent, setHideContent }){
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  let status_win;
  let status_next;

  function restartGame(){
    setHideContent(true);
    localStorage.removeItem("historyGame");
    localStorage.removeItem("currentMove");
    jumpTo(0);
  }

  const winner = calculateWinner(squares);
  const arrNull = squares.includes(null);

  if(!winner && !arrNull){
    setHideContent(false);
  }
  
  if (winner) {
    try{
      status_win = "Winner: " + winner;
      setHideContent(false)
    }catch(error){
      console.log(error);
    }
    
  } else {
    status_next = "Next Player: " + (xIsNext ? "X" : "O");
  }


  return(
    <>
    <div className={`status-win ${hideContent ? "d-none" : ""}`}>
      <h3>{status_win}</h3>
      <div className='gradient'>
        <button onClick={(restartGame)} className={`button-restart ${hideContent ? "d-none" : ""}`} id='restart-button'>Restart</button>
      </div>
    </div>
    <div className={`container ${hideContent ? "" : "d-none"}`}>
      <div className='status-next'>{status_next}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => (handleClick(0))} />
        <Square value={squares[1]} onSquareClick={() => (handleClick(1))} />
        <Square value={squares[2]} onSquareClick={() => (handleClick(2))} />
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => (handleClick(3))} />
        <Square value={squares[4]} onSquareClick={() => (handleClick(4))} />
        <Square value={squares[5]} onSquareClick={() => (handleClick(5))} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => (handleClick(6))} />
        <Square value={squares[7]} onSquareClick={() => (handleClick(7))} />
        <Square value={squares[8]} onSquareClick={() => (handleClick(8))} />
      </div>
      <div className='gradient'>
        <button onClick={restartGame} className={`button-restart ${hideContent ? "d-none" : ""}`} id='restart-game'>Restart</button>
      </div>
    </div>
    
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

export default function game(){
  const [loadingGame, setLoadingGame] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [hideContent, setHideContent] = useState(true);
  const xIsNext = currentMove % 2 === 0;

  useEffect(() => {
    if(localStorage.getItem("currentMove") && localStorage.getItem("historyGame")){
      setCurrentMove(JSON.parse(localStorage.getItem("currentMove")));
      setHistory(JSON.parse(localStorage.getItem("historyGame")));
    }
    setLoadingGame(true);
  }, []);

  if(!loadingGame) return;

  localStorage.setItem("historyGame", JSON.stringify(history));
  localStorage.setItem("currentMove", JSON.stringify(currentMove));

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length -1)
  }

  const jumpTo = (move) => {
    setCurrentMove(move);
    if (move === 0){
      setHideContent(true);
    }
  }

  let description = "";
  const moves = history.map((squares, move) => {
    if(move > 0){
      description = "Go to Move #" + move;
    } else {
      description = "Go to start";
    }

    return (
      <li key={move} className='historyItem'>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='bodyContainers'>
      <div className='bodyGame'>
        <Board 
        squares={currentSquares} 
        xIsNext={xIsNext} 
        onPlay={handlePlay} 
        jumpTo={jumpTo}
        hideContent={hideContent}
        setHideContent={setHideContent}
        />
      </div>
      <div className='bodyHistory'>
        <ol id="movesList" className={hideContent ? "" : "d-none"}>{moves}</ol>
      </div>
    </div>
  );
}