import Square from "./Square";
import styles from "../tictactoe.module.css";

function Board({ squares, onSquareClick }) {
  return (
    <div className={styles.board}>
      {squares.map((val, i) => (
        <Square key={i} value={val} onClick={() => onSquareClick(i)} />
      ))}
    </div>
  );
}

export default Board;