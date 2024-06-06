import styled from "styled-components";
import { Badge, Button, Divider, IconButton } from "@mui/material";
import {
  Close,
  ExpandLess,
  ExpandMore,
  ShoppingCart,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import React from "react";
import { COLORS } from "constants/contents/color";
import { ThemeContext } from "context/themeContext";
import { placeOrder } from "services/order";
import { AuthContext } from "context/authContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/contents/routes";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "config/firebase";
import PhoneNoDialog from "components/PhoneNoDialog/PhoneNoDialog";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  poster?: string;
  thumbnail?: string;
}

interface CartModalProps {
  color?: boolean;
}

const Fade = React.forwardRef<HTMLDivElement, any>(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "68%", sm: "74%", xs: "80%" },
  maxHeight: "76%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { md: "2.5em 2.5em 1.5em 2.5em", sm: "2.3em 2.3em 1.3em 2.3em", xs: 2 },
  overflowY: "scroll",
  overflowX: "hidden",
  borderRadius: 6,
  "::-webkit-scrollbar": {
    width: "6px",
  },
  "::-webkit-scrollbar-thumb": {
    background: COLORS.pink.hotPink,
    borderRadius: "8px",
  },
};

const CartModal: React.FC<CartModalProps> = ({ color }) => {
  const { mode, inCart, setInCart } = React.useContext(ThemeContext);
  let { user } = React.useContext(AuthContext);
  const [incDec, setIncDec] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isContactNo, setIsContactNo] = React.useState<string>("");
  const [phoneNo, setPhoneNo] = React.useState<string>();
  const [messages, setMessages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let userData: any;
  const navigate = useNavigate();

  // remove one element from cart
  const handleRemove = (item: CartItem) => {
    const removeItemFromCArt = inCart.filter((i: any) => i.id !== item.id);
    setInCart(removeItemFromCArt);
    setLoading(false);
  };

  // 
  const handleInc = (i: number) => {
    setIncDec((prev) => prev + 1);
    inCart[i].quantity = (inCart[i]?.quantity || 0) + 1;
    setLoading(false);
  };

  const handleDec = (item: CartItem) => {
    setIncDec((prev) => prev - 1);
    if (item.quantity > 1) {
      item.quantity = item?.quantity - 1;
    }
    setLoading(false);
  };

  const totalPrice = inCart.reduce(
    (initial: any, curr: any) => initial + curr.price * curr.quantity,
    0
  );

  const handleContactNo = async () => {
    try {
      // check user
      if (user) {
        const userDocRef = await doc(db, "users", user?.uid);
        const snapShotUser = await getDoc(userDocRef);
        // check user phone Number
        if (snapShotUser?.data()?.phoneNumber === null) {
          setIsContactNo("NotExist");
          await updateDoc(userDocRef, {
            phoneNumber: phoneNo,
          });
        } else {
          userData = snapShotUser?.data();
          setIsContactNo("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePurchase = async () => {
    // check if user exist
    if (!user) {
      navigate(ROUTES.AUTH.SIGN_IN);
    }
    // check for phone
    await handleContactNo();
    // Check if Cart have any product
    if (inCart?.length < 0) {
      setMessages(["No Product Selected"]);
      return;
    }

    // Check if Product Quantity is Matching
    const checkProductQuantity = inCart?.map(async (item: any, i: number) => {
      const productDocRef = doc(db, "products", item?.productId);
      const snapProduct = await getDoc(productDocRef);
      if (snapProduct.data()?.quantity >= item?.quantity) {
        return snapProduct.data();
      } else {
        messages.push(
          `${snapProduct.data()?.title} are available only ${
            snapProduct.data()?.quantity
          } quantity`
        );
        setMessages(messages);
        setLoading(true);
        return;
      }
    });
    const test = await Promise.all(checkProductQuantity);
    const test2 = test.filter((i) => i !== undefined);
    if (test2.length === test.length) {
      placeOrder(inCart, totalPrice, userData);
    }
  };

  return (
    <Box>
      <Box sx={{ cursor: "pointer", pr: { md: 3 }, display: "flex" }}>
        <Typography color={color && mode === "dark" ? "black" : "white"}>
          {/* $ {totalPrice} */}
          <StyledBadge badgeContent={inCart?.length} showZero>
            <ShoppingCart sx={{ ml: 1 }} onClick={handleOpen} />
          </StyledBadge>
        </Typography>
      </Box>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* {isContactNo === "NotExist" && ( */}
            <PhoneNoDialog
              setPhoneNo={setPhoneNo}
              isContactNo={isContactNo}
              setIsContactNo={setIsContactNo}
            />
            {/* )} */}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pb={2}
            >
              <Typography fontSize={"1.5em"} pb={1}>
                Shopping Cart
              </Typography>
              <IconButton disableRipple sx={btnStyle} onClick={handleClose}>
                <Close color="error" fontSize="small" />
              </IconButton>
            </Box>
            <Divider />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              py={2}
            >
              <Typography id="spring-modal-title">Items In Cart</Typography>
              <Box>
                <Button
                  disableRipple
                  style={removBtnStyle}
                  onClick={() => setInCart([])}
                >
                  Remove All
                </Button>
              </Box>
            </Box>
            {inCart.map((item: any, i: any) => (
              <Box
                key={i}
                display={{ md: "flex", sm: "flex" }}
                alignItems={"center"}
                mt={3}
              >
                <Box
                  position={"relative"}
                  height={{ md: "100px", sm: "100px", xs: "130px" }}
                  width={{ md: "100px", sm: "90px", xs: "auto" }}
                  sx={{
                    backgroundColor: "rgb(248, 247, 243)",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "cover" }}
                    src={item.poster || item.thumbnail}
                    alt="poster"
                  />
                </Box>
                <Box
                  mt={2}
                  pb={{ md: 0, sm: 0, xs: 2 }}
                  width={"100%"}
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                >
                  <Typography
                    fontWeight={"light"}
                    fontSize={"large"}
                    width={"250px"}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    py={{ md: 0, sm: 0, xs: 1 }}
                  >
                    {item.id === inCart[i].id && (
                      <ExpandLess
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleInc(i)}
                      />
                    )}
                    <Typography fontWeight={400} px={1} fontSize={"large"}>
                      {item.quantity}
                    </Typography>
                    <ExpandMore
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleDec(item)}
                    />
                  </Box>
                  <Typography fontWeight={"bold"} color={COLORS.gray.light}>
                    ${item?.price * item?.quantity}
                  </Typography>
                  <IconButton
                    disableRipple
                    sx={btnStyle}
                    onClick={() => handleRemove(item)}
                  >
                    <Close color="error" fontSize="small" />
                  </IconButton>
                </Box>
                <Divider />
              </Box>
            ))}
            <Box>
              {inCart.length === 0 && (
                <Typography mt={5} textAlign={"center"}>
                  Your cart is empty
                </Typography>
              )}
            </Box>
            <Box
              display={{ md: "flex", sm: "flex" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              color={COLORS.pink.hotPink}
              mt={{ md: 7, sm: 5, xs: 0 }}
              py={1}
              px={{ md: 3, sm: 2, xs: 0 }}
            >
              <Box display={"flex"}>
                <Typography pr={0.5}>Products:</Typography>
                <Typography> {inCart.length}</Typography>
              </Box>
              <Box display={"flex"}>
                <Typography pr={0.5}>Total Price:</Typography>
                <Typography>$ {totalPrice}</Typography>
              </Box>
            </Box>
            <Divider />
            <Box pt={2} display={"flex"} justifyContent={"end"}>
              <Button
                sx={{
                  color: COLORS.pink.hotPink,
                  border: "1px solid rgb(238,44,130)",
                  borderRadius: "8px",
                  px: "auto",
                  py: ".7em",
                  fontSize: ".67rem",
                  "&:hover": {
                    backgroundColor: COLORS.pink.hotPink,
                    color: "white",
                  },
                }}
                onClick={handlePurchase}
                disabled={inCart.length < 1 || loading}
              >
                {loading ? "Loading" : "Purchase"}
              </Button>
            </Box>
            {inCart.length > 0 &&
              messages.length > 0 &&
              messages?.map((e, i) => (
                <Typography key={i} color={"red"}>
                  {e}
                </Typography>
              ))}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default CartModal;
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -2,
    top: 0,
    color: "white",
    backgroundColor: "rgba(82, 81, 81, .8)",
    fontWeight: 500,
    fontSize: "14px",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    border: "1px solid gray",
    padding: "0 4px",
  },
}));

const btnStyle = {
  border: "1px solid gray",
  width: "25px",
  height: "25px",
  padding: 1,
};
const removBtnStyle = {
  color: "red",
  border: "1px solid red",
  borderRadius: "40px",
  px: "auto",
  height: "25px",
  fontSize: ".67rem",
  "&:hover": { backgroundColor: "red", color: "white" },
};
