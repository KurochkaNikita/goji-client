import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";

function Loading() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "50vh" }}
    >
      <CircularProgress size="3rem" />
    </Grid>
  );
}

export default Loading;
