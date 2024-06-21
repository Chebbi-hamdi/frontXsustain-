import { useQuery } from '@tanstack/react-query'; // or import it from wherever it's defined
import { GetTeamMembers,GetTeamImg, GetParticipantsInfos } from '../../api/TeamMembers';
import { useState } from 'react';

export const useTeamData = (userId,teamData) => {
  const { data, isLoadingg,isLoading, refetch } = useQuery({
    queryKey: ['Team'],
    queryFn: () => GetTeamMembers(userId)
    // You can add other options here, such as cacheTime, staleTime etc.
  }
);

  return { Team: data, isLoadingg,isLoading, refetch }; // Include refetch function in the return object
};
export const useTeammateInfo = (taskId) => {
  const { data:TeamInfo, isLoading ,refetch} = useQuery({
    queryFn: () => GetParticipantsInfos(taskId),
    queryKey: [taskId]
    
  });
  return { TeamInfo, isLoading,refetch};
};
export const useTaskInfo = (taskId) => {
  const { data:task, isLoading1 ,refetch1} = useQuery({
    queryFn: () => GetParticipantsInfos(taskId),
    queryKey: [taskId]
    
  });
  return { task, isLoading1,refetch1};
};
export const useTeammateImg = (taskId) => {
  const { data: Imgs, isLoadingg } = useQuery({
    queryFn: () => GetTeamImg(taskId),
    queryKey: ["taskId"]
  });
  return { Imgs, isLoadingg };
};

export const useTeamDatameminfo = (userID) => {
  const { data: teamData, isLoading, refetch } = useQuery({
    queryKey: ['Team'],
    queryFn: () => GetTeamMembers(userID),
    // You can add other options here, such as cacheTime, staleTime etc.
  });

  return { Team: teamData, isLoading, refetch };
};
