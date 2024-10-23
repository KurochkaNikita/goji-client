import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import MUIModal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { ListItemForm, TGroceryList, TGroceryListItem } from "types/grocery";

import queryKey from "constants/query";

import Form from "./Form";
import classes from "./styles";

interface IModal {
  itemId?: string;
  open: boolean;
  onClose: () => void;
}

function Modal(props: IModal) {
  const { open, onClose, itemId = 0 } = props;
  const params = useParams<{ id: string }>();
  const { id } = params || { id: "" };

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([
    `${queryKey.lists}/${id}`,
  ]) as TGroceryList;
  const { list } = data;

  const defaultFormValue = list.find((task) => task.id === itemId);

  const updateItemsMutation = useMutation({
    mutationKey: [`${queryKey.lists}/${id}`],
    mutationFn: (newList: TGroceryListItem[]) =>
      groceryAPI.updateListItems(id, newList),
    onSuccess: (newValue: TGroceryList) => {
      queryClient.setQueryData(
        [`${queryKey.lists}/${id}`],
        (old: TGroceryList[]) => ({
          ...old,
          list: Array.isArray(newValue?.list) ? newValue?.list : list,
        })
      );
    },
  });

  const handlerItem = (values: ListItemForm) => {
    const { title = "", amount = 0 } = values;

    const updatedItem: TGroceryListItem = {
      id: itemId || crypto.randomUUID(),
      title,
      amount,
      completed: itemId
        ? list.find((item) => item.id === itemId)?.completed ?? false
        : false,
    };

    const newLists = itemId
      ? list.map((item) => (item.id === itemId ? updatedItem : item))
      : [...list, updatedItem];

    updateItemsMutation.mutate(newLists);
    onClose();
  };

  return (
    <MUIModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={classes.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {itemId ? "Create a new item" : "Update the task"}
        </Typography>
        {open && (
          <Form
            title={defaultFormValue?.title ?? ""}
            amount={defaultFormValue?.amount ?? 0}
            handlerForm={handlerItem}
          />
        )}
      </Box>
    </MUIModal>
  );
}

export default Modal;
