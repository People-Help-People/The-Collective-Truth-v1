import { useUserProfile } from "../context/UserProfile";
import { Navigate } from "react-router-dom";


export default function PrivateRoute({ children }) {
    let { userProfile } = useUserProfile();
    return userProfile?.account ? children : <Navigate to="/" />
}