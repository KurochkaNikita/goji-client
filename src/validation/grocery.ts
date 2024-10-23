import * as yup from "yup";

const minTaskTitle = 5;
const maxTaskTitle = 25;

const groceryListItemForm = yup
  .object({
    title: yup
      .string()
      .test(
        "len",
        `Must be from ${minTaskTitle} to ${maxTaskTitle}`,
        (val = "") => val.length > minTaskTitle && val.length < maxTaskTitle
      )
      .required("Enter title from"),
    amount: yup.number().min(0, "Enter 0 or any positive number."),
  })
  .required();

export default {
  groceryListItemForm,
};
