import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Div } from '../../Divs/Div_Param';
import { useSelector } from 'react-redux';
import { MuiFileInput } from 'mui-file-input'

import showdesc from '../../../assets/images/Modal/ShowDesc.svg';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { DisplayComments, SubuploadFile, addComment, deleteComment, editComment, updateDesc, uploadFile} from '../../../api/Tasks';
import ResponsiveDialog from '../../cards/ConfirmationDIalog/ModalConfirmation';
import { getTimeDifference } from '../../../functions/DateConveertisseur';
import { selectEdit } from '../../../store/editSlice';
import { useDispatch } from 'react-redux';

const Description = ({ DESC,typeDis,showModal,taskId ,edit}) => {
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    const [isDescVisible, setIsDescVisible] = useState(false); // State to track visibility of description

    const [description, setDescription] = useState(DESC);
    const dispatch = useDispatch();

    const userData = useSelector(state => state.token.user);
    const [selectedFile, setSelectedFile] = useState(null);
    const [comments, setComments] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [editCommmentFile, setEditedFile] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open state
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [editedDesc, setEditedDesc] = useState(DESC);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [fileName, setFileName] = useState(""); // Store the file name
  console.log('----------++++}}}++}',edit)
    

    const handleToggleEditDesc = () => {
        if (!edit) return;

        if (!isDescVisible) {
            setIsDescVisible(true);
        }
        setIsEditingDesc(!isEditingDesc);
    };
    
    const handleSaveDesc = (Desc) => {
        if (!edit) return;

        setDescription(Desc)
        setIsEditingDesc(false);
        updateDesc(taskId,Desc)

    };
    const refreshComments = async () => {
        try {
            
            const updatedComments = await DisplayComments(taskId);
            console.log('###########____############""',updatedComments)
            const fetchedComments = updatedComments.map(item => ({
                comment: item.message,
                sender: item.sender,
                files: item.files || [],
                Ids: item.id,
                color: item.color,
                date: getTimeDifference(item.date),
                imagePath:item.imagePath
            }));
            
            // Triez les commentaires par date, du plus récent au plus ancien
            fetchedComments.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Inverser l'ordre pour que le dernier commentaire soit en haut
            fetchedComments.reverse();
            
            setComments(fetchedComments);
                        
            
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    
    const handleEditComment = async (commentId, commentText,file) => {
        if (!edit) return;

        setEditingComment(commentId);
        setEditedComment(commentText);
        setEditedFile(file);
        
    };
    const handleConfirmDelete = async () => {
        if (!edit) return;

        try {
            await deleteComment(selectedCommentId);
            await refreshComments();
            setOpenDialog(false);
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const handleDeleteComment = (commentId) => {
        if (!edit) return;

        setSelectedCommentId(commentId);
        setOpenDialog(true);
    };
        useEffect(() => {
      if (showModal) {
        refreshComments();
      }  
    }, [showModal]);  
  
    const handleSaveEditedComment = async (commentId, newComment,editCommmentFile) => {
        
      try {
       
        await editComment(commentId, editCommmentFile, newComment);
        setEditingComment(null);
        setEditedComment('');
        setEditedFile(null);
        refreshComments();
    } catch (error) {
      console.error('Error editing comment:', error);
    };  
    
    

  
    }  
  
  
    const handleEditorChange = (state) => {
        if (!edit) return;

        setEditorState(state);
    };

    const submitComment = async () => {
        if (!edit) return;

        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        const text = rawContent.blocks.map(block => block.text).join('\n');
        if (text.trim() !== "") {
            try {
                await addComment(taskId, userData._id, text);
                await refreshComments(); // Refresh after adding
                setEditorState(EditorState.createEmpty()); // Clear editor state
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
        if (selectedFile) {
            try {
                await uploadFile(taskId, userData._id, selectedFile,dispatch);
                setSelectedFile(null); // Clear selected file
                await refreshComments(); // Refresh after uploading
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    
    const handleFileChange = (file) => {
        if (!edit) return;

        if (file) {
            setSelectedFile(file);
            setFileName(file.name);  // Update the state with the file name
        } else {
            setSelectedFile(null);
            setFileName("");
        }
    };

    const handleSubmitFile = async () => {
        if (!edit) return;

        if (selectedFile) {
            try {
                await uploadFile(taskId, userData._id, selectedFile,dispatch);
                setSelectedFile(null); // Clear selected file
                setFileName(""); // Clear the file name after upload
                refreshComments(); // Refresh comments after uploading
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    const isEditorEmpty = () => {
        
        const contentState = editorState.getCurrentContent();
        const isEmpty = !contentState.hasText();
        return isEmpty;
    };
    console.log('------_----',comments)
    return (
        <Div className={styles.Main}>
            <Div className={styles.DesPart} height={'30%'}>
                <Div className={styles.Center}>
                    <Div className={styles.Left}>
                        <Div className={styles.imGdiv}>
                            <img
                                className={styles.Img}
                                src={showdesc}
                                alt=""
                                onClick={() => setIsDescVisible(!isDescVisible)} // Toggle visibility when clicked
                            />
                            <p className={styles.description}>Description</p>
                        </Div>
                    </Div>
                    <Div className={styles.Right}>
                <Div className={styles.detailsdiv}>
                    <button className={styles.buttonDetails} height={'100%'} width={'90%'} onClick={handleToggleEditDesc}>
                        Modifier
                    </button>
                </Div>
            </Div>

                </Div>
                </Div>
            {isDescVisible && (
                <Div className={styles.DesccTxt}>
                    {isEditingDesc ? (
                        <div  className={styles.InputDescdiv}>
                            <input className={styles.InputDesc}
                                type="text"
                                value={editedDesc}
                                onChange={(e) => setEditedDesc(e.target.value)}
                                style={{ display: 'block' }}  // Ensure it's not hidden by CSS
                            />
                            <button  className={styles.buttonSave} onClick={() => handleSaveDesc(editedDesc)}>Save</button>
                        </div>
                    ) : (
                        <p className={styles.DESC}>{description}</p>
                    )}
                </Div>
            )}
            <Div className={styles.CommetnPart} height={'70%'}>
                <Div className={styles.Center}> 
                    <Div className={styles.Bule}>

                    {userData.imagePath ? (
                                        <div className={styles.imageDiv} >
                                          <img src={userData.imagePath} alt={userData.name} className={styles.profileImage} />
                                        </div>
                                      ) : (
                                        <div className={styles.memberBubble} style={{ backgroundColor: userData.color }}>
                                        <span className={styles.spanLetter}>{userData?.name.charAt(0)}</span>
                                    </div>

                                    )}
                    </Div>

                <div className={styles.editorContainer}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                        }}
                    />

                </div>

                </Div>
                

            </Div>
            <div className={styles.buttonsDesc}>
                <button
                    className={`${styles.submitComment} ${isEditorEmpty() ? styles.disabledSubmitComment : ''}`}
                    onClick={submitComment}
                    disabled={isEditorEmpty()}
                >
                    Enregistrer
                </button>



            </div>
            <Div className={styles.addFile} >

                        <MuiFileInput
                            style={{
                                width:'78%',
                                color: '#fff', // white text
                                borderRadius: '4px', // rounded corners
                                fontSize: '16px', // text size
                                fontFamily: 'Arial, sans-serif', // font styling
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // subtle shadow
                                cursor: 'pointer', // cursor pointer
                                transition: 'all 0.3s ease' // smooth transition for hover effect
                            }}
                            label={fileName || "Add File"} // Display the file name if selected
                            onChange={handleFileChange}
                        />
            </Div>
            <Div className={styles.addFileDiv}>
                <button
                        onClick={handleSubmitFile}
                        className={`${styles.submitButton} ${!selectedFile ? styles.submitButtonDisabled : ''}`}
                        disabled={!selectedFile}  // Disable the button if no file is selected
                    >
                    Upload     
                </button>
                
            </Div>

            <Div className={styles.CommentSection}>
                <Div className={styles.CenterComment}>
                {Array.isArray(comments) && comments.map((commentObj, index) => (
                    <div className={styles.DisplayComment} key={index}>
                         {commentObj.imagePath ? (
                                        <div className={styles.imageDiv} >
                                          <img src={commentObj.imagePath} alt={commentObj.name} className={styles.profileImage} />
                                        </div>
                                      ) : (
                                        <div className={styles.memberBubble} style={{ backgroundColor: commentObj.color }}>
                                        <span className={styles.spanLetter}>{commentObj?.name.charAt(0)}</span>
                                    </div>

                                    )}
                        <div className={styles.commnett}>                
                            {editingComment === commentObj.Ids ? (
                                <div className={styles.commentDivedit}>
                                    <input className={styles.editInputTxt} type="text" value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                                    <input className={styles.editInputFile} type="file" onChange={(e) => setEditedFile(e.target.files[0])} />
                                    <div className={styles.saveButtonDiv}>
                                        <button className={styles.SaveButton} onClick={() => handleSaveEditedComment(commentObj.Ids, editedComment, editCommmentFile)}>Save</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className={styles.flexHeadComment}>
                                        <p className={styles.Namee}>{commentObj.sender}</p>
                                        <p className={styles.DateComment}>{commentObj.date}</p>

                                    </div>
                                    <p className={styles.commentTxt}>{commentObj.comment}</p>
                                </div>
                            )}
                            {commentObj.files.map((file, fileIndex) => (
                            <div className={styles.imdiv} key={fileIndex}>
                                <img className={styles.img} src={file} alt={`File ${fileIndex + 1}`} />
                            </div>
                            ))}
                            {commentObj.sender === userData.name && (
                                <div className={styles.edsupp}>
                                    <div className={styles.edit} onClick={() => handleEditComment(commentObj.Ids, commentObj.comment)}>Edit</div>
                                    <div className={styles.supp} onClick={() => handleDeleteComment(commentObj.Ids)}>Delete</div>
                                </div>
                            )}
                        </div>


                    </div>
                    ))}           

                </Div>

            </Div>
            <ResponsiveDialog
                open={openDialog}
                setOpen={setOpenDialog}
                buttonText="Delete"
                dialogTitle="Delete Team Member"
                dialogContent={`Are you sure you want to delete Comment}?`}
                agreeText="Delete"
                disagreeText="Cancel"
                onAgree={handleConfirmDelete}
                onDisagree={() => setOpenDialog(false)} // Close the dialog on cancel
                />


        </Div>
    );
};

export default Description;
