import React, { useState } from 'react';
import styles from './style.module.scss';
import NavBar from "../../layouts/nav-Bar/navBar"
import SideBar from  "../../layouts/Discution/Side_Bar/SideBar"
import Bodyy from  "../../layouts/Discution/Body/BodyMsg"

const Discution = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    if(!item){
      return;
    }
    setSelectedItem(item);
  }

  return (
    <div className={styles.container}>
      <SideBar className={styles.sidebar} onSelect={handleSelectItem} />
        <div className={styles.content} >
        <NavBar selectedItem={selectedItem} />
        <Bodyy  selectedItem={selectedItem} />
        </div>
    </div>
  );
}

export default Discution;
