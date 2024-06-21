// Status.jsx

import React from 'react';
import Draw from '../../../../assets/images/draw.png';
import { Div } from '../../../../drawables/Divs/Div_Param';
import styles from "./style.module.scss";
import Flex from "../../../../drawables/Flex/center/FlexCenter";
import Headd from "../../../../layouts/TaskManager/status/Head/Head";
import Bodyy from '../../../../layouts/TaskManager/status/Body/Body';
import p1 from '../../../../assets/images/TaskManager/status/teammates/p1.svg';
import p2 from '../../../../assets/images/TaskManager/status/teammates/p2.svg';
import p3 from '../../../../assets/images/TaskManager/status/teammates/p3.svg';
import p4 from '../../../../assets/images/TaskManager/status/teammates/p4.svg';
import p5 from '../../../../assets/images/TaskManager/status/teammates/p5.svg';
import Footer from '../../../../layouts/footer/footer';

export const Taskmanagerstatuss = () => {
  var teammateImages = [p1, p2, p3, p4, p5];
  
  return (
    <Div height={'90dvh'} width={"100%"} className={styles.MainCardD}>
      <Flex width='100%' height='90%' className={styles.LeFlex}>
        <Div width="95%" height={"8%"} className={styles.Header}>
          <img src={Draw} alt='mm' className={styles.Draw} />
          <Headd teammateImages={teammateImages} />
        </Div>
        <Div width={"95%"} height={"87%"} className={styles.Bodyy}>
          <Bodyy/>
          <Div className={styles.footerDiv}>
          <Footer/>

          </Div>

        </Div>
    </Flex>
    </Div>
  );
};

