import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, Rating } from '@mui/material';
import { ThemeContext } from 'context/themeContext';
import { COLORS } from 'constants/contents/color';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: "scroll"
};

const ProductModal = (props:any) => {
    const { onClose, productModal, productData } = props
    const { inCart, setInCart, handleKey } = React.useContext(ThemeContext)

    const handleCart = (item:any) => {
        if (inCart.find((e:any) => e.id === item.id)) {
            const removFromCArt = inCart.filter((e:any) => e.id !== item.id)
            setInCart(removFromCArt)
        } else {
            inCart.push({ ...item, quantity: 1 })
            setInCart(inCart)

        }
        handleKey();
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={productModal}
                onClose={onClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={productModal}>
                    <Box sx={style}>
                        <Box
                            width={"60%"}
                            height={"300px"}
                            ml={"auto"}
                            bgcolor={"rgb(248, 247, 243)"}
                            borderRadius={"10px"}
                        >
                            <img
                                width={"100%"}
                                height={"100%"}
                                style={{ objectFit: "cover" }}
                                src={productData?.poster || productData?.productImage}
                                alt={productData.name}
                            />
                        </Box>
                        <Box mt={2}>
                            <Typography
                                color={COLORS.gray.light}
                                fontSize={"small"}
                                mb={2}
                            >
                                {productData.proName}
                            </Typography>
                            <Typography
                                fontWeight={"bold"}
                                fontSize={"medium"}
                            >
                                {productData.title}
                            </Typography>
                            <Typography
                                fontWeight={"lighter"}
                            >
                                {productData.description}
                            </Typography>
                            <Rating
                                sx={{ color: COLORS.gray.dark, my: .6 }}
                                name="size-small"
                                defaultValue={productData.rating}
                                precision={.5}
                                size="small"
                            />
                            <Typography
                                fontWeight={"bold"}
                                color={COLORS.gray.light}
                            >
                                ${productData.price}
                            </Typography>
                            <Button
                                sx={btnStyle}
                                onClick={() => handleCart(productData)}
                            >
                                {inCart.find((e:any) => e.id === productData.id) ? "Remove from cart" : "Add to cart"}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ProductModal;
const btnStyle = {
    color: COLORS.pink.hotPink,
    border: "1px solid rgb(238,44,130)",
    borderRadius: "8px",
    px: 3,
    mt: 2,
    fontSize: "small",
    "&:hover": { backgroundColor: COLORS.pink.hotPink, color: "white" },
}