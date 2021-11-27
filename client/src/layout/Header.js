import { useEthers } from "@usedapp/core";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap"
import './Styles.css';
import { useDisplayAlert } from "../context/Alert";

export default function Header() {
    const { account } = useEthers();
    const { variant, message, show } = useDisplayAlert();
    return (
        <div className="header" style={{ paddingTop: '20px' }}>
            <div className="nav">
                <Link to="/">
                    <h1 style={{ display: 'inline', marginTop: '0', color: 'white', textAlign: "center" }}> Community Audits </h1>
                </Link>
            </div>
            {account ? <Link className="profileNav" to="/profile">
                <button>{account}</button>
            </Link> :
                <Link className="profileNav" to="/register">
                    <button>Register</button>
                </Link>
            }
            <div>
                {
                    show &&
                    <Alert variant={variant} style={{ textAlign: 'center', fontWeight: 700 }}>
                        {message}
                    </Alert>
                }
            </div>
        </div>
    );
}