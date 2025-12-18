import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { createContext } from "react"
import app from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();