// src/hooks/useProject.js
import { useQuery } from "@tanstack/react-query";
import { GetProject } from "../../api/project";

const useProject = (userId) => {
  const { data: Projects, isLoading, isError, error } = useQuery({
    queryFn: () => GetProject(userId),
    queryKey: ["Project", userId],
  });
  return { Projects, isLoading, isError, error };
};

export { useProject };