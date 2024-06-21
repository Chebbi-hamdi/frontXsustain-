import { useQuery } from "@tanstack/react-query";
import { GetLink, GetReferedFriends } from "../../api/ReferFriend";

export const FriendsRefs = () => {
    const { data:Friends, isLoadingg ,refetchh} = useQuery({
      queryFn: () => GetReferedFriends(),
      queryKey: ['Refss']
      
    });
    return { Friends, isLoadingg,refetchh};
  };
