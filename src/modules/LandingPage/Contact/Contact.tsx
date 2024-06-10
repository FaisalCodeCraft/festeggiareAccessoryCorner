import React from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import { Box } from "@mui/material";

const Contact = () => {
  return (
    <Box
    position={'relative'}
    >
        <img src="https://img.freepik.com/premium-photo/online-shopping-hd-8k-wallpaper-stock-photographic-image_890746-30374.jpg?w=826" alt="bgImg" 
          width={'100%'}
          height={'650px'}
          style={{filter:'brightness(50%)'}}
        />
        <Box position={'absolute'} top={0} width={'100%'}>
        <ContactForm />
        </Box>
    </Box>
  );
};

export default Contact;
