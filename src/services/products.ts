import { db, storage } from "config/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const productCollectionRef = collection(db, "products");

const uploadFile = async ({ image, id }: any) => {
  if (!image) return;
  const adminImgRef = ref(storage, `products/${id}`);
  const metaData = {
    contentType: image?.type,
  };
  try {
    await uploadBytes(adminImgRef, image, metaData);
    const URL = await getDownloadURL(adminImgRef);
    return URL;
  } catch (error) {
    console.log(error as any);
  }
};

// for new Products....
export const addNewProducts = (values: any, productData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newProductDataAdded = await addDoc(productCollectionRef, {
        category: values.category,
        title: values.productName,
        price: values.productPrice,
        quantity: values.productQuantity,
        description: values.productDescription,
      });

      const url = await uploadFile({
        image: values?.productImage,
        id: newProductDataAdded?.id,
      } as any);

      const productDoc = doc(db, "products", newProductDataAdded?.id);

      await updateDoc(productDoc, {
        productImage: url,
        productId: newProductDataAdded?.id,
      });

      resolve("New Product will be created");
    } catch (error) {
      reject(error);
    }
  });
};

// get product data from firebase.

// get Products
export const getProducts = async (setProduct: any) => {
  new Promise<void>((resolve, reject) => {
    try {
      const products = onSnapshot(productCollectionRef, (allProducts) => {
        const newProduct: any = [];
        allProducts.forEach((product) => {
          newProduct.push({ ...product?.data(), id: product?.id });
        });
        setProduct(newProduct);
        resolve(newProduct);
      });
      return () => products();
    } catch (error) {
      reject(error);
    }
  });
};
