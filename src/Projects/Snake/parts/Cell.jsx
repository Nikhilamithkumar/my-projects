import React from 'react'
import styles from '../SnakeGame.module.css'

function Cell({type}) {
  const typeClass = styles[type] || ''
  return (
    <div className={`${styles.cell} ${typeClass}`} />
  )
}

export default Cell