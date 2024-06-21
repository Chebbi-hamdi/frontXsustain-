import { useQuery } from '@tanstack/react-query'; // or import it from wherever it's defined
import { DisplayComments } from '../../api/Tasks';

const useCommentsData = (idTask,Comment, Sender) => {
  const { data: Comments, isLoading } = useQuery({
    queryFn: () => DisplayComments(idTask,Comment, Sender),
    queryKey: ["members"]
  });

  return { Comments, isLoading };
};

export default useCommentsData;
