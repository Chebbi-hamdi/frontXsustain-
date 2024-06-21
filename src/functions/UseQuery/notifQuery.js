import { useQuery } from "@tanstack/react-query";
import {  } from "../../api/Discution";
import { GetNotifs } from "../../api/notif";

const useNotifData = (id) => {

    const data = useQuery({
        queryFn: () =>  GetNotifs(id),
        queryKey: ["diUser"],
        enabled: true,
    });

    
    return data;
};

export { useNotifData };
