import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { COLORS } from "constants/contents/color";

const AboutUs = () => {

  return (
    <Box>
      <Container
        maxWidth="md"
        sx={{
          py: { md: 8, sm: 6, xs: 3 },
        }}
      >
        <Typography
          sx={{
            p: 2,
            fontSize: { md: "2.5em" },
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ABOUT US
        </Typography>
        <Typography
          px={{ md: 10 }}
          color={COLORS.gray.dark
          }
        >
          <b>“Festeggiare Accessory Corner” </b> aims to establish an online
          platform dedicated to providing high-quality event accessories for a
          variety of occasions, ranging from weddings and birthdays to corporate
          events and special celebrations. E-commerce is now an essential tool
          for the business industry. This site will help Festeggiare Accessory
          Corner to take their products world-wide with minimum investment of
          money. It will be used to promote and sell their products online. The
          Internet has made the world a smaller place. It has facilitated
          long-distance communication by making the process cheaper, faster, and
          easier. Today, the internet helps business houses to cater to a global
          audience without any major investment. The official.
          <b>“Festeggiare Accessory Corner” </b>
          website will serve as its identity on the World Wide Web (WWW). The
          proposed system will be a great step to globally introduce the eastern
          stylish and affordable accessories business in a much more efficient
          way.
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutUs;
