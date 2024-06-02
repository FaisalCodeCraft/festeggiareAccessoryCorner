import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import CommonButton from "components/Button/Button";
import ProductModal from "../DashProductModal/DashProductModal";
import { COLORS } from "constants/contents/color";

const ProductCard = (props: any) => {
  const { productData } = props;

  const [productModal, setProductModal] = React.useState(false);
  const [productId, setProductId] = React.useState(false);

  if (productData.length) {
    return (
      <Grid container spacing={3} sx={{ mb: { md: 4 } }}>
        {productData?.map((item: any) => (
          <Grid item md={3} sm={4} xs={12}>
            <Box
              sx={{
                borderRadius: "8px",
                boxShadow: "0px 0px 7px 1px lightGray",
                textAlign: "center",
                p: 1,
                height: 352,
              }}
            >
              <img
                src={item?.productImage}
                alt="productImg"
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  marginTop: "10%",
                }}
              />
              <Typography
                sx={{
                  color: COLORS.pink.hotPink,
                  fontWeight: "bold",
                  p: 1.5,
                  fontSize: { md: "1.25em" },
                }}
              >
                {item?.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "14px" },
                }}
              >
                {item?.description.slice(0, 50)}
                <Typography
                component={'a'}
                  sx={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setProductModal(!productModal);
                    setProductId(item?.id);
                  }}
                >
                  ...
                </Typography>
                {item.id === productId && productModal && (
                  <ProductModal
                    productModal={productModal}
                    isUpdate={true}
                    productData={item}
                    onClose={() => setProductModal(false)}
                  />
                )}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "1.2em" },
                  fontWeight: "bold",
                  p: 1,
                }}
              >
                ${item?.price}
              </Typography>
              <IconButton
                sx={{
                  background: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => {
                  setProductModal(!productModal);
                  setProductId(item?.id);
                }}
              >
                <CommonButton title="Edit Product" />
              </IconButton>
              {item.id === productId && productModal && (
                <ProductModal
                  productModal={productModal}
                  isUpdate={true}
                  productData={item}
                  onClose={() => setProductModal(false)}
                />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography color={"gray"}>Product not found.</Typography>
      </Box>
    );
  }
};

export default ProductCard;
