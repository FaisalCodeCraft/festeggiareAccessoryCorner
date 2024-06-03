import React from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductModal from "../ProductModal/ProductModal";
import { ShoppingCart } from "@mui/icons-material";
import styled from "styled-components";
import { COLORS } from "constants/contents/color";
import CommonButton from "components/Button/Button";
import { ThemeContext } from "context/themeContext";
import { getProducts } from "services/products";
import { useNavigate } from "react-router-dom";
import { LANDING_ROUTES } from "constants/contents/routes";
// import { useNavigate } from "react-router-dom";
export interface AllProductsPropsType{
  skipPro?:number
}

const AllProducts: React.FC<AllProductsPropsType> = (props: any) => {
  const { skipPro } = props;
  const navigate = useNavigate()
  const { inCart, setInCart, handleKey } = React.useContext(ThemeContext);
  const [productId, setProductId] = React.useState<null>();
  const [product, setProduct] = React.useState<any>([]);
  // const [page, setPage] = React.useState<number>(1);
  const [productModal, setProductModal] = React.useState<boolean>(false);
  const [skip, setSkip] = React.useState<number>(0);
  const [productCategory, setProductCategory] = React.useState<string>("");

  // const navigate = useNavigate();

  // const handleChange = (e: any, data: any) => {
  //   setPage(data);
  // };

  

  const fecthProducts = async () => {
    let url = `https://dummyjson.com/products?limit=${
      skipPro ? 8 : 4
    }&skip=${skip}`;
    if (productCategory && productCategory !== "All Options") {
      url = `https://dummyjson.com/products/category/${productCategory}?limit=${skipPro}&skip=${skip}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data?.products;
  };

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", skip, productCategory],
    queryFn: fecthProducts,
    placeholderData: keepPreviousData,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories", skip],
    queryFn: async () => {
      return await fetch(`https://dummyjson.com/products/category-list`).then(
        (res) => res.json()
      );
    },
    placeholderData: keepPreviousData,
  });

  const handleCart = (item: any) => {
    if (inCart.find((e: any) => e.id === item.id)) {
      const removFromCArt = inCart.filter((e: any) => e.id !== item.id);
      setInCart(removFromCArt);
    } else {
      inCart.push({ ...item, quantity: 1 });
      setInCart(inCart);
    }
    handleKey();
  };

  React.useEffect(() => {
    const getAllProducts = async () => {
      await getProducts(setProduct)
    };
    getAllProducts();
  }, []);


  if (isLoading) {
    return (
      <Box sx={{ width: "40%", m: "auto", mt: 4 }}>
        <Typography textAlign={"center"}>Fetching...</Typography>
        <LinearProgress
          sx={{
            bgcolor: "white",
            mt: 2,
            "& .MuiLinearProgress-bar": {
              backgroundColor: COLORS.pink.hotPink,
            },
            p: 0.2,
          }}
        />
      </Box>
    );
  }

  
  return (
    <Box px={4}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={5}
      >
        <Typography fontSize={{ md: "2.3em" }} fontWeight={400}>
          All Categories
        </Typography>

        {!skipPro && <CommonButton title="See All" onClick={()=>navigate(LANDING_ROUTES.PRODUCTS_PAGE)} />}
        {skipPro && (
          <TextField
            select
            defaultValue={"All Options"}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <MenuItem value={"All Options"}>All Options</MenuItem>
            {categories?.map((category: any, i: any) => (
              <MenuItem key={i} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Box>
      <Grid container spacing={5}>
        {error && (
          <Typography fontSize="small" color={"red"} width={"96%"} ml={"auto"}>
            {error?.message}
          </Typography>
        )}

{product?.map((item: any, index: any) => (
          <Grid item md={3} sm={6} xs={12} key={index}>
            <Box
              position={"relative"}
              height={"300px"}
              width={"100%"}
              textAlign={"center"}
              sx={{ backgroundColor: "rgb(248, 247, 243)" }}
              onClick={() => {
                setProductId(item?.id);
                setProductModal(!productModal);
              }}
            >
              <Poster>
                <img
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover" }}
                  src={item.productImage}
                  alt={item.brand}
                />
              </Poster>
              <Icon>
                <ShoppingCart sx={IconBtn} onClick={() => handleCart(item)} />
              </Icon>
            </Box>
            <Box mt={2}>
              <Typography color={COLORS.gray.light} fontSize={"small"} mb={2}>
                {item.category}
              </Typography>
              <Typography fontWeight={"lighter"} fontSize={"large"}>
                {item.title}
              </Typography>
              <Rating
                sx={{ color: COLORS.gray.dark, my: 0.6 }}
                name="size-small"
                defaultValue={item.rating}
                precision={0.5}
                size="small"
              />
              <Typography fontWeight={"bold"} color={COLORS.gray.light}>
                ${item.price}
              </Typography>
            </Box>
            {productModal && productId === item?.id && (
              <ProductModal
                productModal={productModal}
                productData={item}
                onClose={() => setProductModal(false)}
              />
            )}
          </Grid>
        ))}
        {products?.map((item: any, index: any) => (
          <Grid item md={3} sm={6} xs={12} key={index}>
            <Box
              position={"relative"}
              height={"300px"}
              width={"100%"}
              textAlign={"center"}
              sx={{ backgroundColor: "rgb(248, 247, 243)" }}
              onClick={() => {
                setProductId(item?.id);
                setProductModal(!productModal);
              }}
            >
              <Poster>
                <img
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover" }}
                  src={item.thumbnail}
                  alt={item.brand}
                />
              </Poster>
              <Icon>
                <ShoppingCart sx={IconBtn} onClick={() => handleCart(item)} />
              </Icon>
            </Box>
            <Box mt={2}>
              <Typography color={COLORS.gray.light} fontSize={"small"} mb={2}>
                {item.brand}
              </Typography>
              <Typography fontWeight={"lighter"} fontSize={"large"}>
                {item.title}
              </Typography>
              <Rating
                sx={{ color: COLORS.gray.dark, my: 0.6 }}
                name="size-small"
                defaultValue={item.rating}
                precision={0.5}
                size="small"
              />
              <Typography fontWeight={"bold"} color={COLORS.gray.light}>
                ${item.price}
              </Typography>
            </Box>
            {productModal && productId === item?.id && (
              <ProductModal
                productModal={productModal}
                productData={item}
                onClose={() => setProductModal(false)}
              />
            )}
          </Grid>
        ))}
      
      </Grid>
      {skipPro ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={3}
        >
          <Button
            sx={btnStyle}
            onClick={() => setSkip((prev) => prev - (skipPro ? 8 : 4))}
            // disabled={
            //   skip === 0 || (productCategory && productCategory !== "All Options")
            // }
          >
            Prev
          </Button>
          {/* <Stack>
            <Pagination
              sx={{
                ".MuiPaginationItem-root": {
                  border: `1px solid ${COLORS.pink.hotPink}`,
                  bgcolor: "white",
                  "&.Mui-selected": {
                    bgcolor: COLORS.pink.hotPink,
                    color: "white",
                    "&:hover": {
                      bgcolor: COLORS.pink.hotPink,
                      color: "white",
                    },
                  },
                  "&:hover": {
                    bgcolor: COLORS.pink.hotPink,
                    color: "white",
                  },
                  "& > .MuiPagination-ul": {
                    justifyContent: "center",
                  },
                },
              }}
              count={Math.ceil(products.length / 8)}
              page={1 * 8}
              variant="outlined"
              shape="rounded"
              hideNextButton
              hidePrevButton
            />
          </Stack> */}
          <Button
            sx={btnStyle}
            onClick={() => setSkip((prev) => prev + (skipPro ? skipPro : 4))}
            // disabled={
            //   skip + (skipPro ? 8 : 4) >= 100 ||
            //   (productCategory && productCategory !== "All Options")
            // }
          >
            Next
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default AllProducts;
const btnStyle = {
  color: COLORS.pink.hotPink,
  border: "1px solid rgb(238,44,130)",
  borderRadius: "40px",
  px: 3,
  mx: 2,
  fontSize: "small",
  "&:hover": { backgroundColor: COLORS.pink.hotPink, color: "white" },
};

const IconBtn = {
  right: 6,
  top: 6,
  color: COLORS.pink.hotPink,
  fontSize: "1.6em",
  position: "absolute",
  zIndex: 999,
  bgcolor: "white",
  borderRadius: "50%",
  p: "5px",
  boxShadow: "2px 3px 4px gray",
  transition: "all .5s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
};
const Poster = styled.div`
  height: 210px;
  width: 200px;
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Icon = styled.div`
  height: 300px;
  width: 100%;
  position: absolute;
  background-color: rgba(179, 179, 179, 0.3);
  z-index: 111;
  opacity: 0;
  transition: all 0.7s ease;
  &:hover {
    opacity: 1;
  }
`;
