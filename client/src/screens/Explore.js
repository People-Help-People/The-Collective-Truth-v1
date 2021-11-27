import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Explore() {
    const [query, setQuery] = useState('');

    const explorContainer = {
        width: "80%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px'
    };

    const topSearch = {
        'Wrapped Bitcoin (WBTC)': '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        'Ethereum (ETH)': '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        'SHIBA INU (SHIB)': '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        'Basic Attention Token (BAT)': '0x0d8775f648430679a709e98d2b0cb6250d2887ef'
    }

    return (
        <div style={explorContainer}>
            <div className="searchBar">
                <input type="text" placeholder="Paste Token Address" onChange={(e) => setQuery(e.target.value)} />
                <Link to={`/explore/${query}`}>
                    <button>Submit</button>
                </Link>
            </div>
            <div className="topSearch">
                <h2>Top Searches</h2>
                <ListGroup>
                    {Object.keys(topSearch).map((key, index) => (
                        <Link to={`/explore/${topSearch[key]}`} key={index}>
                            <ListGroup.Item>{key}</ListGroup.Item>
                        </Link>
                    ))}
                </ListGroup>
            </div>
        </div>
    )
}