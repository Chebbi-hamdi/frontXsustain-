import React from 'react';
import { Div } from '../../../Divs/Div_Param';
import styles from './style.module.scss';
import Button from '../../../buttons/button.Dash';

const CustomCard = ({ title, hint, imageSrc, buttonText, ButtonTitle, customClassName,customImage ,CustomTxt}) => {
  return (
    <Div width={"100%"} height={"100%"} className={`${styles.MainReview} ${customClassName}`}>

      <Div className={styles.DraftHeader} width={"95%"} height={"30%"}>
        <Div className={styles.DraftHeaderCont} width={"90%"} height={"95%"}>
          <Div className={styles.CenterizeDraft} width={"95%"} height={"70%"}>
            <p className={`${styles.txtTitle} ${CustomTxt}`} >{title}</p>
            <p  className={`${styles.Hint} ${CustomTxt}`}>{hint}</p>
          </Div>
        </Div>
      </Div>
      <Div className={styles.RecentSave} width={"100%"} height={"40%"}>

              <img src={imageSrc} alt='' className={`${styles.pandaImg} ${customImage}`} /> {/* Concaténation des styles */}

      </Div>
      <Div className={styles.ButtonDiv} width={"100%"} height={"30%"}>
        <Div className={styles.ButtonDivCont} width={"90%"} height={"70%"}>
          <p className={styles.RecentsaveTxt}>{ButtonTitle}</p>
          <Button text={buttonText} />
        </Div>
      </Div>
    </Div>
  );
};

export default CustomCard;
