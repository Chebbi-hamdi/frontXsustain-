import React from 'react';
import { Div } from '../../../../Divs/Div_Param';
import styles from './style.module.scss';
import Flex from '../../../../Flex/center/FlexCenter';

const Review = ({ customstyleTxt,customstyle,imageSrc, Hint, tasksTxt }) => {
  return (

     <Div className={`${styles.MainReview} ${customstyle}`}  width={"100%"} height={"100%"} >
        <Flex flex='center' className={styles.fullHeight}>
          <Div width={"90%"} height={"100%"}>

              <Flex className={styles.fullHeight1} width={"100%"} height={"100%"} flex='between' align='center'>

                <Div width={"70%"} className={`${styles.Txt} ${customstyleTxt}`} >
                  <p className={styles.Hint}>{Hint}</p>
                  <p className={styles.NbrTasks}>{tasksTxt} Tasks</p>


                </Div>
                <img src={imageSrc} alt='' className={styles.Image}></img>
              </Flex>
        
        </Div>
     </Flex>
  </Div>
  




  );
};

export default Review;
