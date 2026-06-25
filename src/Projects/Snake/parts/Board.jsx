import React from "react";
import Cell from "./Cell";
import styles from "../SnakeGame.module.css";

export default function Board({ snake, food, gridSize }) {
    const cells = [];

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
        const isSnake = snake.some(s => s.x === x && s.y === y);
        const isFood  = food.x === x && food.y === y;
        const type    = isSnake ? "snake" : isFood ? "food" : "empty";
        cells.push(<Cell key={`${x}-${y}`} type={type} />);
        }
    };
    return (
    <div
        className={styles.board}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
    >
        {cells}
    </div>
    );
    }