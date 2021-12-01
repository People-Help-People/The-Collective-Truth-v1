// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.6 <0.9.0;

struct Comment {
    address user;
    string message;
    uint256 upvotes;
    uint256 downvotes;    
}
enum VOTE {
    UP,
    DOWN
}
struct Rating {
    uint256 overallScore;
    uint256 technicalImplementation;
    uint256 trustFactor;
    uint256 founderReliability;
}
enum CATEGORY {
    Token,
    DApp,
    NFT
}
struct Data {
    address assetAddress;
    string name;
    string symbol;
    string imageURL;
    CATEGORY category;
    Rating rating;
}

contract Asset {
    address public assetAddress;
    string public name;
    string public symbol;
    string public imageURL;
    CATEGORY public category;

    Rating public rating;
    address[] ratedUsers;
    mapping(address => bool) ratedUsersMap;

    Comment[] public comments;
    mapping(address => bool) userCommentMap;
    mapping(address => mapping(uint256 => bool)) votedUsers;

    constructor(
        address _contract,
        string memory _name,
        string memory _symbol,
        string memory _imageURL,
        CATEGORY _category
    ) {
        assetAddress = _contract;
        name = _name;
        symbol = _symbol;
        imageURL = _imageURL;
        category = _category;
    }

    function data() public view returns (Data memory) {
        Data memory returnData = Data(
            assetAddress,
            name,
            symbol,
            imageURL,
            category,
            rating
        );
        return returnData;
    }

    function getComments() public view returns (Comment[] memory){
        return comments;
    }

    modifier UniqueRater(address _address) {
        require(ratedUsersMap[_address] == false, "You can only rate once!!!");
        ratedUsersMap[_address] = true;
        _;
    }

    function rate(
        address _address,
        uint256 _technicalImplementation,
        uint256 _trustFactor,
        uint256 _founderReliability
    ) public UniqueRater(_address) {
        uint256 n = ratedUsers.length;
        rating.technicalImplementation = appendMetric(
            rating.technicalImplementation,
            _technicalImplementation,
            n
        );
        rating.trustFactor = appendMetric(rating.trustFactor, _trustFactor, n);
        rating.founderReliability = appendMetric(
            rating.founderReliability,
            _founderReliability,
            n
        );
        uint256 overallScore = (_technicalImplementation +
            _trustFactor +
            _founderReliability) / 3;
        rating.overallScore = appendMetric(
            rating.overallScore,
            overallScore,
            n
        );
        ratedUsers.push(_address);
    }

    function appendMetric(
        uint256 a,
        uint256 b,
        uint256 n
    ) private pure returns (uint256) {
        return (a * n + b) / (n + 1);
    }

    modifier UniqueCommenter(address _address) {
        require(
            userCommentMap[_address] == false,
            "You can only post once!!!"
        );
        userCommentMap[_address] = true;
        _;
    }

    function postComment(address _address,string memory _message) public UniqueCommenter(_address) {
        Comment storage newComment = comments.push();
        newComment.user = _address;
        newComment.message = _message;
        userCommentMap[_address] = true;
    }

    modifier UniqueVoter(uint256 _comment,address _address) {
        require(
            votedUsers[_address][_comment] == false ,
            "You can only vote once!!!"
        );
        votedUsers[_address][_comment] = true;
        _;
    }

    function voteComment(address _address, uint256 _comment, VOTE _vote)
        public
        UniqueVoter(_comment,_address)
    {
        if (_vote == VOTE.UP) {
            comments[_comment].upvotes++;
        } else if (_vote == VOTE.DOWN) {
            comments[_comment].downvotes++;
        }
    }
}
