import { useQuery } from '@tanstack/react-query'; // or import it from wherever it's defined
import { getUserByToken, getUserInfo, UpdateProfile } from '../../api/user';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/tokenSlice';

export const useProfileData = (userId) => {
  const { data: UserProfile, isLoading } = useQuery({
    queryFn: () => getUserInfo(userId),
    queryKey: ["UserProfile"]
  });
  return { UserProfile, isLoading };
};
export const useGetProfileByToken = (userId) => {
  
  const dispatch = useDispatch()

  const getUser = useQuery({
    queryFn:async () => {
      
      const response = await getUserByToken()

      if (!response)
        throw Error('User not found');
        dispatch(setUser(response))
      return response;
    
    },
    enabled:true,
    queryKey: ["UserProfileByToken"]
  });

  return getUser

};


