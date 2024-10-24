import { memo, useMemo } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TGroceryList } from "types/grocery";
import { getProgressList } from "utilities/lists";

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

  const getSubTitle = useMemo(() => getProgressList(list), [list]);

  return (
    <Card variant="outlined" style={classes.container}>
      <Link href={`${GROCERY_LIST}/${id}`}>
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
