"use client";

import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "components/Header";

interface ITemplate {
  children: ReactNode;
}

const queryClient = new QueryClient();

function Template(props: ITemplate) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Grid container spacing={2}>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>{children}</Box>
        </Container>
      </Grid>
    </QueryClientProvider>
  );
}

export default Template;
