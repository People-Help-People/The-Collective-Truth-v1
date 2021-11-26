import { useState } from "react";
import { Col, Row, ListGroup, Badge, Form } from "react-bootstrap";
import { useAssetRatings } from "../hooks/asset/useAssetRatings";
import { useRateAsset } from "../hooks/asset/useRateAsset";
import { useRequestAsset } from "../hooks/asset/useRequestAsset";
import SpinnerLoading from "../misc/Spinner";

export default function Ratings({ asset, assetAddress }) {
    const [ratings1, setRatings1] = useState(5);
    const [ratings2, setRatings2] = useState(5);
    const [ratings3, setRatings3] = useState(5);
    const [loading, setLoading] = useState(false);

    const [ratings : assetRating] = useAssetRatings(assetAddress);
    const [rateAsset] = useRateAsset(assetAddress, setLoading);
    const [requestAsset] = useRequestAsset(setLoading);

    const requestAssetHandler = () => {
        setLoading(true);
        requestAsset(asset, assetAddress);
    }

    const submitVote = () => {
        console.log(ratings1, ratings2, ratings3);
        setLoading(true);
        rateAsset(ratings1, ratings2, ratings3);
    }

    return ratings.empty ? (
        <div>
            <h3>Asset not found on the chain</h3>
            <p>Now be a good lad and request for the asset so everyone could see the asset you were looking for</p>
            <button className="primary" onClick={requestAssetHandler}>
                {loading ? <SpinnerLoading /> : "Request Asset"}
            </button>
            <p>The dev team is working on rewarding good folks like you...</p>
        </div>
    ) :
        (
            <div>
                <Row>
                    <h1 style={{ float: 'left' }}>
                        Overall Score : {ratings.overallScore} /10
                    </h1>
                </Row>
                <Row className="mt-3">
                    <Col md={8}>
                        <ListGroup as="ol" numbered className="scoreList">
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Technical Implementation</div>
                                </div>
                                <Badge variant="primary" pill>
                                    {ratings?.technicalImplementation || 0}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Trust Factor</div>
                                </div>
                                <Badge variant="primary" pill>
                                    {ratings?.trustFactor || 0}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Founder Reliability</div>
                                </div>
                                <Badge variant="primary" pill>
                                    {ratings?.founderReliability || 0}
                                </Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
                        <ListGroup as="ol" className="rateScores">
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-1">
                                    <div className="fw-bold">
                                        <Form.Range value={ratings1 * 10} onChange={(e) => { setRatings1(Math.floor(e.target.value / 10)) }} />
                                    </div>
                                </div>
                                <Badge variant="primary" pill>
                                    {ratings1}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">
                                        <Form.Range value={ratings2 * 10} onChange={(e) => { setRatings2(Math.floor(e.target.value / 10)) }} />
                                    </div>
                                </div>
                                <Badge variant="primary" pill>
                                    {ratings2}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">
                                        <Form.Range value={ratings3 * 10} onChange={(e) => { setRatings3(Math.floor(e.target.value / 10)) }} />
                                    </div>
                                </div>
                                <Badge variant="primary" pill>
                                    {ratings3}
                                </Badge>
                            </ListGroup.Item>
                        </ListGroup>
                        <button onClick={submitVote} className="primary mt-3">
                            {loading ? <SpinnerLoading /> : "Submit Vote"}
                        </button>
                    </Col>
                </Row>
            </div>

        )
}