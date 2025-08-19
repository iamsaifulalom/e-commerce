import { useQuery } from "@tanstack/react-query";
import { getParentsCategories , getChildCategories} from "../api/category";

export function useParentCategories() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["parentCat"],
        queryFn: getParentsCategories,
    });

    return { data: data || [], isLoading, error };
}

// get child cagetories
export function useChildCategories(id) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["childCat"],
        queryFn: ()=> getChildCategories(id),
    });

    return { data: data || [], isLoading, error };
}
