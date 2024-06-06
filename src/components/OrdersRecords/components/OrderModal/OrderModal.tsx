import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { COLORS } from "constants/contents/color";
import React from "react";

const OrderModal = (props: any) => {
  const { orderModal, onClose, orderData } = props || {};
  return (
    <Modal
      open={orderModal}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={orderModal}>
        <Box sx={style}>
          <Typography
            sx={{
              fontWeight: "bold",
              p: 1,
              color: COLORS.pink.hotPink,
              fontSize: { md: "2em" },
            }}
          >
            {orderData?.title}{" "}
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ITEMS NAMES</TableCell>
                <TableCell align="center">PRICE</TableCell>
                <TableCell align="center">QUANTITY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                <Box
                    position={"relative"}
                    height={"60px"}
                    width={"60px"}
                    mr={2}
                    sx={{
                      backgroundColor: "rgb(248, 247, 243)",
                      borderRadius: "50%",
                      display:'flex',
                      gap:2,
                      alignItems:'center'
                    }}
                  >
                    <img
                      width={"100%"}
                      height={"100%"}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      src={orderData?.poster}
                      alt="poster"
                    />
                    <Typography
                      fontWeight={"light"}
                      fontSize={"large"}
                      width={"250px"}
                    >
                      {orderData?.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                <Typography fontWeight={400} fontSize={"large"}>
                        {orderData?.stock}
                      </Typography>
                </TableCell>
                <TableCell align="center">
                <Typography fontWeight={"bold"} color={COLORS.gray.light}>
                      {/* ${item?.price * item?.quantity} */}
                      {orderData?.price}
                    </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OrderModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};
