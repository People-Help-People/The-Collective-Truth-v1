// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.6 <0.9.0;

import "./Asset.sol";
import "./TruthToken.sol";

contract CollectiveTruth {
    Asset[] public assetContracts;
    mapping(address => address) public assetContractsMap;
    TruthToken public truthTokens;
    mapping(address => bool) public users; // later to be converted to an add=>add map for profile NFTs

    constructor() {
        truthTokens = new TruthToken(1614317 * 10**18);
    }

    function setUsers(address _address, bool flag) public {
        users[_address] = flag;
    }

    function getUsers(address _address) public view returns (bool) {
        return users[_address];
    }

    function registerUser(address _address,uint256 _initialTokens) public {        
        users[_address] = true;
        truthTokens.transfer(_address, _initialTokens);
    }

    function createAsset(
        address _contract,
        string memory _name,
        string memory _symbol,
        string memory _imageURL,
        CATEGORY _category
    ) public {
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

    function getAssetContractsMap(address _contract)
        public
        view
        returns (address)
    {
        return assetContractsMap[_contract];
    }

    function transferTokens(address _to, uint256 _amount) public {
        truthTokens.transfer(_to, _amount);
    }

    function getTokenBalance(address _owner) public view returns (uint256) {
        return truthTokens.balanceOf(_owner);
    }
}
