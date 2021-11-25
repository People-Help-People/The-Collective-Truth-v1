import { useState } from "react";
import { Col, Row, ListGroup, Badge, Form } from "react-bootstrap";

export default function Ratings({ ratings }) {
    const [ratings1, setRatings1] = useState(5);
    const [ratings2, setRatings2] = useState(5);
    const [ratings3, setRatings3] = useState(5);

    return (
        <div>
            <Row>
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
                                {ratings?.technical_implementation || 0}
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
                                {ratings?.trust_factor || 0}
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
                                {ratings?.founder_reliability || 0}
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
                    <button className="primary mt-3">
                        Submit Vote
                    </button>
                </Col>
            </Row>
            <Row>

            </Row>
        </div>

    )
}