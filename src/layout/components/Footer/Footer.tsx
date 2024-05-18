import React from "react";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { COLORS } from "constants/contents/color";

const Footer = () => {
  return (
    <div>
      <Box bgcolor={COLORS.gray.black} mt={8}>
        <Container maxWidth="lg">
          <Grid container p={4} spacing={5}>
            <Grid item md={4} color={"black"} sm={6} xs={12}>
              <Typography fontSize={20} color={COLORS.gray.light}>
                Contact
              </Typography>
              <Typography
                fontSize={14}
                sx={{
                  borderBottom: "1px solid gray",
                  width: "60%",
                  pt: 2,
                  color:"pink",
                }}
              >
                Email:
                <Link to={"#"} style={linkStyle}>
                  hina.ishaq@vu.edu.pk
                </Link>
              </Typography>
              <Typography
                fontSize={14}
                sx={{
                  opacity: ".8",
                  borderBottom: "1px solid gray",
                  width: "50%",
                  pt: 2,
                  color:"pink",
                }}
              >
                Skype ID:
                <Link to={"#"} style={linkStyle}>
                  hinaishaq1011
                </Link>
              </Typography>
            </Grid>
            <Grid item md={3} color={"gray"} sm={6} xs={12}>
              <Typography fontSize={20} color={COLORS.gray.light}>
                Services
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={6} sm={6} xs={6}>
                  <List>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Home
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Sermom
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Ministries
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Event
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Contact
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Privacy
                      </Link>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                  <List>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Partners
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Bussiness
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Carrer
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Blogs
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        FAQ
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"#"} style={linkStyle}>
                        Creative
                      </Link>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} mx={5} sm={6} xs={12}>
              <Typography fontSize={20} color={COLORS.gray.light}>
                Links
              </Typography>
              <List>
                <ListItem>
                  <Link to={"#"} style={linkStyle}>
                    Our Vision
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={"#"} style={linkStyle}>
                    About us
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={"#"} style={linkStyle}>
                    Contact us
                  </Link>
                </ListItem>
              </List>
              <Link to={"#"}>
                <Instagram
                  sx={{
                    p: 1,
                    bgcolor: "white",
                    borderRadius: "50%",
                    color: "gray",
                    m: "3px",
                    "&:hover": { bgcolor: COLORS.pink.hotPink, color: "white" },
                  }}
                />
              </Link>
              <Link to={"#"}>
                <Twitter
                  sx={{
                    p: 1,
                    bgcolor: "white",
                    borderRadius: "50%",
                    color: "gray",
                    m: "3px",
                    "&:hover": { bgcolor: COLORS.pink.hotPink, color: "white" },
                  }}
                />
              </Link>
              <Link to={"#"}>
                <FacebookOutlined
                  sx={{
                    p: 1,
                    bgcolor: "white",
                    borderRadius: "50%",
                    color: "gray",
                    m: "3px",
                    "&:hover": { bgcolor: COLORS.pink.hotPink, color: "white" },
                  }}
                />
              </Link>
              <Link to={"#"}>
                <LinkedIn
                  sx={{
                    p: 1,
                    bgcolor: "white",
                    borderRadius: "50%",
                    color: "gray",
                    m: "3px",
                    "&:hover": { bgcolor: COLORS.pink.hotPink, color: "white" },
                  }}
                />
              </Link>
              <Link to={"#"}>
                <Pinterest
                  sx={{
                    p: 1,
                    bgcolor: "white",
                    borderRadius: "50%",
                    color: "gray",
                    m: "3px",
                    "&:hover": { bgcolor: COLORS.pink.hotPink, color: "white" },
                  }}
                />
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;

const linkStyle = {
  textDecoration: "none",
  color: "white",
  "&:hover": {
    color: "black",
  },
  paddingLeft:"5px"
};
