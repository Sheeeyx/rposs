import { useMutation } from "react-query";
import queryClient from "../../../../../../configs/react-query.config";
import { request } from "../../../../../api/api";

interface FaqTypes {
    id: any;
}

const useDeleteItHasTags = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete<FaqTypes>(`/food_dining/it_has/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const tags = queryClient.getQueryData("it-has");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("it-has", (prev: any) => {
                    if (!prev) return tags;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteItHasTags;
