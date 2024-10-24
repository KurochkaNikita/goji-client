import { memo, useMemo } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TGroceryList, TGroceryListItem } from "types/grocery";

import RemoveAction from "components/RemoveAction";
import { GROCERY_LIST } from "constants/route";

import classes from "./styles";

interface IGroceryListItem {
  item: TGroceryList;
  onClick: () => void;
}

function GroceryListItem(props: IGroceryListItem) {
  const { item, onClick } = props;
  const { id, name, list } = item;

  const getSubTitle = useMemo(() => {
    if (list.length) {
      const completed = list.reduce(
        (acc, listItem: TGroceryListItem) =>
          listItem.completed ? acc + 1 : acc,
        0
      );
      return `${completed}/${list.length} complited`;
    }
    return "Empty list";
  }, [list]);

  return (
    <Card variant="outlined" style={classes.container}>
      <Link href={`${GROCERY_LIST}/${id}`} prefetch>
        <ListItem
          divider
          style={{ width: "100%" }}
          secondaryAction={<RemoveAction onClick={onClick} />}
        >
          <ListItemText primary={name} secondary={getSubTitle} />
        </ListItem>
      </Link>
    </Card>
  );
}

export default memo(
  GroceryListItem,
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);
