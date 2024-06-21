import React from 'react';
import styles from './style.module.scss';
import SideBar from '../../layouts/side_bar/side_bar';
import NavBar from '../../layouts/nav-Bar/navBar';
import ProjectManagerComp from '../../components/ProjectManagerComp/ProjectManagerComp';

const ProjectManagerPage = () => {
  return (
    <div className={styles.container}>
      <SideBar className={styles.sidebar} />
      <div className={styles.content}>
        <NavBar />
        <ProjectManagerComp />
      </div>
    </div>
  )
}

export default ProjectManagerPage
