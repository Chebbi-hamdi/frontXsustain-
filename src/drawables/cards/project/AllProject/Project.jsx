import React from 'react'
import { Div } from '../../../Divs/Div_Param'
import styles from './Project.module.scss'
import ProjectImg from "../../../../assets/images/Rectangle.svg"
import { P14,H24 ,P11} from '../../../txt/Txt';
import TeamImage from "../../../../assets/images/TeamImage.svg"
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({index,name,image,id}) => {
  const navigate = useNavigate()
  console.log('==',id)
  const handleNav = () => {
    navigate(`/tasks/${id}`);
  };

  return (
    <div className={styles.Main} onClick={handleNav}>
        <Div className={styles.imageCont} width={"100%"} height={'70%'} >
            <img className={styles.Image} src={image}></img>
        </Div>
        <Div width={"100%"} height={'30%'} className={styles.Hint}>
            <Div width={"95%"} height={'100%'}>
                <P11 className={styles.Tag}>Project #{index+1}</P11>
                <H24 className={styles.TitreProjet}>{name}</H24>

            </Div>
            
        </Div>
    </div>
  )
}

export default ProjectCard
