import { getAuth } from "firebase/auth";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import app from "../../firebase";

const GoogleAuthContext = createContext();

export function useGoogleAuthContext() {
  return useContext(GoogleAuthContext);
}

export function GoogleAuthContextProvider(props) {
  const [googleUserData, setGoogleUserData] = useState(null);
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setGoogleUserData(user);
    });

    return () => unsubscribe();
  }, []);

  const updateUser = (user) => {
    setGoogleUserData(user);
  };

  const value = useMemo(() => {
    return { googleUserData, setGoogleUserData: updateUser };
  }, [googleUserData]);

  return (
    <GoogleAuthContext.Provider
      value={{ googleUserData, setGoogleUserData }}
      {...props}
    />
  );
}
