import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import MUIModal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { ListItemForm, TGroceryList, TGroceryListItem } from "types/grocery";

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
  const data = queryClient.getQueryData([`lists/${id}`]) as TGroceryList;
  const { list } = data;

  const defaultFormValue = list.find((task) => task.id === itemId);

  const updateItemsMutation = useMutation({
    mutationKey: [`lists/${id}`],
    mutationFn: (newList: TGroceryListItem[]) =>
      groceryAPI.updateListItems(id, newList),
    onSuccess: (newValue: TGroceryList) => {
      queryClient.setQueryData([`lists/${id}`], (old: TGroceryList[]) => ({
        ...old,
        list: newValue.list,
      }));
    },
  });

  const handlerItem = (values: ListItemForm) => {
    let newLists: TGroceryListItem[] = [...list];
    if (itemId) {
      newLists = newLists.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            title: values.title as string,
            amount: (values.amount ?? 0) as number,
          };
        }
        return item;
      });
    } else {
      newLists.push({
        id: crypto.randomUUID(),
        title: values.title as string,
        amount: (values.amount ?? 0) as number,
        completed: false,
      });
    }
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
      <>
        <Box sx={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {itemId ? "Create a new item" : "Update the task"}
          </Typography>
        </Box>
        {open && (
          <Form
            title={defaultFormValue?.title ?? ""}
            amount={defaultFormValue?.amount ?? 0}
            handlerForm={handlerItem}
          />
        )}
      </>
    </MUIModal>
  );
}

export default Modal;
