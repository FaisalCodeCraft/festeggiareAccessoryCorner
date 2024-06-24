import { Close } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const MessageModal = (props: any) => {
  const { messageModal, userMessage,onClose  } = props || {};
  
  return (
    <Modal
      open={messageModal}
      onClose={onClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={messageModal}>
        <Box sx={style}>
          <Close component={"button"} onClick={onClose}/>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Profile</TableCell>
                <TableCell align="center">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <Box
                    position={"relative"}
                    height={"80px"}
                    width={"80px"}
                    mr={2}
                    sx={{
                      backgroundColor: "rgb(248, 247, 243)",
                      borderRadius: "50%",
                      display: "flex",
                      gap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img
                      width={"100%"}
                      height={"100%"}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      src={userMessage?.userProfileImage}
                      alt=""
                    />
                    <Typography
                      fontWeight={"light"}
                      fontSize={"large"}
                      width={"250px"}
                    >
                      {userMessage.UserName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={400} fontSize={"large"} mx={5}>
                    {userMessage.UserMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MessageModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
  // overflowY: "scroll",
};
