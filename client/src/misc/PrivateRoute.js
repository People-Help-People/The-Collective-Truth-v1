import { useUserProfile } from "../context/UserProfile";
import { Navigate } from "react-router-dom";
import { useEthers } from "@usedapp/core"


export default function PrivateRoute({ children }) {
    const { account } = useUserProfile();
    return account ? children : <Navigate to="/" />;
}