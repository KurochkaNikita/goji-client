import * as yup from "yup";

const groceryListItemForm = yup
  .object({
    title: yup
      .string()
      .test(
        "len",
        "Must be from 5 to 15",
        (val = "") => val.length > 5 && val.length < 15
      )
      .required("Enter title from"),
    amount: yup.number().min(0, "Enter 0 or any positive number."),
  })
  .required();

export default {
  groceryListItemForm,
};
