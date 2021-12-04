
import { useEthers, useTokenBalance, useEtherBalance, useToken } from "@usedapp/core";
import { formatUnits } from '@ethersproject/units'
import { Link } from "react-router-dom";
import { Alert, Nav, Dropdown } from "react-bootstrap"
import './Styles.css';
import { useDisplayAlert } from "../context/Alert";
import UserBadge from "../misc/UserBadge";
import { useTruthBalance } from "../hooks/user/useTruthBalance";
import SpinnerLoading from "../misc/Spinner";

export default function Header() {
    const { account, deactivate, activateBrowserWallet } = useEthers();
    const { variant, message, show } = useDisplayAlert();
    const [balance] = useTruthBalance();

    return (
        <div>
            <Nav className="mainNav">
                <Link to="/">
                    <h1 style={{ display: 'inline', marginTop: '0', marginLeft: '30px', color: 'white' }}> <button>Home</button> </h1>
                </Link>
                <Link to="/explore" ><button>Explore</button></Link>

                {account ?
                    <>
                        <Dropdown>                            
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {balance.empty ? <SpinnerLoading /> : <span disabled>{formatUnits(balance.data)} TCT </span>}
                                <UserBadge />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Link className="profileNav" to="/profile"> Profile</Link>
                                <button onClick={deactivate}>Disconnect</button>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                    : localStorage.getItem("userProfile") ? <button onClick={activateBrowserWallet}>Login</button> : (< Link className="profileNav" to="/register">
                        <button> Register</button>
                    </Link>)

                }
            </Nav>


            {
                show &&
                <Alert variant={variant} style={{ textAlign: 'center', fontWeight: 700 }}>
                    {message}
                </Alert>
            }
        </div >
    );
}