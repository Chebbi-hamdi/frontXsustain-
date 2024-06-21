import React, { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import { useSelector } from "react-redux";
import { addFile, DelTeammateFromTask } from "../../../../../api/Tasks";
import {
  useTeamData,
  useTeammateInfo,
} from "../../../../../functions/UseQuery/TeamData";
import ReactModal from "react-modal";
import styles from "./style.module.scss";
import ResponsiveDialog from "../../../../cards/ConfirmationDIalog/ModalConfirmation";
import { Div } from "../../../../Divs/Div_Param";
import coverincon from "../../../../../assets/images/Modal/Cover.svg";
import addTeammateButton from "../../../../../assets/images/Modal/addTeammateButton.svg";
import openModal from "../../../../../assets/images/Modal/OpenModalAddTeammate.svg";
import CloseModal from "../../../../../assets/images/Modal/CloseModal.svg";
import Flex from "../../../../Flex/flex";
import Description from "../../../DescriptionCard/Description";
import { ClickAwayListener } from "@mui/base";
import DisplayPieceJ from "../../../DisplayPiece/DisplayPieceJ";
import AddP from "../../../../../assets/images/Modal/AddPieceJ.svg";
import { MuiFileInput } from "mui-file-input";
import { useAddTeammateMutation } from "../../../../../functions/UseMutation/useMutationTeam";
import { useSendNotifMutation } from "../../../../../functions/UseMutation/useMutationTeam";
import { notifyError } from "../../../../containers/errorCont";
import DelTeammate from "../../../../../assets/images/TaskManager/status/teammates/delteTeammateFromTask.svg";
import { selectEdit } from "../../../../../store/editSlice";
import { getProgressUpload } from "../../../../../store/uploadSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoaderSpin from "../../../../loader/LoaderSpin";

const TaskModal = ({
  txtDescription,
  taskId,
  ImageTask,
  setShowModal,
  taskTitle,
  typeDis,
  showModal,
  edit,
}) => {
  const userData = useSelector((state) => state.token.user);
  const [selectedEmailId, setSelectedEmailId] = useState("");
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const { Team } = useTeamData(userData._id);
  const { TeamInfo, isLoading, refetch } = useTeammateInfo(taskId);
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open state
  const [selectedMember, setSelectedMember] = useState(null); // State to store selected member for deletion
  const [selectedRole, setSelectedRole] = useState("viewer"); // Default role is set to "viewer"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleModalFile = () => setIsModalFileOpen(!isModalFileOpen);
  const [filename, setFilename] = useState(""); // Define filename state
  const [selectedFile, setSelectedFile] = useState(null);
  const coverPhoto = useSelector((state) => state.tasks.coverPhoto); // Access the updated cover photo
  console.log("____________________________", edit);
  const AddTeammateMutation = useAddTeammateMutation();
  const SentNotifMut = useSendNotifMutation();

  const handleAddTeammate = async () => {
    if (!edit) return;
    console.log("selectedEmailId", selectedEmailId);
    console.log("selectedRole", selectedRole);
    console.log("taskId", taskId);
    AddTeammateMutation.mutate(
      { taskId, selectedEmailId, selectedRole },
      {
        onSuccess: () => {
          const data = {
            sender: userData._id,
            receiver: selectedEmailId,
            content: `${userData.name} added You to Task as ${selectedRole}`,
            type: "NewTask",
          };

          SentNotifMut.mutate(data);
          refetch();
        },
        onError: () => {
          notifyError("error adding Teammate");
        },
      }
    );
  };

  const handleConfirmDelete = async () => {
    if (!edit) return;

    try {
      await DelTeammateFromTask(
        selectedMember._id,
        selectedMember.name,
        taskId
      );
      refetch();
      setOpenDialog(false); // Close the dialog after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleDeleteMember = (member) => {
    if (!edit) return;

    setSelectedMember(member);
    setOpenDialog(true); // This should trigger the modal to open
  };

  const handleSelectEmail = (value, item) => {
    if (!edit) return;

    setSelectedEmailId(item._id);
    setAutocompleteValue(value);
    console.log("selectedEmailId----------------------------", selectedEmailId);
  };

  const allMembers =
    Team && Team?.team ? Team?.team?.map((team) => team?.members).flat() : [];
  const closeModal = () => {
    setShowModal(false);
  };

  const customStyles = {
    content: {
      minWidth: "60em",
      width: "57%",
      height: "90%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "8px",
      padding: "0",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const dispatch = useDispatch();

  const hundlePieceJointChange = async (event) => {
    if (!edit) return;
    const selectedFile = event?.target?.files[0];
    setSelectedFile(selectedFile);
    setFilename(selectedFile?.name);
    await addFile(taskId, selectedFile, dispatch);
  };

  useEffect(() => {
    refetch();
  }, [!isModalOpen, isModalOpen, setIsModalOpen]); // Run this effect only once after the component is mounted
  const progress = useSelector(getProgressUpload);
  console.log("============o", TeamInfo);

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <Div height={"95%"} width={"100%"} className={styles.Main}>
        <Div height={"30%"} width={"100%"} className={styles.CoverPhoto}>
          <img
            className={styles.coverImage}
            src={coverPhoto || ImageTask}
            alt="dd"
          />
          <img src={coverincon} alt="dd" className={styles.coverIcon} />
        </Div>

        <Div className={styles.statusNDTeamMem}>
          <Div className={styles.Status}>
            <Div className={styles.Center}>
              <Div className={styles.StatusDiv}>
                <p className={styles.StatusTxt}>Status</p>
              </Div>
              <Div className={styles.AddMem1}>
                <p className={styles.MemTxt}>Members</p>
                {isLoading ? (
                  <LoaderSpin />
                ) : (
                  <div className={styles.leflex}>
                    {TeamInfo?.participants?.map((member, index) => (
                      <div key={index} className={styles.memberContainer}>
                        {member.id.imagePath ? (
                          <div className={styles.imageDiv}>
                            <img
                              src={member.id.imagePath}
                              alt={member.id.name}
                              className={styles.profileImage}
                            />
                          </div>
                        ) : (
                          <div
                            className={styles.memberBubble}
                            style={{ backgroundColor: member.id.color }}
                          >
                            <span className={styles.spanLetter}>
                              {member?.id?.name?.charAt(0)}
                            </span>
                          </div>
                        )}

                        <img
                          src={DelTeammate}
                          alt="delete Teammate"
                          className={styles.DelTeammate}
                          onClick={() => handleDeleteMember(member.id)}
                        ></img>
                        <p className={styles.NameMember}>{member.id?.name}</p>
                      </div>
                    ))}
                    <img
                      onClick={toggleModal}
                      src={addTeammateButton}
                      alt="addTeammate"
                      className={styles.addBuble}
                    ></img>
                  </div>
                )}
              </Div>
            </Div>
          </Div>
          <Div className={styles.Members}>
            <Div className={styles.Center}>
              <Div className={styles.txtDiv}>
                <p className={styles.txt}>Ajouter à la carte</p>
              </Div>

              <Div className={styles.Add}>
                <Div className={styles.ImgAddTeammate}>
                  <img
                    className={styles.modalOpen}
                    src={openModal}
                    onClick={toggleModal} // This will toggle the visibility of the modal
                    alt="Open Modal"
                  />
                </Div>

                {isModalOpen && (
                  <ClickAwayListener onClickAway={toggleModal}>
                    <div
                      className={`${styles.ManageTeammateModal} ${styles.highestIndex}`}
                    >
                      <Div className={styles.Center}>
                        <Div className={styles.addmemTxtDiv}>
                          <p className={styles.addmemTxt}>Add Members</p>
                          <img
                            onClick={toggleModal}
                            src={CloseModal}
                            alt="close"
                            className={styles.closeModal}
                          ></img>
                        </Div>
                        <div className={styles.header}>
                          <Autocomplete
                            getItemValue={(item) => item?.email?.primary}
                            items={allMembers}
                            menuStyle={{
                              top: "0", // Position directly below the input
                              left: 0,
                              zIndex: 11111111,
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                              borderRadius: "4px",
                              overflowY: "auto", // Enable scrolling if items exceed maxHeight
                            }}
                            renderItem={(item, isHighlighted) => (
                              <div
                                style={{
                                  backgroundColor: isHighlighted
                                    ? "lightgray"
                                    : "white",
                                  cursor: "pointer",
                                }}
                              >
                                {item?.email?.primary}
                              </div>
                            )}
                            value={autocompleteValue}
                            onChange={(e) =>
                              setAutocompleteValue(e.target.value)
                            }
                            onSelect={handleSelectEmail}
                            inputProps={{
                              style: {
                                width: "100%",
                                borderRadius: "2px",
                                border: "0.5px solid black",
                                paddingLeft: "5px",
                                height: "25px",
                                marginBottom: "5px",
                                // Adjust the height as needed
                              },
                            }}
                          />

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2%",
                              justifyContent: "space-between",
                              width: "100%", // Largeur totale pour l'alignement
                              marginLeft: "10px",
                              height: "30px", // Marge pour espacer de l'autocomplete
                            }}
                          >
                            <select
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value)}
                              style={{
                                width: "70%",
                                borderRadius: "2px",
                                border: "1px solid black",
                                display: "flex",
                                alignItems: "center",
                                height: "23px",
                              }}
                            >
                              <option value="editeur">editeur</option>
                              <option value="viewer">viewer</option>
                            </select>
                            <button
                              onClick={() => {
                                handleAddTeammate();
                                toggleModal();
                              }}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#2468FF",
                                color: "black",
                                border: "0.5px solid black",
                                height: "20px",
                                borderRadius: "2px",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                fontSize: "0.7rem",
                                width: "30%",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "white";
                                e.currentTarget.style.color = "black";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#2468FF";
                                e.currentTarget.style.color = "white";
                              }}
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div className={styles.TitileOwnerDiv}>
                          <p className={styles.TitileOwnerTxt}>
                            Members de la carte
                          </p>
                        </div>
                        <Flex className={styles.flexOwner}>
                          <div
                            className={styles.memberBubble}
                            style={{ backgroundColor: userData.color }}
                          >
                            <span className={styles.spanLetter}>
                              {TeamInfo?.owner?.name[0]}{" "}
                              {/*{TeamInfo?.owner?.name[0]}*/}
                            </span>
                          </div>

                          <div className={styles.divNameOwner}>
                            <p className={styles.NameOwnerTxt}>
                              {TeamInfo?.owner?.email?.primary}
                            </p>
                          </div>
                        </Flex>
                        <div className={styles.TitileParticipantsDiv}>
                          <p className={styles.TitileParticipantsTxt}>
                            Members du tableau
                          </p>
                        </div>
                        <Flex className={styles.flexParticipant}>
                          {TeamInfo?.participants?.map((participant) => (
                            <div
                              key={participant.id._id}
                              className={styles.ParticipantsMapDiv}
                            >
                              {" "}
                              {/* Ensure each child in a list has a unique key */}
                              {participant.id.imagePath ? (
                                <div className={styles.imageDiv}>
                                  <img
                                    src={participant.id.imagePath}
                                    alt={participant.id.name}
                                    className={styles.profileImage}
                                  />
                                </div>
                              ) : (
                                <div
                                  className={styles.memberBubble}
                                  style={{
                                    backgroundColor: participant.id.color,
                                  }}
                                >
                                  <span className={styles.spanLetter}>
                                    {participant?.id?.name?.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div className={styles.divNameParticipant}>
                                <p className={styles.NameParticipantTxt}>
                                  {participant?.id?.email?.primary}
                                </p>
                              </div>
                            </div>
                          ))}
                        </Flex>
                      </Div>
                    </div>
                  </ClickAwayListener>
                )}
              </Div>
              <Div className={styles.Add1}>
                <Div className={styles.ImgAddTeammate}>
                  <label htmlFor="profilePicInput">
                    <img
                      className={styles.modalOpen}
                      src={AddP}
                      alt="Open Modal"
                    />
                  </label>
                  {progress !== undefined &&
                    progress !== null &&
                    !isNaN(progress) &&
                    progress >= 0 &&
                    progress <= 100 &&
                    progress !== 100 && (
                      <LinearProgress variant="determinate" value={progress} />
                    )}
                  <input
                    type="file"
                    id="profilePicInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={hundlePieceJointChange}
                  />
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
        <Div>
          <Description
            edit={edit}
            typeDis={typeDis}
            showModal={showModal}
            taskId={taskId}
            DESC={txtDescription}
          ></Description>
        </Div>
        <Div>
          <DisplayPieceJ
            toggleModalFile={isModalFileOpen}
            TaskId={taskId}
            hundlePieceJointChange={hundlePieceJointChange}
          ></DisplayPieceJ>
        </Div>

        <ResponsiveDialog
          open={openDialog}
          setOpen={setOpenDialog}
          buttonText="Delete"
          dialogTitle="Delete Team Member"
          dialogContent={`Are you sure you want to delete ${selectedMember?.name}?`}
          agreeText="Delete"
          disagreeText="Cancel"
          onAgree={handleConfirmDelete}
          onDisagree={() => setOpenDialog(false)} // Close the dialog on cancel
        />
      </Div>
    </ReactModal>
  );
};

export default TaskModal;
