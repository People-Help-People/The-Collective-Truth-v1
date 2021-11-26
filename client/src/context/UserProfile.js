import { useEffect, useState, createContext, useContext } from 'react'
import { useEthers } from "@usedapp/core"

export const UserProfile = createContext()

const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        account: '',
        username: 'Hacker',
        bio: 'Noob.'
    });
    const { account } = useEthers();

    useEffect(() => {
        if (account) {
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            if (userProfile)
                setUserProfile(userProfile);
        } else {
            setUserProfile({
                account: '',
                username: 'Hacker',
                bio: 'Noob.'
            });
        }
    }, [account]);


    return (
        <UserProfile.Provider value={{ userProfile, setUserProfile, account }}>
            {children}
        </UserProfile.Provider>
    )
}

export const useUserProfile = () => useContext(UserProfile)

export default UserProfileProvider;