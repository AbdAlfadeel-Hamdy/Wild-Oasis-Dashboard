import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins';

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: FieldValues; id: number }) =>
      createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Successfully edited cabin');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}

export default useEditCabin;
