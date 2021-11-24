import { useEffect, useState, createContext, useContext } from 'react'

export const UserProfile = createContext()

const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        account: '',
        username: 'Hacker',
        bio: 'Noob.'
    });

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile) {
            setUserProfile(userProfile);
        }
    }, []);


    return (
        <UserProfile.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </UserProfile.Provider>
    )
}

export const useUserProfile = () => useContext(UserProfile)

export default UserProfileProvider;