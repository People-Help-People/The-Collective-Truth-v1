import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { Col, Row, ListGroup, Badge, Form } from "react-bootstrap";
import { useAssetComments } from "../hooks/asset/comments/useAssetComments";
import { useCommentAsset } from "../hooks/asset/comments/useCommentAsset";
import { useRequestAsset } from "../hooks/asset/useRequestAsset";
import SpinnerLoading from "../misc/Spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointUp, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import { useVoteComment } from "../hooks/asset/comments/useVoteComment";

export default function Comments({ assetAddress }) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const [comments] = useAssetComments(assetAddress);
    const [commentAsset] = useCommentAsset(assetAddress, setLoading);
    const [voteComment] = useVoteComment(assetAddress, setLoading);
    // const comments = [];

    const { account } = useEthers();

    const submitComment = (e) => {
        e.preventDefault();
        setLoading(true);
        commentAsset(comment);
        setComment("");
    }
    return (
        <div>
            <form onSubmit={submitComment}>
                <input type="text" placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                {
                    account ?
                        (<button className="primary" type="submit">
                            {loading ? <SpinnerLoading /> : "Post"}
                        </button>) :
                        (<button className={"mt-3 disabled"} disabled>
                            Post
                        </button>)
                }
            </form>

            {
                comments.empty ?
                    <div>
                        <h3>No comments yet</h3>
                    </div>
                    : (
                        <div>
                            <h3>Comments</h3>
                            <ListGroup as="ol">
                                {
                                    comments?.data.map((comment, index) => (
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                            key={comment[0]}
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{comment[1]}</div>
                                                by {comment[0].substring(0, 6) + "..."}
                                            </div>
                                            {
                                                account ?
                                                    (<button className="primary" onClick={() => voteComment(index, 0)}>
                                                        {loading ? <SpinnerLoading /> : <FontAwesomeIcon icon={faHandPointUp} />}
                                                    </button>) :
                                                    (<button className={"mt-3 disabled"} disabled>
                                                        <FontAwesomeIcon icon={faHandPointUp} />
                                                    </button>)
                                            }
                                            <Badge variant="primary" pill>
                                                {comment[2].toNumber()}
                                            </Badge>
                                            {
                                                account ?
                                                    (<button className="primary" onClick={() => voteComment(index, 1)}>
                                                        {loading ? <SpinnerLoading /> : <FontAwesomeIcon icon={faHandPointDown} />}
                                                    </button>) :
                                                    (<button className={"mt-3 disabled"} disabled>
                                                        <FontAwesomeIcon icon={faHandPointUp} />
                                                    </button>)
                                            }
                                            <Badge variant="primary" pill>
                                                {comment[3].toNumber()}
                                            </Badge>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </div>
                    )
            }
        </div>
    )
}