import React, { useEffect, useState } from 'react';
import { Div } from '../../../Divs/Div_Param';
import styles from "./style.module.scss";
import { P16 } from '../../../txt/Txt';
import CatImg from '../../../../assets/images/TaskManager/category.svg';
import Checkbox1 from '../../../../assets/images/TaskManager/Check.svg';
import Checkbox0 from '../../../../assets/images/TaskManager/checkbox0.svg';
import ItemImg from '../../../../assets/images/TaskManager/imgItem.svg';
import DesImg from "../../../../assets/images/TaskManager/designerImg.svg";
import SubImg from "../../../../assets/images/TaskManager/SubImg.svg";
import Flex from '../../../Flex/flex';
import { useNavigate } from 'react-router-dom';
import Xsus from '../../../../assets/images/Xsus.jpg'
import { useDispatch } from 'react-redux';
import { setEdit } from '../../../../store/editSlice';
import HoverTip from '../../../cards/hoverTip/HoverTip';
import { markNotifAsSeenTask } from '../../../../api/notif';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../store/tokenSlice';
const LigneTab = ({statusText,ownerImg,notif,edit,id,coverPhoto, onCheckboxChange,onStatusChange,isChecked, stylee, isDraggingg, className, itemText, textContent, reqText, designerText, subText, Ar, Br, rff }) => {

const navigate = useNavigate();
const dispatch = useDispatch();

const { user } = useSelector(getUser);

// Function to handle the image click event
const handleImageClick = () => {
  markNotifAsSeenTask(id,user._id,notif)
  navigate(`/taskstatus/${id}`);
  dispatch(setEdit(edit));

};
let backgroundColor, textColor;

switch (statusText) {
  case 'Unassigned':
    backgroundColor = '#C2C2C2';
    textColor = 'white';
    break;
  case 'In Progress':
    backgroundColor = '#2468FF';
    textColor = '#FFFFFF';
    break;
  case 'Done':
    backgroundColor = '#3FE8BE';
    textColor = '#000000';
    break;
  default:
    backgroundColor = '#FFFFFF'; // Default color
    textColor = '#000000'; // Default color
}


// put the edit in a slice and make the setter and getter of edit
  return (

  <div style={stylee} className={`${styles.BodyTabLigne} ${className}${notif.Seen === false ? styles.redBackground : ''}`} ref={rff} {...Ar} {...Br} isDragging={isDraggingg}>
      <div className={styles.BigcONT}>
        <Div className={styles.ItemCont} height={"40%"} width={"30%!important"}>
          <Div className={styles.Item}>
            <Div className={styles.Check_Cat}>
              <img src={CatImg} alt='' className={styles.CatImg}       onClick={handleImageClick}  // Click event triggers navigation
 />
              <img src={isChecked ? Checkbox1 : Checkbox0} alt='' className={styles.Checkbox} onClick={onCheckboxChange} />
            </Div>
            <Div className={styles.Img_Txt}>
              <img src={coverPhoto} alt='' className={styles.ItemImg} />
              <P16 className={styles.Ptxt}><HoverTip nbr={7}text={itemText} className={styles.Ptxt}/></P16>
            </Div>
          </Div>
        </Div>
        <Div className={styles.StatusCont} height={"40%"} >
          <Div className={styles.Status} height={"100%"} width={"100%"} >
            <div className={styles.StatusButt} style={{ backgroundColor, color: textColor }}>
              <P16 className={styles.Ptxt}>{statusText}</P16>
            </div>
          </Div>
        </Div>
        <Div className={styles.Req} >
          <Div className={styles.ReqCont}>
            <P16 className={styles.Ptxt}>{reqText}</P16>
          </Div>
        </Div>
        <Div className={styles.Designer}  width={"20%"}>
          <Div className={styles.DesignerCont}>
            <Flex className={styles.leFlex}>
              <img src={Xsus} alt=' ' className={styles.Img2}></img>
              <P16 className={styles.Ptxt}>{designerText}</P16>
            </Flex>
          </Div>
        </Div>
        <Div className={styles.Sub}  width={"20%"}>
          <Div className={styles.SubCont}>
            <Flex className={styles.leFlex}>
              <img src={ownerImg} alt=' ' className={styles.Img}></img>
              <P16 className={styles.Ptxt}>{subText}</P16>
            </Flex>
          </Div>
        </Div>
      </div>

      
      </div>
  );
  
};


export default LigneTab;
