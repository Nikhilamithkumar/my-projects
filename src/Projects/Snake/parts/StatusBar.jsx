export default function StatusBar({ score, highScore, isGameOver }) {
  return (
    <div className="status">
      <p>Score: {score}</p>
      <p className = 'highScore'>Best: {highScore}</p>
      {isGameOver && <p className="game-over">Game Over!</p>}
    </div>
  );
}