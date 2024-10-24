import { memo, MouseEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import MUIListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import SettingAction from "components/SettingAction";

interface IListItem {
  id: string;
  title: string;
  amount: number;
  completed: boolean;
  checkedItem: () => void;
  handleOpenActions: (
    itemId: string
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
}

function ListItem(props: IListItem) {
  const { id, completed, amount, title, handleOpenActions, checkedItem } =
    props;
  const key = `${id}-checkbox-${completed}`;
  const textDecoration = completed ? "line-through" : "none";

  return (
    <Paper elevation={2}>
      <MUIListItem
        secondaryAction={<SettingAction onClick={handleOpenActions(id)} />}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": key }}
            onClick={checkedItem}
          />
        </ListItemIcon>
        <ListItemText
          id={key}
          primary={<div style={{ textDecoration }}>{title}</div>}
          secondary={amount !== 0 ? amount : undefined}
        />
      </MUIListItem>
    </Paper>
  );
}

export default memo(
  ListItem,
  (prevProps, nextProps) =>
    prevProps.id === nextProps.id &&
    prevProps.completed === nextProps.completed &&
    prevProps.title === nextProps.title &&
    prevProps.amount === nextProps.amount
);
