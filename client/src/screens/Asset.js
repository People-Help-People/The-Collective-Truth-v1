import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apis from '../apis';
import { Image, Tabs, Tab, Row, Col } from 'react-bootstrap'
import Ratings from '../components/Ratings';

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
                <div className="assetContainer">
                    <h1>{asset.name} ({asset.symbol})</h1>
                    <Image src={asset.logo} rounded height="64px" />
                    <Tabs defaultActiveKey="tab1" id="assetTabs" className="mb-3">
                        <Tab eventKey="tab1" title="General">
                            <Ratings ratings={asset.ratings} />
                        </Tab>
                        <Tab eventKey="tab2" title="Community">
                            Coming soon...
                        </Tab>
                        <Tab eventKey="tab3" title="Experts">
                            Coming soon...
                        </Tab>
                    </Tabs>
                </div>
            }

        </div >
    )
}