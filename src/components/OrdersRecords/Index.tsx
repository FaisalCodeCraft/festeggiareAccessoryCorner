import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ROUTES } from "constants/contents/routes";
import OrderList from "./components/OrderList/Orderlist";

const OrderPlace = () => {
  const {pathname} = useLocation()
  const orderListDashboard = pathname === ROUTES.DASHBOARD.ORDER_RECORDS
  return (
    <Box mt={orderListDashboard ? 0 : 8}>
      <OrderList />
    </Box>
  );
};

export default OrderPlace;
