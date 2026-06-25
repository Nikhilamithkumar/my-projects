import { useState, useEffect } from "react";
import Board from "./pieces/Board";
import StatusBar from "./pieces/Status";
import styles from "./tictactoe.module.css";
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],             // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // returns "X" or "O"
    }
  }
  return null;
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(s => s !== null);
  
  useEffect(() => {
    if (winner || isDraw) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
  }, [winner, isDraw]);
  
  function handleClick(index) {
    if (squares[index] || winner || isDraw) return;

    const next = [...squares];
    next[index] = isXTurn ? "X" : "O";

    setSquares(next);
    setIsXTurn(!isXTurn);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
    setGameOver(false);
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      <StatusBar winner={winner} isXTurn={isXTurn} isDraw={isDraw} />
      <Board squares={squares} onSquareClick={handleClick} />
      {gameOver && (
        <button className={styles.restart} onClick={handleReset}>Restart</button>
      )}
    </div>
  );
}

