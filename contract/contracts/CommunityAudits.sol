// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.6 <0.9.0;

import "./Asset.sol";
import "./TruthToken.sol";
import "./CollectiveTruth.sol";

// store a map of asset contracts
// onboard assets to master if not available

contract CommunityAudits {
    CollectiveTruth public data;

    constructor(CollectiveTruth _data) {
        data = CollectiveTruth(_data);
    }

    modifier checkExistingUser() {
        require(data.getUsers(msg.sender) == false, "User already registered.");
        _;
    }

    function registerUser() public checkExistingUser {
        data.registerUser(msg.sender,0);
    }

    function truthBalance(address _user) public view returns (uint256) {
        return data.getTokenBalance(_user);
    }

    modifier rewardUsers(uint256 _reward) {
        if (data.getUsers(msg.sender) == false) {
            registerUser();
        }
        _;
        data.transferTokens(msg.sender, _reward);
    }

    modifier checkExistingAsset(address _contract){
        require(
            data.getAssetContractsMap(_contract) == address(0),
            "This asset is already added to the system."
        );
        _;
    }

    function createAsset(
        address _contract,
        string memory _name,
        string memory _symbol,
        string memory _imageURL,
        CATEGORY _category
    ) public payable checkExistingAsset(_contract) rewardUsers(10**18) {
        data.createAsset(_contract, _name, _symbol, _imageURL, _category);
    }

    modifier checkAsset(address _contract) {
        require(
            data.getAssetContractsMap(_contract) != address(0),
            "Sorry this asset is not available, Please consider adding it to the system."
        );
        _;
    }

    function getAssetRatings(address _contract)
        public
        view
        checkAsset(_contract)
        returns (Data memory)
    {
        Asset assetContract = Asset(
            address(data.getAssetContractsMap(_contract))
        );
        return assetContract.data();
    }

    function getAssetComments(address _contract)
        public
        view
        checkAsset(_contract)
        returns (Comment[] memory)
    {
        Asset assetContract = Asset(
            address(data.getAssetContractsMap(_contract))
        );
        return assetContract.getComments();
    }

    function rateAsset(
        address _contract,
        uint256 _technicalImplementation,
        uint256 _trustFactor,
        uint256 _founderReliability
    ) public payable checkAsset(_contract) rewardUsers(10**17) {
        Asset assetContract = Asset(
            address(data.getAssetContractsMap(_contract))
        );
        assetContract.rate(
            msg.sender,
            _technicalImplementation,
            _trustFactor,
            _founderReliability
        );
    }

    function commentAsset(address _contract, string memory message)
        public
        payable
        checkAsset(_contract)
        rewardUsers(5 * 10**17)
    {
        Asset assetContract = Asset(
            address(data.getAssetContractsMap(_contract))
        );
        assetContract.postComment(msg.sender, message);
    }

    function voteComment(
        address _contract,
        uint256 _comment,
        VOTE _vote
    ) public payable checkAsset(_contract) rewardUsers(10**17) {
        Asset assetContract = Asset(
            address(data.getAssetContractsMap(_contract))
        );
        assetContract.voteComment(msg.sender, _comment, _vote);
    }
}
