import { useQuery } from "@tanstack/react-query";
import { GetDiscutions, GetConversation as fetchConversationAPI } from "../../api/Discution";
import { GetConversationLoad  } from "../../api/Discution";

const useConversation = (id) => {

    const data = useQuery({
        queryFn: () =>  fetchConversationAPI(id),
        queryKey: ["id_disc"],
        enabled: true,
    });

    
    return data;
};
const useConversationLoad = (id,LoadNumber) => {

    const data = useQuery({
        queryFn: () =>  GetConversationLoad(id,LoadNumber),
        queryKey: ["idconv"],
        enabled: true,
    });
    return data;
};
const useDsc= (id) => {

    const data = useQuery({
        queryFn: () =>  GetDiscutions(id),
        queryKey: ["dsccc"],
        enabled: true,
    });
    return data;
};

export { useConversation,useConversationLoad };


