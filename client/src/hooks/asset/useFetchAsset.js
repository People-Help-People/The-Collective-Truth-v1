import { useEffect, useState } from 'react';
import apis from '../../apis';

export const useFetchAsset = (id) => {
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

    return [loading, asset];
}