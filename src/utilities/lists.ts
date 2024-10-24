import { TGroceryListItem } from "types/grocery";

// eslint-disable-next-line import/prefer-default-export
export const getProgressList = (list: TGroceryListItem[] = []) => {
  if (list.length) {
    const completed = list.reduce(
      (acc, listItem: TGroceryListItem) => (listItem.completed ? acc + 1 : acc),
      0
    );
    return `${completed}/${list.length} complited`;
  }
  return "Empty list";
};
