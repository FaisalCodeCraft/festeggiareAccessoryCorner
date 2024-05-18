import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { COLORS } from "constants/contents/color";
import { CATEGORIES } from "constants/contents/data";
import { useForm } from "react-hook-form";
import { addProductSchema, editProductSchema } from "validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { inValidButton } from "modules/Dashboard/Pages/ManageAuth/components/LoginFom/LoginForm";
import { addNewProducts } from "services/products";

const DashProductModal = (props: any) => {
  const { productModal, onClose, isUpdate ,productData} = props;
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(isUpdate ? editProductSchema : addProductSchema),
  });

  const [image, setImage] = React.useState(productData?.poster ? productData?.poster : '');

  const handleChange = (e: any) => {
    if (e?.target.files) {
      setValue("productImage", e?.target?.files[0]);
      setImage(URL.createObjectURL(e?.target?.files[0]));
      trigger("productImage");
    }
  };

  React.useEffect(()=>{
    productData && setValue("profileImage", productData?.poster);
  },[])


  
  // for new Product adding.
  const handleAddProduct = async (values: any) => {
    console.log(values, "product will be added.....");
    setIsLoading(true);
    await addNewProducts(values, onClose);
    setIsLoading(false);
    onClose();
  };

  return (
    <div>
      <Modal
        open={productModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(handleAddProduct)}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
              <Typography
              fontWeight={700}
              textAlign="center"
              fontFamily="Mulish"
              fontSize={{ md: "1.5em" }}
            >
              {isUpdate ? " Update Product " : "Add Products"}
            </Typography>
                {/* Left side content */}
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <Box
                      mb={2}
                      width="100%"
                      height="auto"
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
                    {errors?.productImage?.message && !image && (
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
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      select
                      fullWidth
                      defaultValue={productData?.category? productData?.category: 'Category'}
                      placeholder="Product Category"
                      {...register("category")}
                      error={errors.category ? true : false}
                      helperText={
                        errors.category ? <>{errors.category?.message} </> : ""
                      }
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value={"All Options"}>Category</MenuItem>
                      {CATEGORIES?.map((category: any, i: any) => (
                        <MenuItem key={i} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
                {/* Right side content */}
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Product Name"
                      defaultValue={productData?.title? productData?.title: ''}
                      {...register("productName")}
                      error={errors.productName ? true : false}
                      helperText={
                        errors.productName ? (
                          <>{errors.productName?.message} </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Product Price"
                      defaultValue={productData?.price? productData?.price: ''}
                      {...register("productPrice")}
                      error={errors.productPrice ? true : false}
                      helperText={
                        errors.productPrice ? (
                          <>{errors.productPrice?.message} </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Product Quantity"
                      defaultValue={productData?.quantity? productData?.quantity: ''}
                      {...register("productQuantity")}
                      error={errors.productQuantity ? true : false}
                      helperText={
                        errors.productQuantity ? (
                          <>{errors.productQuantity?.message} </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Product Description"
                      defaultValue={productData?.description? productData?.description: ''}
                      {...register("productDescription")}
                      error={errors.productDescription ? true : false}
                      helperText={
                        errors.productDescription ? (
                          <>{errors.productDescription?.message} </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent={"space-around"} gap={2} mt={3}>
              <Button
                size="small"
                onClick={onClose}
                sx={{
                  px: 5,
                  borderRadius: 50,
                  color: "black",
                  background: "lightGray",
                }}
              >
                cancel
              </Button>
              <LoadingButton
                type="submit"
                size="small"
                loading={!!isLoading}
                disabled={!!isLoading}
                sx={!isValid ? inValidButton : loadingButton}
              >
                {isUpdate ? "update" : 'add Products'}
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DashProductModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "60%", sm: 400, xs: 250 },
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 3,
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
const mainBox = {
  width: "240px",
  height: "240px",
  background: COLORS.gray.dark,
  border: "2px solid #D3D3D3",
  borderRadius: "100%",
};

export const uploadButton = {
  background: `linear-gradient(90deg, rgb(238,44,130) 0%, rgb(238,44,134) 6.25%, rgb(238,44,138) 12.5%, rgb(238,44,142) 18.75%, rgb(238,44,146) 25%, rgb(238,44,150) 31.25%, rgb(238,44,154) 37.5%, rgb(238,44,158) 43.75%, rgb(238,44,162) 50%, rgb(238,44,166) 56.25%, rgb(238,44,170) 62.5%, rgb(238,44,174) 68.75%, rgb(238,44,178) 75%, rgb(238,44,182) 81.25%, rgb(238,44,186) 87.5%, rgb(238,44,190) 93.75%, rgb(238,44,194) 100%)`,
  padding: "10px 15px",
  color: "white",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "16px",
  fontStyle: "normal",
  borderRadius: "50px",
  cursor: "pointer",
};

export const loadingButton = {
  background: `linear-gradient(90deg, rgb(238,44,130) 0%, rgb(238,44,134) 6.25%, rgb(238,44,138) 12.5%, rgb(238,44,142) 18.75%, rgb(238,44,146) 25%, rgb(238,44,150) 31.25%, rgb(238,44,154) 37.5%, rgb(238,44,158) 43.75%, rgb(238,44,162) 50%, rgb(238,44,166) 56.25%, rgb(238,44,170) 62.5%, rgb(238,44,174) 68.75%, rgb(238,44,178) 75%, rgb(238,44,182) 81.25%, rgb(238,44,186) 87.5%, rgb(238,44,190) 93.75%, rgb(238,44,194) 100%)  `,
  color: "white",
  padding: "5px 1.5em",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "16px",
  fontStyle: "normal",
  borderRadius: "50px",
  cursor: "pointer",
};
