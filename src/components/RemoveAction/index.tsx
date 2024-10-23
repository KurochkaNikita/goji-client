import { MouseEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

interface IRemoveAction {
  onClick: () => void;
}

function RemoveAction(props: IRemoveAction) {
  const { onClick } = props;

  const handlerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <IconButton onClick={handlerClick} edge="end" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
}

export default RemoveAction;
