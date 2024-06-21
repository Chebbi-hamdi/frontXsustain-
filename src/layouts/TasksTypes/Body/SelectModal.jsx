import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cropper from "cropperjs";
import styles from "./SelectModal.module.scss";
import "cropperjs/dist/cropper.css";
import Close from "../../../assets/images/close.svg";
import Select from "../../../assets/images/select.svg";
import "./CropperModal.css";

const SelectModal = ({ selectedFile, setShowDiv, commentImageData }) => {
  const imageRef = useRef(null);
  let cropper = null;

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [position, setPosition] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploaded, setImageUploaded] = useState(null);
  const [commentResponse, setCommentResponse] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  // const handleUpload = () => {
  //     if (imageUploaded) {
  //       const formData = new FormData();
  //       formData.append('image', imageUploaded);
  //       axios.post('http://192.168.11.113:3000/api/v0/image/', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       })
  //       .then((res) => {
  //         setImageUrl(`http://192.168.11.113:3000/uploads/${res.data}`)
  //         axios.post('http://192.168.11.113:3000/api/v0/comment/', { image: `http://192.168.11.113:3000/uploads/${res.data}` }).then((res) => {
  //           console.log('ressssss', res.data);
  //           setCommentResponse(res.data);
  //         }
  //         ).catch((err) => {
  //           console.error(err);
  //         });

  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //     }
  //   };

  // const handleImageChange = (e) => {
  //   setImageUrl('');
  //   setImageUploaded(e.target.files[0]);
  // };

  useEffect(() => {
    setCommentResponse(commentImageData);
    console.log("commentImageData", commentImageData);
  }, [commentImageData, setCommentResponse]);

  const createCropper = () => {
    cropper = new Cropper(imageRef.current, {
      aspectRatio: 0,
      background: false,
      zoomable: false,

      crop(event) {
        setPosition(event.detail);
      },
      cropend() {
        setShowCommentBox(true);
      },
    });
  };

  useEffect(() => {
    if (selectedFile && isCropperOpen) {
      if (imageRef.current) {
        const handleImageLoad = () => {
          if (!showCommentBox && !cropper) {
            createCropper();
          }
        };
        imageRef.current.addEventListener("load", handleImageLoad);

        return () => {
          if (imageRef.current) {
            imageRef.current.removeEventListener("load", handleImageLoad);
          }
        };
      }
    }
  }, [
    showCommentBox,
    selectedFile,
    imageRef.current,
    imageUrl,
    imageUploaded,
    isCropperOpen,
  ]);
  const handleCommentSubmit = () => {
    if (commentResponse === null) {
      console.log("selectedFilekjnlkjj,l444444444444", commentResponse);
      console.error("No comment response");
      return;
    }
    const data = {
      image: imageUrl,
      comment,
      position,
    };
    console.log("dakkkkkkkkkta", commentResponse);
    axios
      .put(`http://192.168.11.113:3000/api/v0/comment/${commentResponse?._id}`, data)
      .then((res) => {
        console.log("ressssss", res.data);
        setCommentResponse(res.data);
        // sendingData(res.data)
      })
      .catch((err) => {
        console.error(err);
      });

    setShowCommentBox(false);
    setComment("");
  };
  const handleButtonClick = () => {
    if (isCropperOpen) {
      // Close the cropper
      setShowDiv(false);
      // Destroy the Cropper instance
      if (cropper) {
        cropper.destroy();
        cropper = null;
      }
    } else {
      // Open the cropper
      setShowDiv(true);
      // If the image is already loaded, create the Cropper instance
      if (imageRef.current && imageRef.current.complete) {
        createCropper();
      }
    }

    // Toggle the state
    setIsCropperOpen(!isCropperOpen);
  };
  return (
<div className={styles.ModalContainer}>
      {/* <div className={styles.ButtonContainer}>
        <input
          type="file"
          
          onChange={handleImageChange}
        />
        <button
          style={{
            width: '100px',
            height: '40px',
            backgroundColor: 'blue',
            color: 'white',
            cursor: 'pointer',
            marginTop: '20px',
          }}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div> */}
      {selectedFile && (
        <div
          className={styles.ImageContainer}
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   border: "2px solid #2468FF",
          //   borderRadius: "7px",
          //   padding: "10px",
          // }}
        >
          {isCropperOpen ? (
            <img src={Close} alt="Close" className={styles.CloseButton} onClick={handleButtonClick} />

          ) : (
            <img src={Select} alt="Select" className={styles.SelectButton} onClick={handleButtonClick} />

          )}
          <img
            ref={imageRef}
            src={selectedFile}
            alt="Uploaded Image"
            width="100%"
            height={500}
          />
        </div>
      )}
      {showCommentBox && position && (
        <div
          style={{
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,

            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #00000026",

            borderRadius: "11px",
            height: "230px",
            width: "495px",
            padding: "0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Change This face and make it smaller"
            style={{
              resize: "none",
              height: "160px",
              width: "100%",

              borderBottom: "2px solid #00000042",
              borderRadius: "11px 11px 0px 0px",
              padding: "20px",
              // border: "1px solid #00000042",
              // borderRadius: "11px",
              // padding: "10px",
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <button
              onClick={() => setShowCommentBox(false)}
              className={styles.Btn_Cancel}
            >
              Cancel
            </button>
            <button onClick={handleCommentSubmit} className={styles.Btn_Save}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectModal;
