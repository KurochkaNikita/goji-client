import { MouseEvent } from "react";
import { useParams } from "next/navigation";
import { ListItemIcon } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { TGroceryList, TGroceryListItem } from "types/grocery";

import SettingAction from "components/SettingAction";
import queryKey from "constants/query";

interface IListItems {
  handleOpenActions: (
    itemId: string
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
}

function ListItems(props: IListItems) {
  const { handleOpenActions } = props;
  const params = useParams<{ id: string }>();
  const { id } = params || { id: "" };
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([
    `${queryKey.lists}/${id}`,
  ]) as TGroceryList;
  const { list } = data;

  const updateItemsMutation = useMutation({
    mutationKey: [`lists/${id}`],
    mutationFn: (newList: TGroceryListItem[]) =>
      groceryAPI.updateListItems(id, newList),
    onSuccess: (newValue: TGroceryList) => {
      queryClient.setQueryData(
        [`${queryKey.lists}/${id}`],
        (old: TGroceryList[]) => ({
          ...old,
          list: newValue.list,
        })
      );
    },
  });

  const checkedItem = (itemId: string) => () => {
    const newLists: TGroceryListItem[] = list.map((task: TGroceryListItem) => {
      if (task.id === itemId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    updateItemsMutation.mutate(newLists);
  };

  return (
    <Grid size={12}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {list.map((task: TGroceryListItem) => {
          const key = `checkbox-${task.completed}-${task.id}`;
          const textDecoration = task.completed ? "line-through" : "none";
          return (
            <ListItem
              key={key}
              secondaryAction={
                <SettingAction onClick={handleOpenActions(task.id)} />
              }
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": key }}
                  onClick={checkedItem(task.id)}
                />
              </ListItemIcon>
              <ListItemText
                id={key}
                primary={<div style={{ textDecoration }}>{task.title}</div>}
                secondary={task.amount !== 0 ? task.amount : undefined}
              />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}

export default ListItems;
