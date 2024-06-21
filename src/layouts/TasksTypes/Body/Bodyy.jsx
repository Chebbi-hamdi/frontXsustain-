import React from "react";
import { Div } from "../../../drawables/Divs/Div_Param";
import Flex from "../../../drawables/Flex/center/FlexCenter";
import Draw from "../../../assets/images/draw1.png";
import styles from "./Bodyy.module.scss";
import add from "../../../assets/images/add-square.svg";
import logo from "../../../assets/images/minipanda.svg";
import { useState, useRef, useEffect } from "react";
import SelectModal from "./SelectModal";
import axios from "axios";
import "cropperjs/dist/cropper.css";

import PreviewModal from "./PreviewModal";
import Close from "../../../assets/images/close.svg";

const Bodyy = ({ setSelctedImage, setDirection }) => {
  const [showModal, setShowModal] = useState(false);
  const [commentResponse, setCommentResponse] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [position, setPosition] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploaded, setImageUploaded] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [directions, setDirections] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [imageSel, setImageSel] = useState("");
  const [images, setImages] = useState([]);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  // const combined = [...directions, ...images];
  const [combined, setCombined] = useState([]);



  const fileInputRef = useRef();
  const [commentImageData, setcommentImageData] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);


  useEffect(() => {
    setCombined([...directions, ...images]);
  }, [directions, images]);
  
  useEffect(() => {
    setSelctedImage(commentResponse);
    setDirection(combined);
    console.log(
      "-----------------combined------------------",
      combined
    );
  }, [commentResponse, setSelctedImage, setDirection, combined]);

  const handleFileChange = () => {
    fileInputRef.current.click();
  };

  const handleUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append("image", file);
      axios
        .post("http://localhost:3000/api/v0/image/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setSelectedFiles((prevFiles) => [
            ...prevFiles,
            `http://localhost:3000/images/${res.data}`,
          ]);

          console.log("selectedFiles**************************", selectedFiles);
          axios
            .post("http://localhost:3000/api/v0/comment/", {
              image: `http://localhost:3000/images/${res.data}`,
            })
            .then((res) => {
              console.log("ressssssult comment", res.data);
              setCommentResponse(res.data);
              setImages((prevImages) => [...prevImages, res.data]);
              setcommentImageData(res.data);
              setCurrentFile(`http://localhost:3000/images/${res.data.image}`);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };



  const handleImageChange = (file) => {

    setShowSelectModal(true);
    setShowPreviewModal(false);
    setCurrentFile(file);
    setShowDiv(true);
  };
  const handleAddDirection = () => {
    setDirections([...directions, inputValue]);
    console.log("directions", directions);
    console.log("inputValue", inputValue);
    console.log("combined", combined);

    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handlePreviewModal = (item) => {
    console.log("Images---", item);
   
    setShowDiv(true);
    setShowPreviewModal(true);
    setShowSelectModal(false);
    setPreviewImage(item);
  };

  const handleButtonClose = () => {
    setShowDiv(false);
    setShowPreviewModal(false);
  };

  return (
    <Div height={"100%"} width={"100%"} className={styles.MainCardBodyDash}>
      <Flex height={"100%"} width={"100%"} className={styles.FlexMain}>
        <Div height={"100%"} width={"20%"} className={styles.SideMain}>
          <div className={styles.SideContainer}>
            <div className={styles.TextContainer}>
              <h1 className={styles.Text}>Media</h1>
              <p className={styles.Text1}>
                Upload images Or files and use our shango tool to better
                undrestand direction fo your design
              </p>
            </div>
            <div className={styles.ImageContainer}>
              {selectedFiles.slice(0, 4).map((file, index) => (
                <img
                alt="11"
                  key={index}
                  src={file}
                  onClick={() => handleImageChange(file)}
                />
              ))}
            </div>

            <div className={styles.BoxContainer}>
              <div className={styles.Box1} onClick={handleFileChange}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 15V10M10 10L7.50001 11.6667M10 10L12.5 11.6667M10.8333 2.50072C10.7538 2.5 10.6644 2.5 10.5623 2.5H6.8335C5.90008 2.5 5.43302 2.5 5.0765 2.68166C4.7629 2.84144 4.50812 3.09623 4.34833 3.40983C4.16667 3.76635 4.16667 4.23341 4.16667 5.16683V14.8335C4.16667 15.7669 4.16667 16.2334 4.34833 16.5899C4.50812 16.9035 4.7629 17.1587 5.0765 17.3185C5.43268 17.5 5.89918 17.5 6.83079 17.5L13.1692 17.5C14.1008 17.5 14.5667 17.5 14.9228 17.3185C15.2364 17.1587 15.4921 16.9035 15.6519 16.5899C15.8333 16.2337 15.8333 15.7679 15.8333 14.8363V7.7714C15.8333 7.66913 15.8333 7.57967 15.8326 7.5M10.8333 2.50072C11.0714 2.50289 11.222 2.51154 11.3657 2.54605C11.5358 2.58688 11.6982 2.65439 11.8473 2.74577C12.0155 2.8488 12.1599 2.99318 12.4479 3.28125L15.0525 5.88582C15.3407 6.17407 15.4841 6.3178 15.5871 6.48599C15.6785 6.63512 15.7461 6.79771 15.787 6.96777C15.8214 7.11147 15.8303 7.26209 15.8326 7.5M10.8333 2.50072V4.83333C10.8333 5.76675 10.8333 6.23314 11.015 6.58966C11.1748 6.90326 11.4296 7.15873 11.7432 7.31852C12.0993 7.5 12.5658 7.5 13.4974 7.5H15.8326M15.8326 7.5H15.8335"
                    stroke="#2468FF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={styles.BoxText1}>Upload Files</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleUpload}
              />
            </div>
          </div>
          <div className={styles.DrawContainer}>
            <img src={Draw} alt="Draw" className={styles.Draw} />
          </div>
        </Div>
        <hr className={styles.Line} />

        {showDiv && (
          <Div height={"100%"} width={"42%"} className={styles.SelectModal}>
            {showSelectModal && (
              <SelectModal
                selectedFile={currentFile}
                setShowDiv={setShowDiv}
                commentImageData={commentImageData}
              />
            )}

            {showPreviewModal && (
              <div className={styles.PreviewModalContainer}>
                <img
                  src={Close}
                  alt="Close"
                  className={styles.CloseButton}
                  onClick={handleButtonClose}
                />
                <PreviewModal commentImageData={previewImage} />
              </div>
            )}
          </Div>
        )}
        <Div
          height={"100%"}
          width={showDiv ? "40%" : "80%"}
          className={styles.ContentMain}
        >
          <div className={styles.TextContainer1}>
            <h1 className={styles.Text}>Directions</h1>
            <p className={styles.Text1}>
              Type general directions for your designer below you can also click
              the “+” to aad exact copy and leverage our built in ai tools to
              assist with your creative breif
            </p>
          </div>
          <Div className={styles.InputContainer}>
            <img
              src={add}
              alt="Draw"
              className={styles.Add}
              onClick={handleAddDirection}
            />
            <input
              type="text"
              placeholder="Start typing general direction"
              className={styles.Input}
              value={inputValue}
              onChange={handleInputChange}
            />
          </Div>
          <Div className={styles.RadioButtonContainer}>
            {combined.map((item, index) => (
              <Div className={styles.RadioButtonCon} key={index}>
                <div className={styles.RadioButtonContainer1}>
                  {/* <input
                    type="radio"
                    id={`direction${index + 1}`}
                    name="direction"
                    value={item}
                    className={styles.RadioButton}
                  /> */}
                  {index >= directions.length && (
                    <div className={styles.UploadContainer}>
                      <label
                        htmlFor={`direction${index + 1}`}
                        className={styles.RadioButtonText}
                      >
                        {`- Direction ${index + 1} :`}
                      </label>
                      <img
                        src={item.image}
                        alt="upload"
                        className={styles.UploadImage}
                        onClick={(e)=>{handlePreviewModal(item)}}
                      />
                    </div>
                  )}
                  {index < directions.length && (
                    <label
                      htmlFor={`direction${index + 1}`}
                      className={styles.RadioButtonText}
                    >
                      {`- Direction ${index + 1} :`}
                    </label>
                  )}
                </div>
                {index < directions.length && (
  <div className={styles.DirectionText}>{typeof item === 'string' ? item : item.image}</div>
)}
              </Div>
            ))}
          </Div>
          <Div className={styles.CopyRight}>
            <p>
              @ 2024, Made by{" "}
              <span className={styles.XSUSTAIN}> XSUSTAIN.</span>
              <img src={logo} alt="logo" /> for a New Future
            </p>
          </Div>
        </Div>
      </Flex>
    </Div>
  );
};

export default Bodyy;