import { Avatar, Box, Typography } from "@mui/material";
import CommonButton from "components/Button/Button";

const Navbar = (props: any) => {
  const { title, buttonClick } = props || {};
  return (
    <Box>
      <Box
        py={6}
        display={{ md: "flex", sm: "flex" }}
        alignItems={"center"}
        mt={{ xs: 1, md: 0, sm: 0 }}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography
            onClick={buttonClick}
            sx={{  py: 1, "&:hover": { bgcolor: "transparent" } }}
          >
            <CommonButton title={title} />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: { md: 45, sm: 35, xs: 25 },
              height: { md: 45, sm: 35, xs: 25 },
            }}
            alt="user avatar"
            src={"/assets/images/user-icon.svg"}
          />
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            flexDirection={"column"}
            mx={2}
          >
            <Typography
              variant="body2"
              color={"black"}
              fontSize={{ md: 12, sm: 10, xs: 10 }}
            >
              @user
            </Typography>
            <Typography
              fontFamily="Mulish"
              fontWeight={"bold"}
              color={"black"}
              fontSize={{ md: 16, sm: 14, xs: 12 }}
            >
              user@gmail.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
