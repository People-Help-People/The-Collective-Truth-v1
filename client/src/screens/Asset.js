
import { useParams } from 'react-router';
import { Image, Tabs, Tab } from 'react-bootstrap'
import Ratings from '../components/Ratings';
import { useFetchAsset } from '../hooks/asset/useFetchAsset';
import Comments from '../components/Comments';


export default function Asset() {
    let { id } = useParams();
    const [loading, asset] = useFetchAsset(id);


    return (
        <div>
            {loading ? <div>Loading...</div> : asset.empty ? <div>{asset.message}</div> :
                <div className="assetContainer">
                    <h1>{asset.name} ({asset.symbol})</h1>
                    <Image src={asset.logo} rounded height="64px" />
                    <Tabs defaultActiveKey="tab1" className="mb-3" style={{ justifyContent: 'center' }} mountOnEnter>
                        <Tab eventKey="tab1" title="General">
                            <Ratings asset={asset} assetAddress={id} />
                        </Tab>
                        <Tab eventKey="tab2" title="Discussions">
                            <Comments assetAddress={id} />
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