import { db } from "config/firebase"
import { addDoc, collection } from "firebase/firestore"



const userMessageCollection = collection(db,'messages')
// for userMessage
export const addUserMessage = (message:any,user:any)=>{
    return new Promise<void>(async(resolve, reject) => {
        const userMessage:any = await addDoc(userMessageCollection,{
            UserName: user?.displayName,
            UserId: user?.uid,
            UserEmail: message?.email,
            UserMessage: message?.message
        }) 
        resolve(userMessage)
    })
}