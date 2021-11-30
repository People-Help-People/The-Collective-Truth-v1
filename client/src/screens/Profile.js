import { useUserProfile } from "../context/UserProfile"

export default function Profile() {
    const { userProfile, setUserProfile, account } = useUserProfile();
    return (
        <div>
            <h1>User Profile</h1>
            <p>Account: {account}</p>
            <p>Username: {userProfile.username}</p>
            <p>Bio: {userProfile.bio}</p>
        </div>
    )
}