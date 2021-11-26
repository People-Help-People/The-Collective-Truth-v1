import { useEffect, useState } from 'react';
import apis from '../apis';
import { useAssetRatings } from './useAssetRatings';

export const useFetchAsset = (id) => {
    const [asset, setAsset] = useState({
        empty: true,
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [data] = useAssetRatings(id);

    const [assetRating, setAssetRating] = useState({
        empty: true,
        message: '',
    });
    useEffect(() => {
        console.log(data);
        if (data.length > 0) {
            const assetArray = data[0];
            setAssetRating({
                technicalImplementation: parseInt(assetArray[5].technicalImplementation._hex),
                founderReliability: parseInt(assetArray[5].founderReliability._hex),
                trustFactor: parseInt(assetArray[5].trustFactor._hex),
                overallScore: parseInt(assetArray[5].overallScore._hex),
            });
        } else {
            setAssetRating({
                empty: true,
                message: 'No ratings available',
            });
        }
        console.log(assetRating);
    }, [data]);

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

    return [loading, asset, assetRating];
}