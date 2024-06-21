import { useQuery} from "@tanstack/react-query";
import { getAllTypes, getTypeByIs } from "../../api/taskType";





export const useGetTypes = () => {
    const  data = useQuery({
        queryFn: () => getAllTypes(),
        queryKey: ["TpesTask"],
        enabled: true,
      
    });
    console.log(data,'dataaaaaaaaaa')
    return data;
  };
  export const useGetTypesById = (id) => {
    const  data = useQuery({
        queryFn: ()=> getTypeByIs(id),
        queryKey: ["TypesTask"],
        enabled: true,
      
    });
    console.log(data,'dataaaaaaaaaa')
    return data;
  };

