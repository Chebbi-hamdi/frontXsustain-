import React, { useEffect, useState } from 'react';
import BorderContainer from '../../../containers/Boder_Container';
import { Div } from '../../../Divs/Div_Param';
import styles from './style.module.scss';
import comment from '../../../../assets/images/TaskManager/status/card/Comment.svg';
import file from '../../../../assets/images/TaskManager/status/card/File.svg';
import low from '../../../../assets/images/TaskManager/status/card/low.svg';
import more from '../../../../assets/images/TaskManager/status/card/more.svg';
import high from '../../../../assets/images/TaskManager/status/card/Hight.svg';
import complete from '../../../../assets/images/TaskManager/status/card/Completed.svg';
import ReactModal from 'react-modal';
import { useTeammateImg } from '../../../../functions/UseQuery/TeamData';
import TaskModal from './modal/TaskModal';
import { useSelector } from 'react-redux';
import LoaderSpin from '../../../loader/LoaderSpin';

ReactModal.setAppElement('#root');

const PPCard = ({ type, typeDis, taskTitle, taskId, nbrFiles, nbrComment, ImageTask, txtDescription, className, Title, Priority,edit }) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const additionalClass = type === 'Task' ? styles.blueBackground : '';
console.log('--------------------------------',edit)
  const { Imgs, isLoadingg } = useTeammateImg(taskId);
  console.log('------',Imgs)
  const [currentPriority, setCurrentPriority] = useState(Priority);
  const togglePriority = () => {
    switch (currentPriority) {
      case 'Low':
        setCurrentPriority('High');
        break;
      case 'High':
        setCurrentPriority('Completed');
        break;
      case 'Completed':
        setCurrentPriority('Low');
        break;
      default:
        setCurrentPriority('Low');
        break;
    }
  };

  let prioImage;
  switch (currentPriority) {
    case 'Low':
      prioImage = low;
      break;
    case 'High':
      prioImage = high;
      break;
    case 'Completed':
      prioImage = complete;
      break;
    default:
      prioImage = low; // Default to low if undefined
      break;
  }

  const openModal = () => {
    setShowModal(true);

  };

  const closeModal = () => {
    setShowModal(false);
  };

  const coverPhotoChanging = useSelector(state => state.tasks.coverPhotoChanging);
  const coverPhoto = useSelector(state => state.tasks.coverPhoto); // Access the updated cover photo
  useEffect(() => {
  }, [coverPhotoChanging]); // Run this effect only once after the component is mounted
if (!Imgs){
  return <LoaderSpin />;
}
  return (
    <BorderContainer className={`${styles.main} ${className} ${additionalClass}`} width={'100%'}>
      <Div className={styles.Center}>
        <Div className={styles.Head} height={'3.31rem'}>
          <Div width={'50%'}>
            <img src={prioImage} alt='' className={styles.StatusCard} onClick={togglePriority} />
          </Div>
          <div  onClick={openModal} className={styles.MoreCont}>
            <div className={styles.StatusCardDiv} >
              <img src={more} alt='' className={styles.more} />
            </div>
          </div>
        </Div>
        <Div className={styles.Body}>
          <Div className={styles.Center}>
            <Div className={styles.Title}>
              <p>{Title}</p>
            </Div>
            <Div className={styles.Desc}>
            {coverPhoto && coverPhoto.trim() ? (
              <>
                <div className={styles.textDesc}>
                  <p>{txtDescription}</p>
                </div>
                <img src={coverPhoto} className={styles.ImgDesc} alt='Task Imagecc' />
              </>
            ) : (
              <>
                {ImageTask ? (
                  <img src={ImageTask} className={styles.ImgDesc} alt='Task Imagec' />
                ) : (
                  <div>
                    <p>{txtDescription}</p>
                  </div>
                )}
              </>
            )}


          </Div>
          </Div>
        </Div>
        <Div className={styles.Footer} height={'4.25rem'}>
          <Div className={styles.Center}>
            <Div className={styles.teamImgs}>
            {Array.isArray(Imgs) && Imgs.map((image, index) => (
    <Div className={styles.ImgsTeamDiv} key={index}>
        {image.imagePath ? (
            <img src={image.imagePath} alt={`Teammate ${index + 1}`} className={styles.ImgsTeam} />
        ) : (
          <div className={styles.memberBubble} style={{ backgroundColor: image.color }}>
            <span className={styles.spanLetter}>{image.name.charAt(0)}</span>
          </div>
    )}
    </Div>
))}
            </Div>
            <Div className={styles.CommentDiv}>
              <img src={comment} alt='' className={styles.commentImg} />
              <p className={styles.commenttxt}>{nbrComment} Comments</p>
            </Div>
            <Div className={styles.FileDiv}>
              <img src={file} alt='' className={styles.commentImg} />
              <p className={styles.Filetxt}>{nbrFiles} Files</p>
            </Div>
          </Div>
        </Div>
      </Div>
      {showModal && <TaskModal
        edit={edit}
        typeDis={typeDis}
        taskId={taskId}
        taskTitle={taskTitle}
        ImageTask={ImageTask}
        showModal={showModal}
        txtDescription={txtDescription}
        setShowModal={setShowModal}

      />}
    </BorderContainer>
  );
};

export default PPCard;
