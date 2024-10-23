import DataFetcher from "api";
import { TGroceryListItem } from "types/grocery";

const getLists = async () =>
  DataFetcher.get("/groceries").catch((err) => {
    console.warn("GET Error groceries", err);
    return [];
  });

const getListById = async (id: string) =>
  DataFetcher.get(`/groceries/${id}`).catch((err) => {
    console.warn("GET Error groceries", err);
    return null;
  });

const removeList = async (id: string) =>
  DataFetcher.delete(`/groceries/${id}`).catch((err) => {
    console.warn("Remove Error groceries", err);
    return {};
  });

const addList = async (body: Record<string, any>) =>
  DataFetcher.post(`/groceries`, body).catch((err) => {
    console.warn("Remove Error groceries", err);
    return null;
  });

const addListItem = async (id: string, previousList: TGroceryListItem[]) =>
  DataFetcher.patch(`/groceries/${id}`, {
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
  }).catch((err) => {
    console.warn("Remove Error groceries", err);
    return null;
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
