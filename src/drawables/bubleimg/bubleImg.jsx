import React from 'react'
import styles from './style.module.scss'
const bubleImg = ({user,className,className1}) => {
  return (
    <div className={`${styles.memberBubble} ${className}`} style={{ backgroundColor: user?.color }}>
      <span className={`${styles.spanLetter} ${className1}`}>{user?.name?.charAt(0)}</span>
</div>

  )
}

export default bubleImg
