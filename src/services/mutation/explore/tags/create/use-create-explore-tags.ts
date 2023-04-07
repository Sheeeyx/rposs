import { useMutation } from 'react-query';

import queryClient from '../../../../../configs/react-query.config';
import {request} from '../../../../api/api';



const useCreateExploreTags = () =>
  useMutation((data) =>
    request.private.post('explore/tags/', data).then((res) => res.data),
    {
      onMutate: () => {
          const tags = queryClient.getQueryData("explore-tags");

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          queryClient.setQueryData("explore-tags", (prev: any) => {
              if (!prev) return tags;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useCreateExploreTags;
