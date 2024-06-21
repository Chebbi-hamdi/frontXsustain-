import React from 'react'
import styles from './style.module.scss'

const CardHint = ({className, Img, Txt, Link, title}) => {
  return (
    <div className={`${styles.Main} ${className}`}>
      <div className={styles.flexOfCenter}>
        <div className={styles.imageDiv}>
          <div className={styles.imageDivCenter}>
            <img src={Img} className={styles.img} alt='img'></img>
          </div>
        </div>
        <div className={styles.explicationDiv}>
            <div className={styles.flexStart}>
                <div className={styles.TitleDiv}>
                    <p className={styles.Title}>{title}</p>
                </div>
                <div className={styles.txtDiv}>
                    <p className={styles.txt}>{Txt}</p>         
                </div>

            </div>
        </div>
      </div>
    </div>  
  )
}

export default CardHint;
