// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.6 <0.9.0;

import "./Asset.sol";
import "./TruthToken.sol";

// store a map of asset contracts
// onboard assets to master if not available

contract CommunityAudits {
    Asset[] public assetContracts;
    mapping(address => address) public assetContractsMap;
    TruthToken public truthTokens;
    address public truthTokenAddress;
    mapping(address => bool) public users; // later to be converted to an add=>add map for profile NFTs

    constructor() {
        truthTokens = new TruthToken(1614317 * 10**18);
    }

    modifier checkExistingUser() {
        require(users[msg.sender] == false, "User already registered.");
        _;
    }

    function registerUser()
        public
        checkExistingUser()
    {
        users[msg.sender] = true;
        truthTokens.transfer(msg.sender, 10 * 10**18);
    }

    function truthBalance() public view returns (uint256) {
        return truthTokens.balanceOf(msg.sender);
    }

    modifier rewardUsers(uint256 _reward){        
        require(users[msg.sender] == true, "User not registered.");
        _;
        truthTokens.transfer(msg.sender,_reward);
    }

    function create(
        address _contract,
        string memory _name,
        string memory _symbol,
        string memory _imageURL,
        CATEGORY _category
    ) payable public rewardUsers(10**18){
        Asset newContract = new Asset(
            _contract,
            _name,
            _symbol,
            _imageURL,
            _category
        );
        assetContracts.push(newContract);
        assetContractsMap[_contract] = address(newContract);
    }

    modifier checkAsset(address _contract) {
        require(
            assetContractsMap[_contract] != address(0),
            "Sorry this asset is not available, Please consider adding it to the system."
        );
        _;
    }

    function getData(address _contract)
        public
        view
        checkAsset(_contract)
        returns (Data memory)
    {
        Asset assetContract = Asset(address(assetContractsMap[_contract]));
        return assetContract.data();
    }

    function getComments(address _contract)
        public
        view
        checkAsset(_contract)
        returns (Comment[] memory)
    {
        Asset assetContract = Asset(address(assetContractsMap[_contract]));
        return assetContract.getComments();
    }

    function rateAsset(
        address _contract,
        uint256 _technicalImplementation,
        uint256 _trustFactor,
        uint256 _founderReliability
    ) public payable checkAsset(_contract) rewardUsers(10**17) {
        Asset assetContract = Asset(address(assetContractsMap[_contract]));
        assetContract.rate(
            msg.sender,
            _technicalImplementation,
            _trustFactor,
            _founderReliability
        );
    }

    function commentAsset(address _contract ,string memory message)
        public payable 
        checkAsset(_contract)
        rewardUsers(5*10**17)
    {
        Asset assetContract = Asset(address(assetContractsMap[_contract]));
        assetContract.postComment(msg.sender, message);
    }

    function voteComment(
        address _contract,
        uint256 _comment,
        VOTE _vote
    ) public payable checkAsset(_contract) rewardUsers(10**17){
        Asset assetContract = Asset(address(assetContractsMap[_contract]));
        assetContract.voteComment(msg.sender, _comment, _vote);
    }
}
