import {
  Box,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { COLORS } from "constants/contents/color";
import { PRODUCT_DETAILS } from "constants/contents/data";
import React, { useEffect } from "react";
import { getProducts } from "services/products";

const ProductTable = (props:any) => {
  const {tableData} = props
  const UserShowOnPage = 5;
  const [user, setUser] = React.useState(1);
  const [product,setProduct] = React.useState([])
  const handleChange = (e:any, data:any) => {
    setUser(data);
  };
  const members = user * UserShowOnPage;
  const remainingMembers = members - UserShowOnPage;


  useEffect(()=>{
    getProducts(setProduct)
  },[])


  if (tableData.length) {
    return (
      <Box mb={5}>
        <Paper elevation={4}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ITEM NAMES</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product?.slice(remainingMembers, members).map(
                  (products:any, i:any) => (
                    <TableRow key={i} hover>
                      <TableCell
                        align="left"
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <img
                          src={products.productImage}
                          alt="ProductImg."
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                        {products.title}
                      </TableCell>
                      <TableCell align="left">{products.price}$</TableCell>
                      <TableCell align="left">{products.quantity}</TableCell>
                      <TableCell align="left">{products.category}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              p: 2,
            }}
          >
            <Stack spacing={2}>
              <Pagination
                sx={{
                  ".MuiPaginationItem-root": {
                    border: `1px solid ${COLORS.pink.hotPink}`,
                    bgcolor: "white",
                    textAlign: "center",
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
                count={Math.ceil(PRODUCT_DETAILS.length / UserShowOnPage)}
                page={user}
                onChange={handleChange}
                variant="outlined"
                // shape="rounded"
              />
            </Stack>
          </Box>
        </Paper>
      </Box>
    );
  }
  else{
    return (
      <Box
      sx={{
        height:"60vh",
        display:'flex',
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center'
       }}
      >
          <Typography color={'gray'}>Product Not found</Typography>
      </Box>
  )
  }


 
};

export default ProductTable;
