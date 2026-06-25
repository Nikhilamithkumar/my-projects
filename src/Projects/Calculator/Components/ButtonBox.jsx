import React from 'react'
import styles from './ButtonBox.module.css'

function ButtonBox({children}) {
  return (
    <div className={styles.buttonBox}>{children}</div>
  )
}

export default ButtonBox