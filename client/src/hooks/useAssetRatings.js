import { useContractCall } from "@usedapp/core"
import CommunityAudits from "../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import networkMapping from "../chain-info/map.json"

export const useAssetRatings = (assetAddress) => {
    const { abi } = CommunityAudits
    // const { chainId } = useEthers()
    // const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    const communityAuditsContractAddress = "0x21823EF61f71730C1Dd8973A76D69E1FF14De111";
    const communityAuditsInterface = new utils.Interface(abi);

    try {
        const ratingsData = useContractCall({
            abi: communityAuditsInterface,
            address: communityAuditsContractAddress,
            method: "getData",
            args: [assetAddress],
        }) || [];

        return [ratingsData];
    } catch (error) {
        console.log(error);
        return [[]];
    }
}
