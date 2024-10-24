import { useParams, useRouter } from "next/navigation";
import IconRemove from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import { TGroceryList } from "types/grocery";

import queryKey from "constants/query";

import classes from "./styles";

interface ITitle {
  title: string;
}

function Title(props: ITitle) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { title } = props;
  const { id } = params || { id: "" };

  const removeListMutation = useMutation({
    mutationKey: [queryKey.lists],
    mutationFn: () => groceryAPI.removeList(id),
    onSuccess: () => {
      queryClient.setQueryData([queryKey.lists], (old: TGroceryList[]) =>
        old.filter((item) => item.id !== id)
      );
      router.replace("/grocery/lists");
    },
  });

  return (
    <Grid size={12} style={classes.container}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <IconButton
        onClick={() => removeListMutation.mutate()}
        edge="end"
        aria-label="delete"
      >
        <IconRemove color="error" />
      </IconButton>
    </Grid>
  );
}

export default Title;
