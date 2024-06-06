import { db } from "config/firebase";
import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

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


export const getOrderProduct = () => {
  return new Promise<any[]>((resolve, reject) => {
    try {
      const orderProduct = onSnapshot(orderCollectionRef, (snapshot) => {
        const orders: any[] = [];
        snapshot.docs.map((doc) => {
          console.log(doc.data(),'}{}{}{}{}{}{')
          orders.push({...doc.data(),id: doc.id,  });
        });
        console.log(orders,'||||||||||||||||||')
        resolve(orders);
      });
      return orderProduct;
    } catch (error) {
      reject(error);
    }
  });
};