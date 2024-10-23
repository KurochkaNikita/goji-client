"use client";

import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import groceryAPI from "api/grocery";

import Loading from "components/Loading";
import queryKey from "constants/query";

import AddButton from "./components/AddButton";
import List from "./components/List";

function GroceryLists() {
  const { isPending, error } = useQuery({
    queryKey: [queryKey.lists],
    queryFn: groceryAPI.getLists,
  });

  if (isPending) return <Loading />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Grid container spacing={2}>
      <AddButton />
      <List />
    </Grid>
  );
}

export default GroceryLists;
