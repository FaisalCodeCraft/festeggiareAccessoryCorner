import { auth, db } from "config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface AuthContextValuesType {
  isLoggedIn: boolean;
  user: any;
  signout: () => void;
  loading: boolean;
}
export type User = {
  firstName: string;
  role: "Administrator" | "Admin" | "Moderator";
};
export const AuthContext = createContext<AuthContextValuesType>({
  isLoggedIn: true || false,
  user: {
    role: "Administrator" || "Admin" || "Moderator",
  },
  signout: () => {},
  loading: true,
});
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        setIsLoading(true);
        if (user) {
          const adminDocRef = await doc(db, "admins", user?.uid);
          const snapShotAdmin = await getDoc(adminDocRef);
          if (snapShotAdmin.exists()) {
            setCurrentUser(snapShotAdmin?.data() as any);
            setIsLoggedIn(true);
     
          } else {
            setCurrentUser(user as any);
            setIsLoggedIn(true)
          }
        } else {
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    });
    // return IsLoggedIn;
  }, []);

  const signout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const authContextValues: AuthContextValuesType = {
    user: currentUser,
    isLoggedIn,
    signout,
    loading: isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
