export type TGroceryListItem = {
  id: string;
  completed: boolean;
  title: string;
  amount: number;
};

export type TGroceryList = {
  id: string;
  name: string;
  list: TGroceryListItem[];
};

export type ListItemForm = {
  title: string;
  amount?: number;
};
