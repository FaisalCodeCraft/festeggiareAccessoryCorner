import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import AdminModal from "../AdminModal/AdminModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const OptionModal = (props:any) => {
  const {adminData} = props || {}
    const [adminModal, setAdminModal] = React.useState(false);
    

  return (
    <div>
      <Box
        mr={3}
        sx={{
          background: "#ffffff",
          position: "absolute",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.11)",
          borderRadius: "8px",
          width: "120px",
          right: 0,
          zIndex: 999,
        }}
      >
        <Typography
          px={2}
          py={2}
          fontSize="14px"
          fontWeight="600"
            onClick={() => setAdminModal(true)}
          sx={{ cursor: "pointer" }}
        >
          Edit
        </Typography>
        <Divider />
        <Typography
        >

          <ConfirmModal adminData={adminData}/>
        </Typography >
        <Divider />
      </Box>

      {adminModal && (
        <AdminModal
          adminModal={adminModal}
          isUpdate={true}
          adminData={adminData}
          onClose={() => setAdminModal(false)}
        />
      )}
    </div>
  );
};

export default OptionModal;
