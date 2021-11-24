import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Explore() {
    const [query, setQuery] = useState('');

    return (
        <div className="searchBar">
            <input type="text" placeholder="Paste Token Address" onChange={(e) => setQuery(e.target.value)} />
            <Link to={`/explore/${query}`}>
                <button>Submit</button>
            </Link>
        </div>
    )
}