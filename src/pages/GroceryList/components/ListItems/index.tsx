import { MouseEvent } from "react";
import { useParams } from "next/navigation";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import { useQueryClient } from "@tanstack/react-query";
import { TGroceryList, TGroceryListItem } from "types/grocery";

import queryKey from "constants/query";

import ListItem from "../ListItem";

interface IListItems {
  handleOpenActions: (
    itemId: string
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
}

function ListItems(props: IListItems) {
  const { handleOpenActions } = props;
  const queryClient = useQueryClient();

  const params = useParams<{ id: string }>();
  const { id } = params || { id: "" };

  const data = queryClient.getQueryData([
    `${queryKey.lists}/${id}`,
  ]) as TGroceryList;
  const { list } = data;

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
          />
        ))}
      </List>
    </Grid>
  );
}

export default ListItems;
