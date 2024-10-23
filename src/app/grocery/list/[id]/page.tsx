import { Metadata } from "next";
import groceryAPI from "api/grocery";
import notFound from "app/not-found";
import { TNextPage } from "types";

import GroceryList from "pages/GroceryList";

const loadingDate = async (id: string) => {
  return groceryAPI.getListById(id);
};

export async function generateMetadata(
  props: TNextPage<{ id: string }>
): Promise<Metadata> {
  const {
    params: { id },
  } = props;

  const res = await loadingDate(id);

  return {
    title: `Gojl - ${res?.name ?? ""} | Grocery list`,
  };
}

export default async function (props: TNextPage<{ id: string }>) {
  const { params } = props;
  const { id } = params;

  const res = await loadingDate(id);

  if (!res) {
    return notFound();
  }

  return <GroceryList groceryList={res} />;
}
