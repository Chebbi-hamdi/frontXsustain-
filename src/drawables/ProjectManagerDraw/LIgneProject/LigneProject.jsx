import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.module.scss";
import CatImg from '../../../assets/images/TaskManager/category.svg';
import Checkbox1 from '../../../assets/images/TaskManager/Check.svg';
import Checkbox0 from '../../../assets/images/TaskManager/checkbox0.svg';
import DesImg from "../../../assets/images/TaskManager/designerImg.svg";
import SubImg from "../../../assets/images/TaskManager/SubImg.svg";
import { useNavigate } from 'react-router-dom';
import Xsus from '../../../assets/images/Xsus.jpg';
import { useDispatch, useSelector } from 'react-redux';
import LigneTaskInProject from './LigneTaskInProject/LigneTaskInProject';
import { getUser } from '../../../store/tokenSlice';
import HoverTip from '../../cards/hoverTip/HoverTip';
import Flex from '../../Flex/flex';
import { setEdit } from '../../../store/editSlice';
import { Div } from '../../Divs/Div_Param';
import { P16 } from '../../txt/Txt';
import gsap from 'gsap';
const LigneProject = ({ ownerImg, isTaskVisible,    ligneTabProjectRef,index, notif, edit, id, coverPhoto, textColor, backgroundColor, onCheckboxChange, onStatusChange, isChecked, stylee, isDraggingg, className, itemText, textContent, reqText, designerText, subText, Ar, Br, rff }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(getUser);
  useEffect(()=>{
  console.log('isvisible ',isTaskVisible)

})
  // Create a dynamic ref for each project line

  if (textContent === 'Unassigned') {
    backgroundColor = '#C2C2C2';
    textColor = 'white'; // Black for good contrast
} else if (textContent === 'In progress') {
    backgroundColor = '#2468FF';
    textColor = '#FFFFFF'; // White for good contrast
} else if (textContent === 'Done') {
    backgroundColor = '#3FE8BE';
    textColor = '#000000'; // Black for good contrast
}


  return (
    <div style={stylee} ref={rff}{...Ar} {...Br} isDragging={isDraggingg} className={`${styles.BodyTabLigne} ${className} ${notif?.Seen === false ? styles.redBackground : ''}`}  >
        <div  style={{width:'100%'}}>
          <div className={styles.expandedDiv} >
            <div className={styles.BigcONT} >
              <Div className={styles.ItemCont} height="40%" width="30%!important">
                <Div className={styles.Item}>
                  <Div className={styles.Check_Cat}>
                    <img src={CatImg} alt='' className={styles.CatImg}  />
                    <img src={isChecked ? Checkbox1 : Checkbox0} alt='' className={styles.Checkbox} onClick={onCheckboxChange} />
                  </Div>
                  <Div className={styles.Img_Txt}>
                    <img src={coverPhoto} alt='' className={styles.ItemImg} />
                    <P16 className={styles.Ptxt}>
                      <HoverTip nbr={7} text={itemText} className={styles.Ptxt} />
                    </P16>
                  </Div>
                </Div>
              </Div>
              <Div className={styles.StatusCont} height="40%">
                <Div className={styles.Status} height="100%" width="100%">
                  <div onClick={onStatusChange} className={styles.StatusButt} style={{ backgroundColor, color: textColor }}>
                    <P16 className={styles.Ptxt}>{textContent}</P16>
                  </div>
                </Div>
              </Div>
              <Div className={styles.Req}>
                <Div className={styles.ReqCont}>
                  <P16 className={styles.Ptxt}>{reqText}</P16>
                </Div>
              </Div>
              <Div className={styles.Designer} width="20%">
                <Div className={styles.DesignerCont}>
                  <Flex className={styles.leFlex}>
                    <img src={Xsus} alt=' ' className={styles.Img2}></img>
                    <P16 className={styles.Ptxt}>{designerText}</P16>
                  </Flex>
                </Div>
              </Div>
              <Div className={styles.Sub} width="20%">
                <Div className={styles.SubCont}>
                  <Flex className={styles.leFlex}>
                    <img src={ownerImg} alt=' ' className={styles.Img}></img>
                    <P16 className={styles.Ptxt}>{subText}</P16>
                  </Flex>
                </Div>
              </Div>
            </div>

          </div>
        </div>
    </div>
  );
};

export default LigneProject;
