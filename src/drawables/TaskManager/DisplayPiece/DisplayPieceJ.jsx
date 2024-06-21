import React, { useState, useEffect } from 'react';
import Piece from './PieaceCard/Piece';
import styles from './style.module.scss';
import joint from '../../../assets/images/Modal/PieceJIcon.svg';
import { getFiles } from '../../../api/Tasks';
import { useSelector } from 'react-redux';
import { getProgressUpload } from '../../../store/uploadSlice';
import LoaderSpin from '../../loader/LoaderSpin';

const DisplayPieceJ = ({ edit, toggleModalFile, TaskId ,hundlePieceJointChange}) => {
    const [files, setFiles] = useState({ imagePathsWithTimestamps: [], filesWithTimestamps: [] });
    const [loading, setLoading] = useState(true);
    const filesChanging = useSelector(state => state.tasks.filedeleting);
    const progress = useSelector(getProgressUpload)

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const filesData = await getFiles(TaskId);
                setFiles(filesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, [TaskId, toggleModalFile, filesChanging,hundlePieceJointChange]); // Only refetch files when these dependencies change

    useEffect(() => {
        // Here you can perform any action related to progress if needed
        console.log('Progress changed:', progress);

        // Refetch files when progress changes
        const fetchFiles = async () => {
            try {
                const filesData = await getFiles(TaskId);
                setFiles(filesData);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, [progress, TaskId]); // Include TaskId as a dependency since it's used in the effect

    if (loading) {
        return <LoaderSpin />;
    }

    return (
        <div className={styles.MainDisplayPiece}>
            <div className={styles.Center}>
                <div className={styles.Head}>
                    <p className={styles.PieceeTxt}><img className={styles.imgP} src={joint} alt="Joint Icon" /> Pièces jointes</p>
                    <div className={styles.detailsdiv}>
                        <button className={styles.buttonDetails} height={'100%'} width={'90%'}>
                            Ajouter
                        </button>
                    </div>
                </div>
                {files?.imagePathsWithTimestamps?.map((image, index) => (
                    <Piece key={index} Title={image.imagePath.Title} img={image.imagePath.imagePath} Time={image.imagePath.timestamp} imgId={image.imagePath._id} taskId={TaskId} />
                ))}
                {files?.subimagePathsWithTimestamps?.map((image, index) => (
                    <Piece key={index} Title={image.imagePath.Title} img={image.imagePath.imagePath} Time={image.imagePath.timestamp} imgId={image.imagePath._id} taskId={TaskId} />
                ))}
                {files?.filesWithTimestamps?.map((file, index) => (
                    <Piece key={index} img={file.file} Time={file.timestamp} />
                ))}
            </div>
        </div>
    );
};

export default DisplayPieceJ;
