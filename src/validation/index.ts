import * as yup from "yup";

export const signInFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20),
});

export const addAdminFormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  role: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(12),
  phoneNumber: yup.string().required().min(8).max(11),
  profileImage: yup.mixed().required(),
});

// Update Schemas
export const editAddminFormSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  role: yup.string(),
  email: yup.string().email(),
  password: yup.string().min(8).max(12),
  phoneNumber: yup.string().max(11),
  profileImage: yup.mixed(),
});


export const editProductSchema = yup.object().shape({
  category: yup.string(),
  productName: yup.string(),
  productPrice: yup.string(),
  productQuantity: yup.string(),
  productDescription: yup.string(),
  productImage: yup.mixed(),
});
export const addProductSchema  = yup.object().shape({
  category: yup.string().required(),
  productName: yup.string().required(),
  productPrice: yup.string().required(),
  productQuantity: yup.string().required(),
  productDescription: yup.string().required(),
  productImage: yup.mixed().required(),
});






// export const editProductSchema = yup.object().shape({
//   category: yup.string(),
//   productName: yup.string(),
//   productPrice: yup.string(),
//   productQuantity: yup.string(),
//   productDescription: yup.string(),
//   productImage: yup.mixed(),
// });

