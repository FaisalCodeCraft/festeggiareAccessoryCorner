import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, MenuItem, TextField } from "@mui/material";
import { COLORS } from "constants/contents/color";
import { ADMIN_ROLE } from "constants/contents/data";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { addAdminFormSchema, editAddminFormSchema } from "validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { inValidButton } from "modules/Dashboard/Pages/ManageAuth/components/LoginFom/LoginForm";
import {
  loadingButton,
  uploadButton,
} from "modules/Dashboard/Pages/ManageProducts/components/DashProductModal/DashProductModal";
import { addNewAdmin, updateAdmin } from "services/admin";
import { Admin } from "types/types";
// import { AuthContext } from "context/authContext";

export default function AdminModal(props:any ) {
  const { onClose, adminModal, isUpdate, adminData } = props;

  const [isLoading, setIsLoading] = React.useState(false);
  // console.log(new Date(Date.now()).toLocaleString().split(",")[0]);
  console.log()
  const {
    trigger,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(isUpdate ? editAddminFormSchema  : addAdminFormSchema),
  });
  
  const [image, setImage] = React.useState(
    adminData?.adminPoster ? adminData?.adminPoster : ""
  );

  const handleChange = (e: any) => {
    if (e?.target.files) {
      setValue("profileImage", e?.target?.files[0]);
      trigger("profileImage");
      setImage(URL.createObjectURL(e?.target?.files[0]));
    }
  };

  React.useEffect(() => {
    adminData && setValue("profileImage", adminData?.adminPoster);
    //eslint-disable-next-line
  }, []);

  
  const handleSubmitForm = async (values: Admin | {}) => {
    if (isUpdate) {
      setIsLoading(true);
      await updateAdmin(values,adminData)
      setIsLoading(false);
      onClose();
    } else {
      setIsLoading(true);
      await addNewAdmin(values as Admin, onClose);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <Modal
        open={adminModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Typography
              fontWeight={800}
              textAlign="center"
              fontFamily="Mulish"
              fontSize={{ md: "2em" }}
            >
              {isUpdate ? " Updete Admin " : "Add Admin"}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
            >
              <Box sx={mainBox}>
                {image && (
                  <img
                    width="100%"
                    height="100%"
                    style={{
                      borderRadius: "100%",
                      border: `2px solid ${COLORS.pink.hotPink}`,
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    src={image}
                    alt="thumbnail"
                  />
                )}
              </Box>
              <label style={{ marginTop: "10px" }} htmlFor="img">
                <Box sx={uploadButton}>Upload New Photo</Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(e)}
                  id="img"
                  style={{ display: "none" }}
                />
              </label>
            </Box>
            {errors?.profileImage?.message && !image && (
              <Typography
                textAlign={"center"}
                mt={1}
                sx={{ color: "red" }}
                fontSize={{ md: 15, sm: 12, xs: 10 }}
                variant="body1"
              >
                please choose a profile image
              </Typography>
            )}
            <Box my={2} sx={Styles.TextFields__Wrapper}>
              <TextField
                defaultValue={adminData?.firstName ? adminData?.firstName : ""}
                placeholder="First Name"
                {...register("firstName")}
                error={errors.firstName ? true : false}
                helperText={
                  errors.firstName ? <>{errors.firstName?.message} </> : ""
                }
              />

              <TextField
                defaultValue={adminData?.lastName ? adminData?.lastName : ""}
                placeholder="Last Name"
                {...register("lastName")}
                error={errors.lastName ? true : false}
                helperText={
                  errors.lastName ? <>{errors.lastName?.message} </> : ""
                }
              />

              <TextField
                select
                fullWidth
                placeholder="Admin role"
                defaultValue={
                  adminData?.role ? adminData?.role : "Administrator"
                }
                {...register("role")}
                error={errors.role ? true : false}
                helperText={errors.role ? <>{errors.role?.message} </> : ""}
                // onChange={(e) => setCategory(e.target.value)}
              >
                {ADMIN_ROLE?.map((role: any, i: any) => (
                  <MenuItem key={i} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                defaultValue={adminData?.email ? adminData?.email : ""}
                placeholder="Admin Email"
                {...register("email")}
                error={errors.email ? true : false}
                helperText={errors.email ? <> {errors.email?.message} </> : ""}
              />

              <TextField
                defaultValue={
                  adminData?.phoneNumber ? adminData?.phoneNumber : ""
                }
                placeholder="Phone No:"
                {...register("phoneNumber")}
                error={errors.phoneNumber ? true : false}
                helperText={
                  errors.phoneNumber ? <>{errors.phoneNumber?.message} </> : ""
                }
              />
              <Box display="flex" gap={2}>
                <Button
                  onClick={onClose}
                  fullWidth
                  size="small"
                  sx={{
                    borderRadius: 50,
                    color: "black",
                    bgcolor: "lightgray",
                  }}
                >
                  cancel
                </Button>
                <LoadingButton
                  fullWidth
                  size="small"
                  type="submit"
                  loading={!!isLoading}
                  disabled={!!isLoading}
                  sx={
                    !isValid
                      ? inValidButton
                      : loadingButton || isUpdate
                      ? loadingButton
                      : loadingButton
                  }
                >
                  {isUpdate ? "Update " : "Add Admin"}
                </LoadingButton>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 400, sm: 400, xs: 250 },
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  height: "80vh",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "6px",
  },
  "::-webkit-scrollbar-thumb": {
    background: COLORS.pink.hotPink,
    borderRadius: "8px",
  },
};
const Styles = {
  TextFields__Wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    "& .MuiInputBase-root": {
      height: "60px",
      fontWeight: "500",
      fontSize: "16px",
      color: "#454546",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #454546",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      border: "1.5px solid #cb2c2c",
    },
  },
};
const mainBox = {
  width: "150px",
  height: "150px",
  background: " #F1F1F1",
  border: "1px solid #D3D3D3",
  borderRadius: "100%",
};
