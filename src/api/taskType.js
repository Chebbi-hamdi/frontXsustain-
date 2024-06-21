import customAxios from '../axios/customAxios';

// const API_URL = "http://localhost:3000/api/v0/tasktypes";
const API_URL = "http://192.168.11.113:3000/api/v0/tasktypes";

const createTask = async (data) => {
  try {
    const taskData = {
      owner: data.userId,
      title: data.title,
      name: data.title,

      // endDate: data.selectedData.Size.description,
      SubBy: {
        owner: data.userId,
      },
      TaskType: data.selectedData,
      CommentImage: data.selctedImage,
      description: data.description || '', // Ensure description is a string
      ProjectId: data.ProjectId,
      ProjectId1: data.ProjectId1,
      imagePaths: data.imagePath,
      coverPhoto: data.imagePath,

    };

    console.log("Creating task...", taskData);
    const response = await customAxios.post(
      "http://192.168.11.113:3000/api/v0/tasks/create",
      taskData
    );

    console.log("Task created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Task creation error:", error);
  }
};
 export  const getAllTypes = async () => {
  try {
    console.log("Fetching tasks...");
    const response = await customAxios.get('http://192.168.11.113:3000/api/v0/tasktypes');
    const TasksData = response.data;
    return TasksData;
  } catch (error) {
    console.error("Tasks fetch error:", error);
  }
};

export  const getTypeByIs = async (id) => {
  try {
    console.log("Fetching task...");
    const response = await customAxios.get(`http://192.168.11.113:3000/api/v0/tasktypes/${id}`);
    console.log("+}}}}}}}}}}}}}}}}}}}}}}}}}}}+", response);
    return response.data;
  } catch (error) {
    console.error("Task fetch error:", error);
  }
};

const update = (id, data) => {
  return customAxios.put(`${API_URL}/${id}`, data);
};

const remove = (id) => {
  return customAxios.delete(`${API_URL}/${id}`);
};

const removeAll = () => {
  return customAxios.delete(API_URL);
};

const findByTitle = (title) => {
  return customAxios.get(`${API_URL}?title=${title}`);
};

const taskTypeApi = {
  getTypeByIs,
  createTask,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default taskTypeApi;
