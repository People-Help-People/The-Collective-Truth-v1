import { useEffect, useState } from "react";
import { useEtherBalance, useEthers } from '@usedapp/core'
import tick from '../assets/tick.png';
import { Link } from "react-router-dom";
import { useUserProfile } from "../context/UserProfile";
import { useRegisterUser } from "../hooks/user/useRegisterUser";
import SpinnerLoading from "../misc/Spinner";

export default function Register() {
    const [cycle, setCycle] = useState(0);
    const nextCycle = () => {
        setCycle(cycle + 1);
    };
    const [loading, setLoading] = useState(false);
    const { userProfile, setUserProfile } = useUserProfile();

    // Connect Metamask
    const { activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);
    const connectWallet = () => {
        activateBrowserWallet();
    };
    const [registerUser] = useRegisterUser(setLoading, nextCycle);

    const tokenAddress = '0xbd3bc5ae6ecb6170019e83ca85591c72d64c82da';
    const tokenSymbol = 'TCT';
    const tokenDecimals = 18;
    const tokenImage = 'http://placekitten.com/200/300';
    
    const addTruthTokenToWallet = async () => {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                  address: tokenAddress, // The address that the token is at.
                  symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                  decimals: tokenDecimals, // The number of decimals in the token
                  image: tokenImage, // A string url of the token logo
                },
              },
            });
          
            if (wasAdded) {
              console.log('Thanks for your interest!');
            } else {
              console.log('Your loss!');
            }
          } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (account && cycle === 0) {
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            if (userProfile?.account !== account)
                nextCycle();
            else
                setCycle(2);
        }
    }, [account])

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
    const collectUserProfile = (e) => {
        e.preventDefault();
        setLoading(true);
        const userBio = {
            ...userProfile,
            bio: e.target.bio.value,
            username: e.target.username.value,
            account: account
        };
        setUserProfile(userBio);
        localStorage.setItem('userProfile', JSON.stringify(userBio));        
        registerUser();
    }


    const components = [
        (<>
            <button className="primary" onClick={connectWallet}>Connect your metamask</button>
            <p> If you dont have one. Go and create one real quick. We dont care if it has money or not. Just create a dummy account. There is no fee nor shady stuff anyway!</p>
            <h2 style={{ color: 'red' }}>Only Polygon Testnet accounts are supported!</h2>
            <p>Here is an useful <a target="_blank" rel="noreferrer" href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844">guide</a></p>
        </>),
        (<>
            <h1>Update your profile</h1>
            <form style={formStyle} onSubmit={collectUserProfile}>
                <input style={inputStyle} type="text" value={account} disabled />
                <input style={inputStyle} name="username" type="text" placeholder="username" />
                <textarea style={inputStyle} name="bio" type="text" placeholder="Bio" />
                <button className="primary" type="submit">{loading ? <SpinnerLoading /> : "Submit"}</button>
                <p style={{color:'white'}}>Please dont skip this step</p>
                {/* <button onClick={nextCycle}>Skip</button> */}
            </form>
        </>),
        (<>
            <h1>All set!</h1>
            <img src={tick} alt="tick" height="100px" />
            <h1>Welcome Aboard, {userProfile.username} </h1>
            <Link to="/explore"><button className="primary"> Explore</button></Link>
            <button onClick={addTruthTokenToWallet}>Add Truth Token to Metamask</button>
        </>),
    ]

    return (
        components[cycle]
    )

}