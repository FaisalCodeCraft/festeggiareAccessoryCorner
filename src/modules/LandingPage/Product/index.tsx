import React from 'react';
import AllProducts from '../Home/components/AllProducts/AllProducts';
import { Box, Typography } from '@mui/material';


const Product: React.FC = () => {
  return (
    <>
      <Typography
        sx={{
          fontSize: "3em",
          p: 3,
          pt: { md: 15, sm: 10, xs: 20 },
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        ALL PRODUCTS
      </Typography>
      <Box mt={5}>
        <AllProducts skipPro={8}/>
      </Box>
    </>
  );
};

export default Product;
