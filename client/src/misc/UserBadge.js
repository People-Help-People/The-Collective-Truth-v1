import { useUserProfile } from "../context/UserProfile";
import { Badge } from "react-bootstrap";

export default function UserBadge() {
    const { userProfile, account } = useUserProfile();
    const initials = userProfile.username.split(" ").map(word => word.charAt(0).toUpperCase()).join("");
    if (account) {
        return <Badge pill style={{ padding: "0.5rem", color: "white" }}>
            {initials}
        </Badge>
    }
}