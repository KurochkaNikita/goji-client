import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { ListItemForm } from "types/grocery";
import validation from "validation/grocery";

interface IForm {
  title: string;
  amount: number;
  handlerForm: (values: ListItemForm) => void;
}

function Form(props: IForm) {
  const { title, amount, handlerForm } = props;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation.groceryListItemForm),
    defaultValues: {
      amount,
      title,
    },
  });

  return (
    <FormControl fullWidth>
      <TextField
        required
        {...register("title")}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        margin="dense"
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
      />
      <TextField
        {...register("amount")}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        margin="normal"
        error={!!errors.amount}
        helperText={errors.amount?.message}
        fullWidth
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleSubmit(handlerForm)}
      >
        Save
      </Button>
    </FormControl>
  );
}

export default Form;
