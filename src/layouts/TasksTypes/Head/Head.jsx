import { useEffect, useState } from "react";
import Dropdown from "./Dropdown"; // Import Dropdown component
import styles from "./style.module.scss";
import { div } from "../../../drawables/Divs/Div_Param";
import DRAW from "../../../assets/images/draww.png";
import {
  useGetTypes,
  useGetTypesById,
} from "../../../functions/UseQuery/getTypesTasks";
import { useParams } from "react-router-dom";
import LoaderSpin from "../../../drawables/loader/LoaderSpin";

const Head = ({ setSelectedData }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const { userId, taskId } = useParams();
  const [Id, setId] = useState(taskId);
  const { data: data1, refetch } = useGetTypesById(Id);
  const { data } = useGetTypes();

  useEffect(() => {
    setSelectedData(selectedOptions);
  }, [selectedOptions, setSelectedData]);

  useEffect(() => {
    if (Id) {
      refetch(Id);
      console.log("data1", data1);
    }
  }, [Id, refetch]);

  if (!data1 || !data) {
    return <LoaderSpin />;  }

  return (
    <div height={"100%"} width={"100%"} className={styles.FlexMain}>
      <div className={styles.DivContainer} style={{ width: "20%" }}>
        <div className={styles.DivItem1}>
          <Dropdown
            task={"TaskType"}
            cards={data?.map((item, i) => ({
              id: item?._id,
              title: item?.content,
              description: item?.title,
              image: item?.image,
            }))}
            selectedOption={selectedOptions["TaskType"]}
            onOptionSelect={(selectedOption) => {
              setSelectedOptions((prev) => ({
                ...prev,
                TaskType: selectedOption,
                title: selectedOption,
              }));
              setId(selectedOption.id);
            }}
          />
        </div>
      </div>

      <div className={styles.DivContainer} style={{ width: "75%" }}>
        {data1?.subtasks?.map((subtask, index) => {
          const width = 100 / data1?.subtasks?.length;
          return (
            <div
              className={styles.DivNav}
              key={index}
              style={{ width: `${width}%` }}
            >
              <div className={styles.DivItem}>
                <Dropdown
                  task={subtask?.title}
                  cards={subtask?.SubSubtask?.map((subSubtask, i) => ({
                    id: subSubtask?._id,
                    title: subSubtask?.title,
                    description: subSubtask?.content,
                    image: subSubtask?.image,
                  }))}
                  selectedOption={selectedOptions[subtask.title]}
                  onOptionSelect={(selectedOption) =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [subtask.title]: selectedOption,
                    }))
                  }
                />
              </div>
            </div>
          );
        })}
        <img src={DRAW} alt="draw" className={styles.Draw} />
      </div>
    </div>
  );
};

export default Head;