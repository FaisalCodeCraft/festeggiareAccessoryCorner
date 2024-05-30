import React from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PRODUCT_DETAILS } from "constants/contents/data";
import { Check } from "@mui/icons-material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { COLORS } from "constants/contents/color";
import OrderModal from "../OrderModal/OrderModal";

const OrderList = () => {
  const [orderModal, setOrderModal] = React.useState<boolean>(false);
  const [orderId, setOrderId] = React.useState<null>();
  return (
    <Container maxWidth="lg">
      <Typography sx={{ pt: 15, color: "black", pb: 3, fontWeight: 900 }}>
        My Orders
      </Typography>
      <Paper elevation={5}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ITEM NAMES</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Stock</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PRODUCT_DETAILS.map((products: any, i: any) => (
                <TableRow
                  key={i}
                  hover
                  onClick={() => {
                    setOrderModal(!orderModal);
                    setOrderId(products?.id);
                  }}
                >
                  <TableCell align="left">{products?.title}</TableCell>
                  <TableCell align="left">{products?.date}</TableCell>
                  <TableCell align="left">{products?.price} $</TableCell>
                  <TableCell align="left">{products?.stock}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color:
                        products.status === "complete"
                          ? "green"
                          : COLORS.gray.light,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {products?.status === "complete" ? (
                      <Check />
                    ) : (
                      <HourglassEmptyIcon />
                    )}{" "}
                    {products?.status}
                  </TableCell>
                  {orderModal && orderId === products?.id && (
                    <OrderModal
                      orderModal={orderModal}
                      orderData={products}
                      onClose={() => setOrderModal(false)}
                    />
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default OrderList;