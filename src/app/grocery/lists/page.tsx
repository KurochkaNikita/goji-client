import type { Metadata } from "next";
import GroceryLists from "screens/GroceryLists";

export const metadata: Metadata = {
  title: "Gojl - Grocery Lists",
};

export default function () {
  return <GroceryLists />;
}
