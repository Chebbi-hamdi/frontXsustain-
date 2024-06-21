// Piece component
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import Cover from '../../../../assets/images/Modal/Cover.svg';
import { changeCoverPhotoAsync, deleteImageAsync } from '../../../../store/taskslice';
import {  useSendNotifMutationTask } from '../../../../functions/UseMutation/useMutationTask';
import { useTaskInfo, useTeammateInfo } from '../../../../functions/UseQuery/TeamData';
import { notifyError } from '../../../containers/errorCont';
import { selectEdit } from '../../../../store/editSlice';
import { GetTask } from '../../../../api/Tasks';
import LoaderSpin from '../../../loader/LoaderSpin';

const Piece =({ img, Time, Title, imgId, taskId }) => {

  const formattedTime = new Date(Time).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const userData = useSelector(state => state.token.user);
  const { TeamInfo, isLoading, refetch } = useTeammateInfo(taskId);
  const { task, isLoading1, refetch1 } = useTaskInfo(taskId);
  const dispatch = useDispatch();
  const coverPhotoChanging = useSelector((state) => state.tasks.coverPhotoChanging);
  const SendNotifMutationTask = useSendNotifMutationTask(); 
  const edit = useSelector(selectEdit);

  const handleCoverIm =async () => {
    if (!edit) return;
    const recieverss=task?.participants;
    const userdataId ={id:task?.owner}
    recieverss?.push(userdataId);
    dispatch(changeCoverPhotoAsync({ taskId, imagePathId: imgId }));
    const content=(`${userData.name} updated coverphoto of ${TeamInfo.title}`)

    SendNotifMutationTask.mutate({ sender:userData._id, receivers:recieverss, content,IdTaskk:taskId},{
    });
  };

  const handleDelete = () => {
    if (!edit) return;

    dispatch(deleteImageAsync({ taskId, imagePathId: imgId }));
  };
  if (isLoading || isLoading1)    {return <LoaderSpin />;}

  return (
    <div className={styles.MainDisplayPiece}>
      <div className={styles.Center}>
        <div className={styles.Contenu}>
          <div className={styles.ImgDiv}>
            <img className={styles.IMg} src={img} alt="piece" />
          </div>
          <div className={styles.DetailsDiv}>
            <div className={styles.Title}>
              <p className={styles.Titletxt}>{Title}</p>
            </div>

            <div className={styles.SubDetailsDiv}>
              <p className={styles.txt}>Ajouté {formattedTime}</p>
              <p className={styles.txt}>Commenter</p>
              <p className={styles.txt}>Télécharger</p>
            </div>
            <div className={styles.SubDetailsDiv1}>
              <p onClick={handleDelete} className={styles.txt}>
                Supprimer
              </p>
              <p className={styles.txt}>Modiier</p>
            </div>
            <div className={styles.SubDetailsDiv2}>
              <img src={Cover} alt="cover" />
              <p onClick={handleCoverIm} className={styles.txt}>
                Choisir comme image de couverture
              </p>
            </div>
            {coverPhotoChanging && <p>Changing cover photo...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piece;
