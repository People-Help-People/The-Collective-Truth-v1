import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="header" style={{ paddingTop: '20px' }}>
            <Link to="/">
                <h1 style={{ marginTop: '0', color: 'white', textAlign: "center" }}> Community Audits </h1>
            </Link>
        </div>
    );
}