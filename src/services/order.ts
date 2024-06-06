import { db } from "config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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

// place order

export const placeOrder = (inCart: any, totalPrice: number, user: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check quantity
      const updateQuantityOfProduct = inCart?.map(
        async (item: any, i: number) => {
          const productDocRef = doc(db, "products", item?.productId);
          const snapProduct = await getDoc(productDocRef);
          // update quantity in document
          if (snapProduct.data()?.quantity >= item?.quantity) {
            await updateDoc(productDocRef, {
              quantity: snapProduct.data()?.quantity - inCart[i].quantity,
            });
          } else {
            return;
          }
        }
      );

      // order will be added here
      Promise.all(updateQuantityOfProduct).then(async () => {
        if (inCart.length && !user.role) {
          const newOrder = await addDoc(orderCollectionRef, {
            totalPrice: `${totalPrice} $`,
            userId: user?.userId,
            userPhoneNo: user?.phoneNumber,
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

export const getOrderProduct = async (user: any) => {
  return new Promise<any[]>(async (resolve, reject) => {
    try {
      const orderProduct = onSnapshot(orderCollectionRef, (snapshot) => {
        const orders: any[] = [];
        snapshot.docs.map((doc) => {
          orders.push({ ...doc.data() });
        });
        const allOrders = orders.map((e, i) => {
          if (e.userId === user?.uid) {
            return e;
          } else if (user?.role) {
            return e;
          }
        });
        const ordersOfuser = allOrders.filter((e) => e);
        resolve(ordersOfuser)
      });
           

      return orderProduct;
    } catch (error) {
      reject(error);
    }
  });
};
