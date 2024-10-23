import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { TGroceryList } from "types/grocery";

import queryKey from "constants/query";

function AddButton() {
  const queryClient = useQueryClient();

  const addListMutation = useMutation({
    mutationKey: [queryKey.lists],
    mutationFn: groceryAPI.addList,
    onSuccess: (newValue: TGroceryList) => {
      queryClient.setQueryData([queryKey.lists], (old: TGroceryList[]) => [
        ...old,
        newValue,
      ]);
    },
  });

  return (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      fullWidth
      size="large"
      onClick={() => addListMutation.mutate()}
    >
      Add new grocery list
    </Button>
  );
}

export default AddButton;
