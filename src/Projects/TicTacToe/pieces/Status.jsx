import styles from '../tictactoe.module.css'

function StatusBar({ winner, isDraw, isXTurn }) {
  let message;
  if (winner) message = `🎉 Player ${winner} wins!`;
  else if (isDraw) message = `🤝 It's a draw!`;
  else message = `Player ${isXTurn ? "X" : "O"}'s turn`;

  return <p className={styles.status}>{message}</p>;
}
export default StatusBar;