import React, { useEffect, useState } from "react";
import Cont from "../../drawables/containers/container";
import styles from "./navbar.module.scss";
import SettingIcon from "../../assets/images/setting-2.svg";
import Bell from "../../assets/images/bell.svg";
import Bell2 from "../../assets/images/bellWithoutN.svg";
import flesh from "../../assets/images/Arrow_Down_LG.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useSelector } from "react-redux";
import { getUser } from "../../store/tokenSlice";
import { getSeen, getLast20Seen } from "../../store/notificationSlice"; // Import Redux actions and selectors
import BubleImg from "../../drawables/bubleimg/bubleImg";
import ModalNoitf from "./modalNoitf/modalNoitf";
import { getSocket } from "../../store/socketSlice";
import { useDispatch } from "react-redux";
import { getProfilePic } from "../../store/profile";
import { useGetNotifs } from "../../functions/UseQuery/NotifUseQuery";

const NavBar = ({ notifications }) => {
  const navigate = useNavigate();
  const { user } = useSelector(getUser);
  const seen = useSelector(getSeen);
  const last20Seen = useSelector(getLast20Seen);
  const { refetch: refetch1 } = useGetNotifs(user?._id);
  const socket = useSelector(getSocket);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/profile");
  };
  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleBellClick = () => {
    setOpenModal(!openModal);
  };
  useEffect(() => {
    refetch1();
  }, [socket, refetch1]);

  const updatedImage = useSelector(getProfilePic);

  return (
    <Cont className={styles.main_card11}>
      <Cont className={styles.container}>
        <Cont className={styles.inside}>
          <Cont className={styles.UserInfo}>
          <svg 
            viewBox="0 0 32 32"
            height="32"
            width="32"
             xmlns="http://www.w3.org/2000/svg"
             onClick={handlelogout}
             >
              <g>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z" />
              </g>
            </svg>
            {user?.imagePath === null || user?.imagePath === undefined ? (
              <BubleImg user={user} />
            ) : updatedImage === null || updatedImage === undefined ? (
              <img src={user?.imagePath} alt="" className={styles.ProfileImg} />
            ) : (
              <img src={updatedImage} alt="" className={styles.ProfileImg} />
            )}
            <Cont className={styles.Name_Plan}>
              <p className={styles.Name}>
                {user?.name}
                <img
                  onClick={handleClick}
                  src={flesh}
                  alt=""
                  className={styles.flesh}
                />
              </p>
              <p className={styles.Plan}>Basic Plan</p>
            </Cont>
       
          </Cont>
          {!last20Seen ? (
            <img
              className={styles.settingIm}
              src={Bell}
              alt=""
              onClick={handleBellClick}
            />
          ) : (
            <img
              className={styles.settingIm}
              src={Bell2}
              alt=""
              onClick={handleBellClick}
            />
          )}
          {openModal && <ModalNoitf setOpenModal={setOpenModal} />}{" "}
          {/* Render the modal if openModal is true */}
        </Cont>
      </Cont>
    </Cont>
  );
};

export default NavBar;
