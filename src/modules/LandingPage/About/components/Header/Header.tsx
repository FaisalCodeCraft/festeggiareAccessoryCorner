import { Box, Typography } from '@mui/material'
import CommonButton from 'components/Button/Button';
import React from 'react'

const Header = () => {
    return (
        <React.Fragment>
            <Box bgcolor={"black"}
                position={"relative"}
                width={"100%"}
                height={{ md: "640px", xs: '300px', sm: "400px" }} 
                px={0}
                >
                <Box
                    position={"absolute"}
                    sx={{ opacity: .53, objectFit: "cover" }}
                    width={"100%"}
                    height={"100%"}
                    src='https://img.freepik.com/premium-photo/online-shopping-hd-8k-wallpaper-stock-photographic-image_890746-30374.jpg?w=826'
                    component='img'
                >

                </Box >
                <Box color={"white"} width={{ md: "45%" }}
                    position={"absolute"}
                    px={4}
                    top={"50%"}
                    sx={{ transform: "translateY(-50%)" }}
                    mt={4}
                >
                    <Typography>
                        WELCOME TO ABOUT US
                    </Typography>
                    <Typography fontSize={{ md: "2.5em" }}
                        fontWeight={300}
                        lineHeight={"50px"}
                        py={{ md: 5.5 }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, aut!
                    </Typography>
                    <CommonButton title="Shop Now" />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Header;