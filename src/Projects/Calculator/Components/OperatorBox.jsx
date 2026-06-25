import React from 'react'
import styles from './OperatorBox.module.css'

function OperatorBox({children}) {
  return (
    <div className={styles.operatorBox}>{children}</div>
  )
}

export default OperatorBox