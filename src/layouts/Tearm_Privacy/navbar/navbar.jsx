import React from 'react';
import Cont from '../../../drawables/containers/container';
import styles from './style.module.scss'
import Bell from '../../../assets/images/bell.svg'
import flesh from "../../../assets/images/Arrow_Down_LG.svg"
import ProfileImg from "../../../assets/images/profilePic.png"
import { H24 } from '../../../drawables/txt/Txt';

const NavBar = () => {
  return (
    <Cont className={styles.main_card11}>
        <div className={styles.XsusLo}>            
            <H24 className={styles.Xsus}>XSUSTAIN.</H24>
        </div>
        <Cont className={styles.container}>
            <Cont className={styles.inside}>
              <Cont className={styles.UserInfo}>
                <img src={ProfileImg} alt='' className={styles.ProfileImg}></img>
                <Cont className={styles.Name_Plan}>
                    <p className={styles.Name}>Hamma Bidoun<img src={flesh} alt='' className={styles.flesh}></img></p>
                    <p className={styles.Plan}>Basic Plan</p>
                </Cont>
              </Cont>
              <img className={styles.settingIm} src={Bell} alt='' ></img>


            </Cont>

        </Cont>
    </Cont>
  );
}

export default NavBar;
