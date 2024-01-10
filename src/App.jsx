import { useState } from 'react'
import { Square } from './components/Square'
import './App.css'

function Board({ squares, xIsNext, onPlay }){
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  let status_win;
  let status_next;

  function restartGame(){
    document.getElementsByClassName("status-win")[0].classList.add("d-none")
    document.getElementById("restart-button").classList.add("d-none")
    document.getElementsByClassName("container")[0].classList.remove("d-none")
    document.getElementById("restart-game").classList.add("d-none")
    onPlay(Array(9).fill(null));
  }

  const winner = calculateWinner(squares);
  const arrNull = squares.includes(null);

  if(!winner && !arrNull){
    document.getElementById("restart-game").classList.remove("d-none")
  }
  
  if (winner) {
    status_win = "Winner: " + winner;
    document.getElementsByClassName("status-win")[0].classList.remove("d-none")
    document.getElementById("restart-button").classList.remove("d-none")
    document.getElementsByClassName("container")[0].classList.add("d-none")
  } else {
    status_next = "Next Player: " + (xIsNext ? "X" : "O");
  }


  return(
    <>
    <div className='d-none status-win'>
      <h3>{status_win}</h3>
      <div className='gradient'>
        <button onClick={restartGame} className='d-none button-restart' id='restart-button'>Restart</button>
      </div>
    </div>
    <div className='container'>
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
        <button onClick={restartGame} className='button-restart d-none' id='restart-game'>Restart</button>
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
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[history.length - 1];

  const handlePlay = (nextSquares) => {
    setHistory([...history, nextSquares])
    setCurrentMove(currentMove + 1)
  }

  const jumpTo = (move) => {
    
  }

  let description = "";
  const moves = history.map((squares, move) => {
    if(move > 0){
      description = "Go to Move #" + move;
    } else {
      description = "Go to start";
    }

    return (
      <>
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      </>
    );
  });

  return (
    <>
      <div className='BodyGame'>
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>
      <div className='BodyHistory'>
        <ol>{moves}</ol>
      </div>
    </>
  );
}