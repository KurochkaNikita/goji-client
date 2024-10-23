import React from "react";
import Link from "next/link";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { TBreadcrumbs } from "types";

interface IBreadcrumbs {
  currentPage: string;
  items?: TBreadcrumbs[];
}

function Breadcrumbs(props: IBreadcrumbs) {
  const { items = [], currentPage } = props;
  return (
    <Grid size={12}>
      <MUIBreadcrumbs aria-label="breadcrumb">
        {items.map((item) => (
          <Link color="inherit" href={item.link} key={item.link}>
            {item.label}
          </Link>
        ))}
        <Typography sx={{ color: "text.primary" }}>{currentPage}</Typography>
      </MUIBreadcrumbs>
    </Grid>
  );
}

export default Breadcrumbs;
