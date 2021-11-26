import { useEffect, useState } from 'react';
import apis from '../apis';
import { useAssetRatings } from './useAssetRatings';

export const useFetchAsset = (id) => {
    const [asset, setAsset] = useState({
        empty: true,
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [ratingsData] = useAssetRatings(id);

    const [assetRating, setAssetRating] = useState({
        empty: true,
        message: '',
    });
    const updateRatings = () => {
        
    }
    useEffect(() => {
        if (ratingsData.length > 0) {
            const assetArray = ratingsData[0];
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
    }, [ratingsData]);

    useEffect(() => {
        const search = async () => {
            setLoading(true);
            const data = await apis.asset.get(id);
            if (data.success) {
                setAsset(data.data);
                updateRatings();
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