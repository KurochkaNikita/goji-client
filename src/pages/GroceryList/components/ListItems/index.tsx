import { MouseEvent } from "react";
import { useParams } from "next/navigation";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { TGroceryList, TGroceryListItem } from "types/grocery";

import queryKey from "constants/query";

import ListItem from "../ListItem";

interface IListItems {
  handleOpenActions: (
    itemId: string
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
}

function ListItems(props: IListItems) {
  const queryClient = useQueryClient();
  const { handleOpenActions } = props;

  const params = useParams<{ id: string }>();
  const { id } = params || { id: "" };

  const { data } = useQuery<TGroceryList>({
    queryKey: [`${queryKey.lists}/${id}`],
  });

  const { list } = data ?? { list: [] };

  const updateItemsMutation = useMutation({
    mutationKey: [`${queryKey.lists}/${id}`],
    mutationFn: (newList: TGroceryListItem[]) =>
      groceryAPI.updateListItems(id, newList),
    onSuccess: (newValue: TGroceryList) => {
      queryClient.setQueryData(
        [`${queryKey.lists}/${id}`],
        (old: TGroceryList) => ({
          ...old,
          list: Array.isArray(newValue?.list) ? newValue?.list : list,
        })
      );
    },
  });

  const checkedItem = (itemId: string) => () => {
    const currentState = queryClient.getQueryData<TGroceryList>([
      `${queryKey.lists}/${id}`,
    ]);

    const currentList = currentState?.list ?? [];

    const newLists: TGroceryListItem[] = currentList.map(
      (task: TGroceryListItem) => {
        if (task.id === itemId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }
    );
    updateItemsMutation.mutate(newLists);
  };

  return (
    <Grid size={12}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {list.map((task: TGroceryListItem) => (
          <ListItem
            key={task.id}
            id={task.id}
            completed={task.completed}
            amount={task.amount}
            title={task.title}
            handleOpenActions={handleOpenActions}
            checkedItem={checkedItem(task.id)}
          />
        ))}
      </List>
    </Grid>
  );
}

export default ListItems;
