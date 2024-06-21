import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import Flex from '../../../../drawables/Flex/flex';
import { H24, P14 } from '../../../../drawables/txt/Txt';
import { Div } from '../../../../drawables/Divs/Div_Param';
import { useNavigate, useParams } from 'react-router-dom';
import AddTeammate from '../../../../assets/images/TaskManager/status/addButt.svg';
import backArrow from "../../../../assets/images/TaskManager/status/BackArrow.svg";
import { useTask } from '../../../../functions/UseQuery/TaskQuery';
import LoaderSpin from '../../../../drawables/loader/LoaderSpin';

const Head = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [imagesTeammates, setImagesTeammates] = useState([]);
  const { Task, loading } = useTask(id);  // Assuming `loading` indicates the loading state of the task

  const handleImageClick = () => {
    navigate(`/tasks`);
  };

  const makeImagesTeam = (task) => {
    return task[0]?.participants?.map(part => part?.id?.imagePath) || [];
  };

  useEffect(() => {
    if (!loading && Task && Task.length > 0) {
      const imagePaths = makeImagesTeam(Task);
      setImagesTeammates(imagePaths);
      console.log('-----------------------', imagePaths);
      console.log('-----------------------', Task);
    }
  }, [Task, loading]);  // Add `loading` to dependencies to handle the loading state


  if(loading)    return <LoaderSpin />;

  return (
    <Div className={styles.MainHT}>
      <Div height={"90%"} className={styles.LeFlex}>
        <Div className={styles.Title}>
          <Flex className={styles.flexTitle}>
            <Div className={styles.divArrow}>
              <img onClick={handleImageClick} className={styles.Icon} src={backArrow} alt='' />
            </Div>
            <Div>
              <H24 className={styles.TitileTxt}>Task management</H24>
            </Div>
          </Flex>
        </Div>
        <Div className={styles.TeamMates}>
          <Div className={styles.InviteFlex}>
            <Div className={styles.InviteDiv}>
              <img src={AddTeammate} alt='' className={styles.addTeammate} />
              <P14 className={styles.txtInvite}>Invite</P14>
            </Div>
          </Div>
          {imagesTeammates.map((image, index) => (
            <Div className={styles.ImgsTeamDiv} key={index}>
              <img src={image} alt={`Teammate ${index + 1}`} className={styles.ImgsTeam} />
            </Div>
          ))}
        </Div>
      </Div>
    </Div>
  );
};

export default Head;
