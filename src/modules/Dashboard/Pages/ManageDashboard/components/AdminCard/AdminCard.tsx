import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OptionModal from "../OptionModal/OptionModal";
import { Admin } from "types/types";
// import { ADMIN_CARD } from "constants/contents/data";

const AdminCard = (props: any) => {
  const [moreOptionModal, setMoreOptionModal] = React.useState(false);
  const [itemId, setItemId] = React.useState(false);
  const { adminsData } = props;

  return (
    <Box mb={5}>
      <Grid container spacing={3}>
        {adminsData?.map((data: any, i: any) => (
          <Grid item md={3} sm={6} xs={12} key={i}>
            <Card
              elevation={0}
              sx={{
                position: "relative",
                borderRadius: "8px",
                boxShadow: "0px 0px 7px 1px lightGray",
                textAlign: "center",
                p: 1,
                height:300
              }}
            >
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon
                      onClick={() => {
                        setMoreOptionModal(!moreOptionModal);
                        setItemId(data?.id);
                      }}
                    />
                  </IconButton>
                }
              />
              {data.id === itemId && moreOptionModal && (
                <OptionModal adminData={data } />
              )}
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  height="100"
                  component="img"
                  src={data?.profileImage}
                  alt="Profile Image"
                  sx={{
                    width: 100,
                    borderRadius: 50,
                    border: "1.5px solid gray",
                  }}
                />
                <CardContent>
                  <Box
                    mt={1.5}
                    display="flex"
                    flexWrap="wrap"
                    flexDirection="column"
                    sx={{ textAlign: "center" }}
                  >
                    <Typography
                      fontSize="14px"
                      fontWeight="400"
                      fontFamily="Inter"
                      color="rgba(0, 0, 0, 0.5)"
                    >
                      {data?.role}
                    </Typography>
                    <Typography
                      fontSize="18px"
                      fontWeight="700"
                      fontFamily="Inter"
                    >
                      {data?.adminName}
                    </Typography>
                  </Box>
                  <Typography
                    fontSize="14px"
                    fontWeight="400"
                    fontFamily="Inter"
                  >
                    {data?.email}
                  </Typography>
                  <Typography
                    mt={"5px"}
                    fontSize="14px"
                    fontWeight="400"
                    fontFamily="Inter"
                  >
                    {data?.phoneNumber}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminCard;
