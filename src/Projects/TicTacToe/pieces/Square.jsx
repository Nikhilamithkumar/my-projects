import React from 'react'
import styles from '../tictactoe.module.css'

function Square({value,onClick}) {
  return (
    <button className={styles.square} onClick={onClick}>{value}</button>
  );
};

export default Square;