import DataFetcher from "api";
import { TGroceryListItem } from "types/grocery";

const getLists = async () => {
  return DataFetcher.get("/groceries");
};

const getListById = async (id: string) => {
  return DataFetcher.get(`/groceries/${id}`);
};

const removeList = async (id: string) => {
  return DataFetcher.delete(`/groceries/${id}`);
};

const addList = async (body: Record<string, any>) => {
  return DataFetcher.post(`/groceries`, body);
};

const addListItem = async (id: string, previousList: TGroceryListItem[]) => {
  return DataFetcher.patch(`/groceries/${id}`, {
    list: [
      ...previousList,
      {
        id: crypto.randomUUID(),
        title: "",
        amount: null,
        completed: false,
      },
    ],
  });
};

const removeListItem = async (
  id: string,
  itemId: string,
  previousList: TGroceryListItem[]
) => {
  const list = previousList.filter((item) => item.id !== itemId);
  return DataFetcher.patch(`/groceries/${id}`, {
    list,
  });
};

const updateListItems = async (id: string, newList: TGroceryListItem[]) =>
  DataFetcher.patch(`/groceries/${id}`, {
    list: newList,
  });

export default {
  getLists,
  getListById,
  addList,
  removeList,
  addListItem,
  removeListItem,
  updateListItems,
};
