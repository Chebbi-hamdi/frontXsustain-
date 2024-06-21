import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { GetNotifs } from "../../api/notif";
import { setNotification } from "../../store/notificationSlice";

export const useGetNotifs = (userId) => {
    const dispatch = useDispatch();

    const getNotifications = useQuery({
        queryFn: async () => {
            if (!userId) {
                // If userId is null or undefined, return an empty array
                return [];
            }
            const response = await GetNotifs(userId);
            if (!response) {
                throw Error('User not found');
            }
            dispatch(setNotification(response));
            return response;
        },
        enabled: !!userId, // Enable the query only if userId is truthy
        queryKey: ["notifQuery"]
    });

    return getNotifications;
};
