import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"
import { useUserProfile } from "../context/UserProfile"

export default function Onboard() {
    const { account, userProfile } = useUserProfile();
    return (
        <div>
            <h1>Welcome to The Collective Truth </h1>
            {account ? (
                <div>
                    <Link to="/explore"><button className="primary"> Explore</button></Link>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                    <Link to="/register">
                        <button className="primary">Join the Space! </button>
                    </Link>
                    <Link to="/explore">
                        <button className="primary">Explore for now </button>
                    </Link>
                </div>)
            }
            <div className="mt-5 info">
                <Card body>
                    <h2>What is The Collective Truth?</h2>
                    <p>A fully decentralised and open source information system for web3 assets</p>
                </Card>
                <Card body>
                    <h2>What is our mission?</h2>
                    <p>Crypto was founded and being used heavily because its decentralised. So our mission is to keep the decisions of anyone that way as well. Its open and transparent, and its done by the people. No single body is manipulating in any way.</p>
                </Card>
                <Card body>
                    <h2>How do we accomplish it?</h2>
                    <p>Rather than reaching out to centralised information systems or third party apps for audits. This is a place for experts, investors and explorers of web3 driven by a reward mechanism to produce <b>the collective truth</b>.</p>
                </Card>
            </div>
        </div>
    )
}