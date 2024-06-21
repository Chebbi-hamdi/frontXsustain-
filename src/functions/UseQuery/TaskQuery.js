import { useState, useEffect } from 'react';
import {  GetTasks,GetTask } from '../../api/Tasks'; // Adjust the import path according to your project structure
import { useQuery } from '@tanstack/react-query'; // or import it from wherever it's defined
const useTasks = (userId) => {
  const { data: Tasks, isLoading } = useQuery({
    queryKey: ["Tasks"],
    queryFn: () => GetTasks(userId)
  });
  return { Tasks, isLoading };
};

const useTask = (TaskId) => {
  const { data: Task, isLoading,refetch} = useQuery({
    queryKey: ["Tasks-one"],
    queryFn: () => GetTask(TaskId),
    enabled:false
  });
  return { Task, isLoading,refetch };
};



export { useTasks,useTask };
