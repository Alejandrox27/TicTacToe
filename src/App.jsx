import { useState } from 'react'
import { Square } from './components/Square'
import './App.css'

export default function App(){
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  let status_win;
  let status_next;

  function restartGame(){
    document.getElementsByClassName("status-win")[0].classList.add("d-none")
    document.getElementsByClassName("button-restart")[0].classList.add("d-none")
    document.getElementsByClassName("container")[0].classList.remove("d-none")
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  
  if (winner) {
    status_win = "Winner: " + winner;
    document.getElementsByClassName("status-win")[0].classList.remove("d-none")
    document.getElementsByClassName("button-restart")[0].classList.remove("d-none")
    document.getElementsByClassName("container")[0].classList.add("d-none")
  } else {
    status_next = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return(
    <>
    <div className='d-none status-win'>
      <h3>{status_win}</h3>
      <button onClick={restartGame} className='d-none button-restart'>Restart</button>
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