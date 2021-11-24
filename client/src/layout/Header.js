import { Link } from "react-router-dom";
import './Styles.css';

export default function Header() {
    return (
        <div className="header" style={{ paddingTop: '20px' }}>
            <div className="nav">
                <Link to="/">
                    <h1 style={{ display: 'inline', marginTop: '0', color: 'white', textAlign: "center" }}> Community Audits </h1>
                </Link>
            </div>
            <Link className="profileNav" to="/profile">
                <button>Profile</button>
            </Link>
        </div>
    );
}