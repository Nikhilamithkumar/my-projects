import React, { useRef, useEffect } from 'react'
import styles from './Screen.module.css'

function Screen({value, valueSign}) {
  const wrapperRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const element = textRef.current
    const wrapper = wrapperRef.current
    if (!element || !wrapper) return

    let fontSize = 70
    element.style.fontSize = fontSize + 'px'

    while (element.scrollWidth > wrapper.clientWidth && fontSize > 10) {
      fontSize -= 1
      element.style.fontSize = fontSize + 'px'
    }
  }, [value])

  return (
    <div className={styles.screen}>
      <div className={styles.secondaryText}>{valueSign} </div>
      <div ref={wrapperRef} className={styles.wrapped} style={{minWidth: 0, overflow: 'hidden'}}>
        <p ref={textRef} className={styles.text}>{value}</p>
      </div>
    </div>
  )
}

export default Screen