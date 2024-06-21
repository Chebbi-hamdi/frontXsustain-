import React from 'react';
import styles from './style.module.scss';
import { H24 } from '../../../txt/Txt';
import { Div } from '../../../Divs/Div_Param';

const TearmCard = ({ TearmOrPolicys,Titles }) => {
  return (
    <div className={styles.Main} >
        <div className={styles.Main1} >
          <H24 className={styles.Title}>{Titles}</H24>
          <Div className={styles.Subtitle}>
              {TearmOrPolicys.map((termOrPolicy, index) => (
              <div key={index}>
              {termOrPolicy}
              </div>
          ))}
          </Div>

     
        </div>
      </div>
  );
};

export default TearmCard;
