import * as yup from "yup";

const groceryListItemForm = yup
  .object({
    title: yup.string().required(),
    amount: yup.number().min(0),
  })
  .required();

export default {
  groceryListItemForm,
};
