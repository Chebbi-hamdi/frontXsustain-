import React from 'react'
import styles from './style.module.scss';
import { H24 } from '../../../drawables/txt/Txt';
import { P18 } from '../../../drawables/txt/Txt';
import { P16 } from '../../../drawables/txt/Txt';
import Cont from '../../../drawables/containers/container';
import SettingIcon from '../../../assets/images/setting-2.svg' 
import Bell from '../../../assets/images/bell.svg'
import ProfileImg from "../../../assets/images/profilePic.png"
import flesh from "../../../assets/images/Arrow_Down_LG.svg"
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/tokenSlice';
import BubleImg from '../../../drawables/bubleimg/bubleImg'
import { useNavigate } from 'react-router-dom';
const NavBar = ({ selectedItem }) => {
  const {user} = useSelector(getUser);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClick = () => {
    navigate("/profile"); // Navigate to the specified route
  };

  return (
    <Cont className={styles.main_card11}>
        <Cont className={styles.container}>
            <Cont className={styles.inside}>
              <img className={styles.BellIm} src={Bell} alt='' ></img>
              <Cont className={styles.UserInfo}>
              {user.imagePath ? (
                  <img src={user.imagePath} alt='' className={styles.ProfileImg} />
              ) : (
                  <BubleImg user={user} />
              )}                
              <Cont className={styles.Name_Plan}>
              <p className={styles.Name}>{user.name}<img onClick={handleClick} src={flesh} alt='' className={styles.flesh} /></p>
                    <p className={styles.Plan}>Basic Plan</p>
                </Cont>
              </Cont>
              
            </Cont>
        </Cont>
    </Cont>
  )
}

export default NavBar
