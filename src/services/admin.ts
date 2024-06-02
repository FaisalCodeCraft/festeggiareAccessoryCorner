import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Admin } from "types/types";

const adminCollectionRef = collection(db, "admins");

const uploadFile = async ({ image, id }: any) => {
  if (!image) return;
  const adminImgRef = ref(storage, `admins/${id}`);
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

// Add new admin
export const addNewAdmin = async (values: Admin, onClose: () => void) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const addNewAdmin = await addDoc(adminCollectionRef, {
      //   role: values.role,
      //   firstName: values.firstName,
      //   lastName: values.lastName,
      //   email: values.email,
      //   phoneNumber: values.phoneNumber,
      // });
      const addNewAdminAuth = await createUserWithEmailAndPassword(
        auth,
        values?.email,
        values?.phoneNumber.toString()
      );
      if (!addNewAdminAuth) {
        return;
      }
      if (addNewAdminAuth) {
        const newAdminDataAdded = {
          role: values.role,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          id: addNewAdminAuth.user.uid,
          createAt: new Date(Date.now()).toLocaleString(),
        };
        await setDoc(
          doc(adminCollectionRef, addNewAdminAuth.user.uid),
          newAdminDataAdded
        );
        const url = await uploadFile({
          image: values?.profileImage,
          id: addNewAdminAuth.user.uid,
        } as any);
        const adminUserDoc = doc(db, "admins", addNewAdminAuth.user.uid);
        await updateDoc(adminUserDoc, { profileImage: url });
        resolve("New admin created");
        onClose();
      }
    } catch (error) {
      reject(error);
      onClose();
    }
  });
};

//Controls updates of Admin
export const updateAdmin = async (values: any, adminData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateAdminData = {
        role: values.role ?? "",
        firstName: values.firstName ?? "",
        lastName: values.lastName ?? "",
        email: values.email ?? "",
        phoneNumber: values.phoneNumber ?? "",
        profileImage: values.profileImage ?? "",
      };
      if (values?.profileImage?.size) {
        const url = await uploadFile({
          image: values?.profileImage,
          id: adminData?.id,
        });
        updateAdminData.profileImage = url;
      }
      const adminUserDoc = doc(db, "admins", adminData?.id);
      await updateDoc(adminUserDoc, updateAdminData);
      resolve("Updated");
    } catch (error) {
      reject(error);
    }
  });
};



// get Admins
export const getAdmins = async (setAdmins:any) => {
  new Promise<void>((resolve, reject) => {
    try {
      const admins = onSnapshot(adminCollectionRef, (allAdmins) => {
        const newAdmins: any = [];
        allAdmins.forEach((admin) => {
          newAdmins.push({ ...admin?.data(), id: admin?.id });
        });
        setAdmins(newAdmins)
        resolve(newAdmins);
      });
      return () => admins();
    } catch (error) {
      reject(error);
    }
  });
};

//Controls admins to delete specific admin profile
export const deleteAdmin = async (adminData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const adminRef = doc(db, "admins", adminData?.id);
      await deleteDoc(adminRef);
      resolve("deleted");
    } catch (error) {
      reject(error);
    }
  });
};