import { db } from "config/firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

const orderCollectionRef = collection(db, "orders");

export const placeOrder = (inCart: any, totalPrice: number, user: any) => {
  return new Promise(async (resolve, reject) => {
    try {
     if (inCart.length) {
        const newOrder = await addDoc(orderCollectionRef, {
            productsDetails: inCart,
            totalPrice: `${totalPrice} $`,
            userId: user?.uid,
          });
          const orderDoc = doc(db, "orders", newOrder?.id);
    
          await updateDoc(orderDoc, {
            orderId: newOrder?.id,
          });
     }

    

      resolve("New Product order placed");
    } catch (error) {
      reject(error);
    }
  });
};
