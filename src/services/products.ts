import { db, storage } from "config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
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
export const addNewProducts = (values: any, onClose: () => void) => {
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
      } as any);

      const adminUserDoc = doc(db, "products", newProductDataAdded?.id);

      await updateDoc(adminUserDoc, { productImage: url ,id:newProductDataAdded?.id});

      resolve("New Product will be created");

      onClose();
    } catch (error) {
      reject(error);
      onClose();
    }
  });
};
