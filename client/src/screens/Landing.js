import { Link } from "react-router-dom"

export default function Onboard() {
    return (
        <div>
            <h1>Hello Hacker 👋 </h1>
            <Link to="/register">
                <button className="primary">Join the Space! </button>
            </Link>
        </div>
    )
}