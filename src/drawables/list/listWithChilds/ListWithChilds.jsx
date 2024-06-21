import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import arrowDown from '../../../assets/images/arrowdown.svg';
import Child from './child/child';
import gsap from 'gsap';
import Projecttt from '../../../assets/images/Project0.svg';
import Taskk from '../../../assets/images/TaskManager0.svg';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/tokenSlice';

const ListSideBarWithChild = ({setActiveItem,activeItem, ref1, refChild2display, refChild1display, refChild2, refChild1, src, text, reff, nbr, navigateTo }) => {
  const [isChildVisible, setIsChildVisible] = useState(false);

  const toggleChildVisibility = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent
    setIsChildVisible(!isChildVisible);
    setActiveItem(navigateTo); // Set the active item on click

  };
  const { user } = useSelector(getUser);


  return (
    <div>

      <li
        ref={ref1}
        className={`${styles.lii} ${activeItem === navigateTo ? styles.active : ''}`} // Apply active class conditionally
        onClick={toggleChildVisibility}
      >
        <div className={styles.center} >
          <div className={styles.box}>
          <img src={src} className={`${styles.img} ${activeItem === navigateTo ? styles.invert : ''}`} alt='' /> {/* Apply invert class conditionally */}
            <div className={styles.Txt_Notif} ref={reff}>
              <p className={styles.text}>Manager</p>
              {nbr > 0 && (
              <div className={`${styles.notif} ${activeItem === navigateTo ? styles.notifinvert : ''}`}> {/* Apply notifinvert class conditionally */}
              <p className={`${styles.notifTxt} ${activeItem === navigateTo ? styles.notifTxtinvert : ''}`}>{nbr}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </li>
          {isChildVisible && (
            <>
            {
              !user.agent&&(
                <>
                  <div className={styles.centerChild}>
                    <Child
                      navigateTo='/projects'
                      nbr={nbr}
                      src={Projecttt}
                      text={'Projects'}
                      refChild={refChild1}
                      refChildDisplay={refChild1display}
                      setActiveItem={setActiveItem}
                      activeItem={activeItem}
                    />
                </div>
                </>
              )

            }
                
                <div className={styles.centerChild}>
                  <Child
                    navigateTo='/tasks'
                    nbr={nbr}
                    src={Taskk}
                    text={'Tasks'}
                    refChild={refChild2}
                    refChildDisplay={refChild2display}
                  />
                 </div>

            </>
          )}

    </div>
  );
};

export default ListSideBarWithChild;
