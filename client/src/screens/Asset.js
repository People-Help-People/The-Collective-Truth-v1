import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apis from '../apis';

export default function Asset() {
    let { id } = useParams();

    const [asset, setAsset] = useState({
        empty: true,
        message: '',
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const search = async () => {
            setLoading(true);
            const data = await apis.asset.get(id);
            if (data.success) {
                setAsset(data.data);
            } else {
                setAsset({
                    empty: true,
                    message: data.message,
                });
            }
            setLoading(false);
        };
        search();
    }, []);
    return (
        <div>
            {loading ? <div>Loading...</div> : asset.empty ? <div>{asset.message}</div> :
                <div>
                    <h1>{asset.name} : {asset.symbol}</h1>
                </div>
            }

        </div>
    )
}