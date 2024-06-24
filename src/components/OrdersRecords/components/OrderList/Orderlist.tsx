import React, { useContext } from "react";
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
import { Check } from "@mui/icons-material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { COLORS } from "constants/contents/color";
import OrderModal from "../OrderModal/OrderModal";
import { getOrderProduct } from "services/order";
import { AuthContext } from "context/authContext";

const OrderList = () => {
  const [orderModal, setOrderModal] = React.useState<boolean>(false);
  const [orderId, setOrderId] = React.useState<null>();

  const { user } = useContext(AuthContext);

  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersList: any = await getOrderProduct(user);
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orders,setOrders,user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxWidth="lg" sx={{py:3}}>
      <Typography sx={{ py: 2, color: "black",  fontWeight: 900 }}>
        My Orders
      </Typography>
      <Paper elevation={5}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ITEM NAMES</TableCell>
                <TableCell align="left">Date & Time</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            {orders?.map((products: any, i: any) => (
              <TableBody>
                {products?.productsDetails.map((unit: any) => (
                  <TableRow
                    key={i}
                    hover
                    onClick={() => {
                      setOrderModal(!orderModal);
                      setOrderId(unit?.productId);
                    }}
                  >
                    <TableCell align="left">{unit?.title}</TableCell>
                    <TableCell align="left">{products?.placedAt}</TableCell>
                    <TableCell align="left">{unit?.price} $</TableCell>
                    <TableCell align="left">{unit?.quantity}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        color:
                          unit?.status === "complete"
                            ? "green"
                            : COLORS.gray.light,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {unit?.status === "complete" ? (
                        <Check />
                      ) : (
                        <HourglassEmptyIcon />
                      )}{" "}
                      {products?.status} status
                    </TableCell>
                    {orderModal && orderId === unit?.productId && (
                      <OrderModal
                        orderModal={orderModal}
                        orderData={products?.productsDetails}
                        onClose={() => setOrderModal(false)}
                      />
                    )}
                  </TableRow>
                ))}
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default OrderList;
