import { useEffect, useState, createContext, useContext } from 'react'
import { useEthers } from "@usedapp/core"

export const UserProfile = createContext()

const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        account: '',
        username: 'Hacker',
        bio: 'Noob.'
    });
    const { active } = useEthers();

    useEffect(() => {
        if (active) {
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
    }, [active]);


    return (
        <UserProfile.Provider value={{ userProfile, setUserProfile, active }}>
            {children}
        </UserProfile.Provider>
    )
}

export const useUserProfile = () => useContext(UserProfile)

export default UserProfileProvider;