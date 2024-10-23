import MUIList from "@mui/material/List";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { TGroceryList } from "types/grocery";

import queryKey from "constants/query";

import GroceryListItem from "../ListItem";

function List() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([queryKey.lists]) as TGroceryList[];

  const removeListMutation = useMutation({
    mutationKey: [queryKey.lists],
    mutationFn: (id: string) => groceryAPI.removeList(id),
    onSuccess: (newValue: TGroceryList) => {
      queryClient.setQueryData([queryKey.lists], (old: TGroceryList[]) =>
        old.filter((item) => item.id !== newValue.id)
      );
    },
  });

  return (
    <MUIList style={{ width: "100%" }}>
      {data?.map((item: TGroceryList) => (
        <GroceryListItem
          key={item.id}
          item={item}
          onClick={() => removeListMutation.mutate(item.id)}
        />
      ))}
    </MUIList>
  );
}

export default List;
