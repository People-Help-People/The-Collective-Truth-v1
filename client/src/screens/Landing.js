import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useUserProfile } from "../context/UserProfile"

export default function Onboard() {
    const { account, userProfile } = useUserProfile();
    return (
        <div>
            <h1>Hello {userProfile.username} 👋 </h1>
            {account ? (
                <div>
                    <Link to="/explore"><button className="primary"> Explore</button></Link>
                </div>
            ) : (
                <div style={{display:'flex',gap:'30px'}}>
                    <Link to="/register">
                        <button className="primary">Join the Space! </button>
                    </Link>
                    <Link to="/explore">
                        <button className="primary">Explore for now </button>
                    </Link>
                </div>)
            }
        </div>
    )
}