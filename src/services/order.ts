import { db } from "config/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

const orderCollectionRef = collection(db, "orders");
const date = new Date();
const currentDateAndTime =
  date.getFullYear() +
  "-" +
  date.getMonth() +
  "-" +
  date.getDate() +
  " " +
  date.getHours() +
  ":" +
  date.getMinutes() +
  ":" +
  date.getSeconds();

export const placeOrder = (inCart: any, totalPrice: number, user: any) => {

  return new Promise(async (resolve, reject) => {
    try {
      const updateQuantityOfProduct = inCart?.map(
        async (item: any, i: number) => {
          const productDocRef = doc(db, "products", item?.productId);
          const snapProduct = await getDoc(productDocRef);
          if (snapProduct.data()?.quantity >= item?.quantity) {
            await updateDoc(productDocRef, {
              quantity: snapProduct.data()?.quantity - inCart[i].quantity,
            });
          } else {
            return;
          }
        }
      );
      Promise.all(updateQuantityOfProduct).then(async () => {
        if (inCart.length) {
          const newOrder = await addDoc(orderCollectionRef, {
            totalPrice: `${totalPrice} $`,
            userId: user?.userId,
            userPhoneNo: user?.phoneNumber * 1,
            placedAt: currentDateAndTime,
            productsDetails: inCart,
          });
          const orderDoc = doc(db, "orders", newOrder?.id);

          await updateDoc(orderDoc, {
            orderId: newOrder?.id,
          });
        }
      });

      resolve("New Product order placed");
    } catch (error) {
      reject(error);
    }
  });
};
