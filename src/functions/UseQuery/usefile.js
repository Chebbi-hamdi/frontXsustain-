import { useQuery } from "@tanstack/react-query";
import { GetLink } from "../../api/ReferFriend";

export const UseLink = () => {
    const { data:Link, isLoading ,refetch} = useQuery({
      queryFn: () => GetLink(),
      queryKey: ['Link']
      
    });
    return { Link, isLoading,refetch};
  };
