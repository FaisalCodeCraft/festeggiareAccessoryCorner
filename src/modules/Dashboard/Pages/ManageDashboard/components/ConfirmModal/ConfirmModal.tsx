import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Snackbar } from '@mui/material';
import { deleteAdmin } from 'services/admin';
import { COLORS } from 'constants/contents/color';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 220,
  height: 80,
  bgcolor: 'background.paper',
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const ConfirmModal = (props:any) => {
  const { adminData } = props;
  const [isConfirmModal, setIsConfirmModal] = React.useState(false);
  const [isSuccessModal, setIsSuccessModal] = React.useState(false);

  const handleOpen = () => setIsConfirmModal(true);
  const handleClose = () => setIsConfirmModal(false);
  const handleSnackbar = () => setIsSuccessModal(false);


  const handleDelete = async () => {
    handleClose();
    deleteAdmin(adminData);
    setIsSuccessModal(true)  
    setTimeout(() => {
      setIsSuccessModal(false)
    }, 3000);
  }


  return (
    <div>
      <Typography aria-label="settings"
        px={2}
        py={2}
        fontSize="14px"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
      >
        Delete
      </Typography>
      <Modal
        keepMounted
        open={isConfirmModal}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Are you sure !
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"} mt={2}>
            <Button
              className="MuiButton-primary"
              sx={btnStyle}
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                bgcolor: COLORS.gray.dark,
                color:'white',
                "&:hover":{
                    bgcolor:COLORS.gray.light
                }
              }}
            >
              No
            </Button>

          </Box>

        </Box>
      </Modal>

      <Snackbar
        open={isSuccessModal}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>
        <Alert onClose={handleSnackbar} severity="success"
          sx={{
            width: '100%',
            bgcolor: COLORS.gray.light,
            color: "white"
          }}>
          Admin has been deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
export default ConfirmModal;
const btnStyle = {
  bgcolor: COLORS.pink.hotPink,
  color: "white",
  "&:hover": {
    bgcolor: COLORS.pink.hotPink
  }
}