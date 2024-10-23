import { MouseEvent } from "react";
import DeleteIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

interface ISettingAction {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function SettingAction(props: ISettingAction) {
  const { onClick } = props;

  const handlerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };

  return (
    <IconButton onClick={handlerClick} edge="end" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
}

export default SettingAction;
