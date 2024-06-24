import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";

const MessageModal = (props: any) => {
  const { messageModal, onClose, userMessage } = props || {};

  return (
    <Modal
      open={messageModal}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={messageModal}>
        <Box sx={style}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <img
              src={userMessage?.userProfileImage}
              width={"80px"}
              height={"80px"}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt=""
            />
            <Box>
              <Typography>{userMessage?.UserName}</Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                {userMessage?.email}
              </Typography>
            </Box>
          </Box>
          <Typography
          mt={6}
          fontWeight={'bold'}
          >Message:</Typography>
           <Typography p={2} fontWeight={100}>
            {userMessage?.UserMessage}
           </Typography>
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
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
  // overflowY: "scroll",
};
