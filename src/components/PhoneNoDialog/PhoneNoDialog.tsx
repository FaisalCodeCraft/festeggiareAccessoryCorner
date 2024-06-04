import { Box, Dialog, TextField, Typography } from "@mui/material";
import CommonButton from "components/Button/Button";

const PhoneNoDialog = (props: any) => {
  const { setPhoneNo,setIsContactNo,isContactNo } = props;
  const handleClose = () => {
    setIsContactNo("");
  };
  return (
    <Dialog
      open={isContactNo==="NotExist"}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box p={2} height={"auto"} width={"auto"}>
        <Typography fontSize={"1.3em"} pb={1} >
          Provide Your Contact Number
        </Typography>
        <TextField
          focused
          sx={{ mt: 2 }}
          InputLabelProps={{
            style: {
              marginLeft: "2px",
              fontSize: "1.3em",
              color: "black",
            },
          }}
          onChange={(e) => setPhoneNo(e.target.value)}
          label="Phone Number"
          placeholder="Enter your phone number"
          fullWidth
          color="secondary"
          variant="standard"
        />
        <Box textAlign={"center"} pt={2}>
        <CommonButton title="Done" onClick={handleClose}/>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PhoneNoDialog;
