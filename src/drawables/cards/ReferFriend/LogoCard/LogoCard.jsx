import React from 'react'
import styles from './style.module.scss'
const LogoCard = ({Logo}) => {
  return (
    <div className={styles.DivLogo}>
      <img src={Logo} alt={Logo} className={styles.img}></img>
    </div>
  )
}

export default LogoCard
