import React, { useState } from 'react';
import styles from './style.module.scss';

import Container from '../../../drawables/containers/container';
import Headerr from "../../../drawables/cards/Discution/Body/Header/Header"
import Bodyy from "../../../drawables/cards/Discution/Body/Body/Bodyy"

const Corps = ({ selectedItem}) => {

  return (
    <Container  width={"100%"} className={styles.MainCardB}>
      <Headerr selectedItem={selectedItem} />
      <Bodyy  selectedItem={selectedItem}  />
    </Container>
  )
}

export default Corps
