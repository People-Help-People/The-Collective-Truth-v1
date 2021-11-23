import { useState } from "react";
import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import tick from '../assets/tick.png';

export default function Landing() {
    const [cycle, setCycle] = useState(0);
    const nextCycle = () => {
        setCycle(cycle + 1);
    };

    // Connect Metamask
    const { activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);
    const connectWallet = () => {
        activateBrowserWallet();
        nextCycle();
    };

    // Update Profile

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#333',
        textAlign: 'center',
    }
    const inputStyle = {
        width: '100%',
        height: '50px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0',
        fontSize: '1.2em',
    }
    const [userProfile, setUserProfile] = useState({
        account: '',
        username: 'Hacker',
        bio: 'Noob.'
    });
    const collectUserProfile = (e) => {
        e.preventDefault();
        const userBio = {
            ...userProfile,
            bio: e.target.bio.value,
            username: e.target.username.value,
            account: account
        };
        setUserProfile(userBio);
        nextCycle();
    }


    const components = [
        (<>
            <h1>Hello Hacker 👋 </h1>
            <button className="primary" onClick={nextCycle}>
                Join the Space!
            </button>
        </>),
        (<>
            <button className="primary" onClick={connectWallet}>Connect your metamask</button>
            <p> If you dont have one. Go and create one real quick. We dont care if it has money or not. Just create a dummy account. There is no fee nor shady stuff anyway!</p>
        </>),
        (<>
            <h1>Update your profile</h1>
            <form style={formStyle} onSubmit={collectUserProfile}>
                <input style={inputStyle} type="text" value={account} disabled />
                <input style={inputStyle} name="username" type="text" placeholder="username" />
                <textarea style={inputStyle} name="bio" type="text" placeholder="Bio" />
                <button className="primary" type="submit">Submit</button>
                <button click={nextCycle}>Skip</button>
            </form>
        </>),
        (<>
            <h1>All set!</h1>
            <img src={tick} alt="tick" height="100px" />
            <h1>Welcome Aboard, {userProfile.username} </h1>
        </>),
    ]

    return (
        components[cycle]
    )

}