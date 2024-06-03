import { auth, db } from "config/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const userCollectionRef = collection(db, "users");

export const addNewUser = async () => {
  await onAuthStateChanged(auth, async (user: any) => {
    console.log(user);
    return new Promise(async (resolve, reject) => {
      try {
        const userDocRef = doc(db, "users", user?.uid);
        const snapShotUser = await getDoc(userDocRef);
        const checkRole = snapShotUser?.data()?.role;
        if (!checkRole) {
          await setDoc(doc(userCollectionRef, user?.uid), {
            fullName: user?.displayName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            profileImage: user?.photoURL,
            userId: user?.uid,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const signinWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    await addNewUser();
  } catch (error) {
    console.log(error);
  }
};
