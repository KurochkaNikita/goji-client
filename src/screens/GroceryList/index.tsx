"use client";

import { MouseEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import groceryAPI from "api/grocery";
import Title from "screens/GroceryList/components/Title";
import { TBreadcrumbs } from "types";
import { TGroceryList } from "types/grocery";

import Breadcrumbs from "components/Breadcrumbs";
import Loading from "components/Loading";
import queryKey from "constants/query";
import { GROCERY_LISTS } from "constants/route";

import Actions from "./components/Actions";
import ListItems from "./components/ListItems";
import Modal from "./components/Modal";

interface GroceryListProps {
  groceryList: TGroceryList;
}

function GroceryList(props: GroceryListProps) {
  const { groceryList } = props;
  const { id } = groceryList;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeItemId, setActiveItemId] = useState<string | undefined>();

  const isActionsOpen = Boolean(anchorEl);

  const { isLoading, error, data } = useQuery({
    queryKey: [`${queryKey.lists}/${id}`],
    queryFn: () => groceryAPI.getListById(id),
    initialData: groceryList,
  });

  const { name } = data;

  const handleCloseActions = () => setAnchorEl(null);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenActions =
    (itemId: string) => (event: MouseEvent<HTMLButtonElement>) => {
      setActiveItemId(itemId);
      setAnchorEl(event.currentTarget);
    };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleCloseActions();
  };

  useEffect(() => {
    if (!anchorEl && !isModalOpen) {
      setActiveItemId(undefined);
    }
  }, [anchorEl, isModalOpen]);

  if (isLoading) return <Loading />;
  if (error || !data) return <div>Something went wrong</div>;

  const breadcrumbs: TBreadcrumbs[] = [
    { link: GROCERY_LISTS, label: "Grocery lists" },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Breadcrumbs items={breadcrumbs} currentPage={name} />
        <Title title={name} />
        <ListItems handleOpenActions={handleOpenActions} />
        <Button
          startIcon={<AddIcon />}
          fullWidth
          size="large"
          onClick={handleOpenModal}
        >
          Add new task
        </Button>
      </Grid>
      <Actions
        itemId={activeItemId}
        anchorEl={anchorEl}
        handleClose={handleCloseActions}
        isOpen={isActionsOpen}
        editItem={handleOpenModal}
      />
      <Modal
        itemId={activeItemId}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default GroceryList;
