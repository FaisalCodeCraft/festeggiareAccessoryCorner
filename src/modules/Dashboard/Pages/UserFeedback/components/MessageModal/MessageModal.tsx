import React from "react";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const MessageModal = (props: any) => {
  const { messageModal, userMessage, setMessageModal } = props || {};
  const onClose = () => {
    setMessageModal(false);
  };
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
          <Close onClick={onClose} />
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}
          >
            <img
              src={userMessage?.userProfileImage}
              width="80px"
              height="80px"
              style={{ borderRadius: "50%" }}
              alt=""
            />
            <Box>
              <Typography>{userMessage?.UserName}</Typography>
              <Typography color="gray" fontStyle={"italic"}>
                {userMessage?.email}
              </Typography>
            </Box>
          </Box>

          <Typography mt={5}>Message:</Typography>
          <Typography
            sx={{
              p: "1em",
            }}
          >
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
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
  // overflowY: "scroll",
};
