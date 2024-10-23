import { useParams } from "next/navigation";
import IconRemove from "@mui/icons-material/Delete";
import IconEdit from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { TGroceryList, TGroceryListItem } from "types/grocery";

import queryKey from "constants/query";

interface IActions {
  itemId?: string;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  editItem: () => void;
  isOpen: boolean;
}

function Actions(props: IActions) {
  const { isOpen, anchorEl, handleClose, itemId, editItem } = props;
  const params = useParams<{ id: string }>();
  const { id } = params || { id: "" };
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([
    `${queryKey.lists}/${id}`,
  ]) as TGroceryList;
  const { list } = data;

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

  const removeItem = () => {
    const newLists = list.filter((task) => task.id !== itemId);
    updateItemsMutation.mutate(newLists);
    handleClose();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={editItem}>
        <ListItemIcon>
          <IconEdit fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={removeItem}>
        <ListItemIcon>
          <IconRemove fontSize="small" />
        </ListItemIcon>
        Remove
      </MenuItem>
    </Menu>
  );
}

export default Actions;
