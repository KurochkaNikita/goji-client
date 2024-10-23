import { memo, MouseEvent } from "react";
import { ListItemIcon, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MUIListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { TGroceryList, TGroceryListItem } from "types/grocery";

import SettingAction from "components/SettingAction";
import queryKey from "constants/query";

interface IListItem {
  id: string;
  title: string;
  amount: number;
  completed: boolean;
  handleOpenActions: (
    itemId: string
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
}

function ListItem(props: IListItem) {
  const { id, completed, amount, title, handleOpenActions } = props;
  const queryClient = useQueryClient();
  const key = `${id}-checkbox-${completed}`;
  const textDecoration = completed ? "line-through" : "none";

  const data = queryClient.getQueryData([
    `${queryKey.lists}/${id}`,
  ]) as TGroceryList;
  const { list } = data ?? { list: [] };

  const updateItemsMutation = useMutation({
    mutationKey: [`${queryKey.lists}/${id}`],
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
    <Paper elevation={2}>
      <MUIListItem
        secondaryAction={<SettingAction onClick={handleOpenActions(id)} />}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": key }}
            onClick={checkedItem(id)}
          />
        </ListItemIcon>
        <ListItemText
          id={key}
          primary={<div style={{ textDecoration }}>{title}</div>}
          secondary={amount !== 0 ? amount : undefined}
        />
      </MUIListItem>
    </Paper>
  );
}

export default memo(
  ListItem,
  (prevProps, nextProps) => prevProps.id === nextProps.id
);
