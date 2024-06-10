import { db } from "config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const userMessageCollection = collection(db, "messages");
// for userMessage
export const addUserMessage = (message: any, user: any) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (user) {
        const userMessage: any = await addDoc(userMessageCollection, {
          userProfileImage: user?.photoURL,
          UserName: user?.displayName,
          UserId: user?.uid,
          UserMessage: message?.message,
        });
        resolve(userMessage);
      }
    } catch (error) {
      reject(error);
    }
  });
};



export const getUserMessages=(setMessage:any,user:any)=>{
  return new Promise<void>((resolve, reject) => {
    try {
      const Messages = onSnapshot(userMessageCollection, (allMessages) => {
        const newMessageArray: any = [];
        allMessages.forEach((message) => {
          newMessageArray.push({ ...message?.data(), id: message?.id, email: user?.email });
        });
        setMessage(newMessageArray);
        resolve(newMessageArray);
      });
      return () => Messages();
    } catch (error) {
      reject(error);
    }
  })
}