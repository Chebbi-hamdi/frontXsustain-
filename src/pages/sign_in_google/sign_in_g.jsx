import React from "react";
import LeftPart from "../../layouts/left_part/left_part";
import styles from "./style.module.scss";

const sign_in_g = () => {
  return (
    <div className={styles.main_box}>
      <LeftPart />
      <div className={styles.container}></div>
    </div>
  );
};

export default sign_in_g;
