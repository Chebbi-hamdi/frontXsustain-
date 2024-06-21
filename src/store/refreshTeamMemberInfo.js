import { useDispatch } from 'react-redux';
import { setTeam } from './TeamSlice'; // Ensure the path is correct

const useRefreshTeamMem = (teamData) => {
  const dispatch = useDispatch();

  const refreshTeam = () => {
    if (teamData) { // Check teamData inside the function
      dispatch(setTeam(teamData));
    }
  };

  return refreshTeam;
};

export default useRefreshTeamMem;
