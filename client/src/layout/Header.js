
import { useEthers } from "@usedapp/core";
import { Link } from "react-router-dom";
import { Alert, Nav } from "react-bootstrap"
import './Styles.css';
import { useDisplayAlert } from "../context/Alert";
import UserBadge from "../misc/UserBadge";

export default function Header() {
    const { account } = useEthers();
    const { variant, message, show } = useDisplayAlert();
    return (
        <div>
            <Nav className="mainNav">
                <Link to="/">
                    <h1 style={{ display: 'inline', marginTop: '0', marginLeft: '30px', color: 'white' }}> <button>Home</button> </h1>
                </Link>
                <Link to="/explore" ><button>Explore</button></Link>

                {account ? <Link className="profileNav" to="/profile">
                    <button> <UserBadge />  </button>
                </Link> :
                    <Link className="profileNav" to="/register">
                        <button>Register</button>
                    </Link>
                }
            </Nav>


            {
                show &&
                <Alert variant={variant} style={{ textAlign: 'center', fontWeight: 700 }}>
                    {message}
                </Alert>
            }
        </div>
    );
}