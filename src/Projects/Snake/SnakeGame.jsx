import { useState, useEffect, useRef } from "react";
import Board from "./parts/Board";
import StatusBar from "./parts/StatusBar";
import styles from "./SnakeGame.module.css";

const GRID_SIZE = 15;
const SPEED = 200;

const getRandomCell = (snake) => {
  let cell;
  do {
    cell = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(s => s.x === cell.x && s.y === cell.y));
  return cell;
};

const INITIAL_SNAKE = [{ x: 7, y: 7 },{x:7,y:8}];
const INITIAL_DIR = { x: 0, y: -1 }; 

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(getRandomCell(INITIAL_SNAKE));
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted]   = useState(false);
  const [score, setScore]           = useState(0);
  const [highScore, setHighScore]   = useState(() => Number(localStorage.getItem("snakeHighScore")) || 0);

  const nextDirRef    = useRef(INITIAL_DIR);
  const currentDirRef = useRef(INITIAL_DIR);
  const isStartedRef  = useRef(false);
  const scoreRef      = useRef(0);
  const highScoreRef  = useRef(Number(localStorage.getItem("snakeHighScore")) || 0);

  isStartedRef.current = isStarted;
  scoreRef.current     = score;
  highScoreRef.current = highScore;

  useEffect(() => {
    const DIRS = {
      ArrowUp:    { x: 0,  y: -1 },
      w:          { x: 0,  y: -1 },
      ArrowDown:  { x: 0,  y:  1 },
      s:          { x: 0,  y:  1 },     
      ArrowLeft:  { x: -1, y:  0 },
      a:          { x: -1, y:  0 },
      ArrowRight: { x:  1, y:  0 },
      d:          { x:  1, y:  0 },
    };
    const handleKey = (e) => {
      if (!DIRS[e.key]) return;
      if (!isStartedRef.current) return;
      const newDir = DIRS[e.key];
      const cur = currentDirRef.current;
      if (newDir.x === -cur.x && newDir.y === -cur.y) return;
      nextDirRef.current = newDir;
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);




  useEffect(() => {
    if (isGameOver || !isStarted) return;

    const interval = setInterval(() => {
      setSnake(prev => {
        currentDirRef.current = nextDirRef.current;

        const head = prev[0];
        const newHead = {
          x: (head.x + currentDirRef.current.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + currentDirRef.current.y + GRID_SIZE) % GRID_SIZE,
        };

        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setIsGameOver(true);
          console.log("score:", scoreRef.current, "highScore:", highScoreRef.current);
          if (scoreRef.current > highScoreRef.current) {
            setHighScore(scoreRef.current);
            localStorage.setItem("snakeHighScore", scoreRef.current);
          }
          return prev;
        }

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 1);
          setFood(getRandomCell(prev));
          return [newHead, ...prev];
        }

        return [newHead, ...prev.slice(0, -1)];
      });
    }, SPEED);

    return () => clearInterval(interval);
  }, [isGameOver, isStarted, food]);

  const handleReset = () => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomCell(INITIAL_SNAKE));
    setIsGameOver(false);
    setIsStarted(false);
    setScore(0);
    nextDirRef.current    = INITIAL_DIR;
    currentDirRef.current = INITIAL_DIR;
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Snake</h1>
      <StatusBar score={score} highScore={highScore} isGameOver={isGameOver} />
      <Board snake={snake} food={food} gridSize={GRID_SIZE} />
      {!isStarted && !isGameOver && (
        <button className={styles.button} onClick={() => setIsStarted(true)}>Start</button>
      )}
      {isGameOver && (
        <button className={styles.button} onClick={handleReset}>Restart</button>
      )}
    </div>
  );
}

