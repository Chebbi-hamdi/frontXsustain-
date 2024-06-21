import React from "react";
import styles from "./style.module.scss";
import Draw from "../../assets/images/draw.png";
import { Div } from "../../drawables/Divs/Div_Param";
import SearchBarTask from "../../drawables/SearchInput/SearchBar";
import back from "../../assets/images/back.png";
import Draw1 from "../../assets/images/draw1.png";
import { useState } from "react";
import CardItems from "../../drawables/CardsTypes/CardItem/CardItems";
import { useSelector } from "react-redux";
import { getUser } from "../../store/tokenSlice";
import { useNavigate } from "react-router-dom";
import { useGetTypes } from "../../functions/UseQuery/getTypesTasks";
import LoaderSpin from "../../drawables/loader/LoaderSpin";

const TaskTypes = () => {
  const navigate = useNavigate();
  const { user } = useSelector(getUser);
  const { data } = useGetTypes();


  const onCardClick = (id) => {
    console.log("TaskId", id);
    console.log("About to navigate");
    navigate(`/taskhome/${user._id}/${id}`);
  };

  // Check if data is available
  if (!data) {
    return <LoaderSpin />;  }
  const getBack = ()=>{
    navigate("/dash");
  }
    

  return (
    <Div height={"90%"} width={"100%"} className={styles.MainCardD}>
      <Div width="95%" height={"20%"} className={styles.Header}>
        <img src={Draw} alt="mm" className={styles.Draw}></img>
        <Div className={styles.SearchBar}>
          <img src={back} alt="Go Back" className={styles.backImg} onClick={getBack}/>
          <Div>
            <SearchBarTask
              className={styles.SearchBar0}
            />
          </Div>
        </Div>
      </Div>

      <Div width={"95%"} height={"80%"} className={styles.Bodyy}>
        <Div height={"50%"} width={"100%"} className={styles.CardsContainer}>
          <Div height={"50%"} width={"90%"} className={styles.CardsContainer1}>
            {data.map((task) => (
              <CardItems
                key={task._id}
                Height={"50%"}
                Width={""}
                image={task.image}
                Title={task.content}
                onclick={() => onCardClick(task._id)}
                />
            ))}
          </Div>
        </Div>
      </Div>
      <Div width={"100%"} height={"10%"} className={styles.Footer}>
        <img className={styles.draw} src={Draw1} alt=""></img>
      </Div>
    </Div>
  );
};

export default TaskTypes;