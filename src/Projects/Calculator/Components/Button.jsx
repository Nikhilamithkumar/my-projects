import React from 'react'
import { MdBackspace } from 'react-icons/md'
import { FaSquareRootVariable } from "react-icons/fa6";

import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import styles from './Button.module.css'

function Button({className, value, onClick, type}) {
  const classNames = [styles.button]
  if (type) classNames.push(styles[type])
  if (className && styles[className]) classNames.push(styles[className])

  return (
    <button className={classNames.join(' ')} onClick={onClick}>
      {value === 'BS' ? <MdBackspace /> : value === 'exp' ? <InlineMath math={'x^2'} /> : value === 'sqrt' ? <FaSquareRootVariable style={{ fontSize: '28px', fontWeight: 'bold', alignContent: 'bottom' }} /> : value}
    </button>
  )
}

export default Button