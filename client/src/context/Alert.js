import { useEffect, useState, createContext, useContext } from 'react'
import { useEthers } from "@usedapp/core"

export const Alert = createContext()

const AlertProvider = ({ children }) => {

    const [variant, setVariant] = useState('info');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const showAlertMessage = (message, variant) => {
        setMessage(message);
        setVariant(variant);
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }

    return (
        <Alert.Provider value={{ variant, message, show,showAlertMessage }}>
            {children}
        </Alert.Provider>
    )
}

export const useDisplayAlert = () => useContext(Alert)

export default AlertProvider;