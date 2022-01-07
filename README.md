# The Collective Truth
[![image](https://user-images.githubusercontent.com/33366456/145701951-0a66085e-dd48-4d0a-b3b4-0be8837f0f0a.png)](https://www.youtube.com/watch?v=GGjS77ZFVV0 "The Collective Truth - Demo")

## Short Pitch
### Pain
Web3 assets like NFTs,CryptoCurrencies, Dapps are being used heavily due to its decentralised nature. But the information about them isn't collected,stored and mainted in the same way. It is usually a third party Audit company that prepares complex audits for the general crowd. The best we got so far are discuss channels on block explorers. But it isn't really effective for the general.
### Target Audience
- People who are looking to simply gain insights(technical+people's opinion) about an asset
- People who want to engage with the community discussions
- Serious people who pay to get detailed reports of an asset
- Smart people who can provide value with their analysis
### Solution
The Collective Truth offers target audience the collective truth which is credible and reliable as its enriched by the community. There is no single entity gaining profit or manipulating the information to make a quick buck. The information itself is validated and stored in a decentralised manner like the web3 asset itself.

Keeping the above solution in mind, the project achieves it with following features included in the USP release:
1. community discussions 
2. Ratings, scoring 
3. SMEs audit reports, detailed analysis. 

## Project start date
23 November 2021
## Wallet
Metamask: 0xCe58416Ee53Adf3722E8a9AB413265fC356F784f
## Person of contact
- Harish R
- [DM me on Twitter](https://twitter.com/harishteens)

## Additional information
The Collective Truth is envisioned to be a fully autonomous, robust, community driven project leaving the creator(me) behind. This is why all the initally minted tokens are held by the smart contract and the creator(me). The creator is just another user and there is no spooky transfer tokens in built to withdraw all the funds from the contract at a later time. Rewards are the only way to gain access to some tokens.

If it wasn't completely non-profit and decentralised, then it would defeat the point of having such a system. And that is why the project was submitted to **Community & NFTs** tracks.

To help add more features to project, there is a wild idea to reward github users who make valid PRs. But that is way ahead in the future...

## Project Documentation

### Folder Structure
1. client
2. server
3. contract

### Prerequistes
To be able to run the project, you need to install the following dependencies first:
1. NodeJS, NPM, YARN
2. Python3, Brownie

You would also need:
1. A Test Metamask Account's private key
2. Alchemy Project ID
3. POLYGONSCAN API KEY

### Architecture
- The Client is built with **ReactJS** and deployed to **Firebase**.
- A basic **Express** server deployed to **Heroku**
- All the smart contracts are writted in **Solidity** and deployed to **Polygon Mumbai Testnet**. 
> One can deploy the smart contracts to any chain, just make sure you have the chain's currency on your wallet. For example, Polygon => Polygon Mumbai Testnet.

### Overview
For easy upgrades to the functionality layer of the contracts. The `The Collective Truth` Smart contract is separated out from the `Community Audits` main contract. This was done to prevent restting token and asset data everytime an update is pushed. **This is only a temporary fix.**

## Local setup
### Client
1. Clone the repo from GitHub.
2. Install all the dependencies on the client directory:
```
cd /client
yarn install
```
3. Start the React Server
```
yarn start
```
4. [Optional] To deploy it to firebase.
```
npm -g firebase-tools
firebase init
firebase deploy
```

### Contract
1. Make changes to the smart contract and compile it with
```
brownie compile
```
2. If you wish to deploy to Polygon Mumbai Testnet via Alchemy, you need to add the network first by
```
brownie networks add Polygon polygon-mumbai name="Polygon Mumbai (Alchemy)" host='$WEB3_ALCHEMY_PROJECT_URL' chainid=80001 explorer=https://api-testnet.polygonscan.com/api 
```
> Make sure you have your `.env` populated with appropriate keys
3. Deploy the contract to the chain
```
brownie run scripts/deploy.py --network polygon-mumbai
```

### Server
1. Install dependencies with `yarn install`.
2. Place the COINMARKETCAP API KEY in the `.env`
3. Run `node index.js`
