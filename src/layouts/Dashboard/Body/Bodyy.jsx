import React from "react";
import styles from "./style.module.scss";
import { Div } from "../../../drawables/Divs/Div_Param";
import Flex from "../../../drawables/Flex/center/FlexCenter";
import ProfileInfoCard from "../../../drawables/cards/Dashboard/Tasks/ProfileCard/ProfileInfoCard";
import Review from "../../../drawables/cards/Dashboard/Tasks/QueueReview/ReadyToReview/Review";
import Queue from "../../../drawables/cards/Dashboard/Tasks/QueueReview/Queue/Queue";
import NewTask from "../../../drawables/cards/Dashboard/Tasks/NewTask/NewTask";
import Draft from "../../../drawables/cards/Dashboard/Draft_Resume/Draft/Draft";
import Resume from "../../../drawables/cards/Dashboard/Draft_Resume/Resume/Resume";
import { useSelector } from "react-redux";
import { useTasks, useTask } from "../../../functions/UseQuery/TaskQuery";
import { useState, useEffect } from "react";
import LoaderSpin from "../../../drawables/loader/LoaderSpin";
const Bodyy = () => {
  const user = useSelector((state) => state.token.user); // Assuming user data is stored under 'user' key in persistedReducer
  const [todoProgressLength, setTodoProgressLength] = useState(0);
  const [reviewLength, setReviewLength] = useState(0);
  const userId = user ? user._id : "";
  console.log("userId", user);
  const { Tasks, isLoading } = useTasks(userId);
  



  useEffect(() => {
    let todoProgressCount = 0;
    let reviewCount = 0;

    if (Array.isArray(Tasks)) {
      Tasks.map((task) => {
        if (task.collections === "todo" || task.collections === "progress") {
          todoProgressCount++;
        } else if (task.collections === "review") {
          reviewCount++;
        }
      });
    }

    setTodoProgressLength(todoProgressCount);
    setReviewLength(reviewCount);
  }, [Tasks]);

  console.log("Tasks", Tasks);
  console.log("todoProgressLength", todoProgressLength);
  console.log("reviewLength", reviewLength);


  if(isLoading) return <LoaderSpin />;

  return (
    <Div height={"100%"} width={"100%"} className={styles.MainCardBodyDash}>
      <Flex height={"100%"} width={"100%"} className={styles.FlexMain}>
        <Flex height={"20%"} width={"100%"} className={styles.Tasks}>
          <Div height={"98%"} width={"25%"} className={styles.ProfileInfoCard}>
            <ProfileInfoCard Name={user.name} />
          </Div>
          <Div height={"98%"} width={"25%"} className={styles.Review}>
            <Review NbrTasks={reviewLength} />
          </Div>
          <Div height={"98%"} width={"25%"} className={styles.Queue}>
            <Queue NbrTasks={todoProgressLength} />
          </Div>
          <Div height={"98%"} width={"25%"} className={styles.NewTask}>
            <NewTask />
          </Div>
        </Flex>
        <Flex height={"80%"} width={"100%"} className={styles.Others}>
          <Div height={"90%"} width={"30%"} className={styles.DraftResume}>
            <Draft />
          </Div>
          <Div height={"90%"} width={"68%"} className={styles.Request}>
            <Resume />
          </Div>
        </Flex>
      </Flex>
    </Div>
  );
};

export default Bodyy;
