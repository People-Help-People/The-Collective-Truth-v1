import { useContractCall, useEthers } from "@usedapp/core"
import CommunityAudits from "../../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import networkMapping from "../../chain-info/map.json"


export const useAssetRatings = (assetAddress) => {
    const { abi } = CommunityAudits
    const { chainId } = useEthers()
    const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    // console.log("useAssetRatings", communityAuditsContractAddress2)
    // const communityAuditsContractAddress = "0x21823EF61f71730C1Dd8973A76D69E1FF14De111";
    const communityAuditsInterface = new utils.Interface(abi);

    const ratingsResponse = useContractCall({
        abi: communityAuditsInterface,
        address: communityAuditsContractAddress,
        method: "getData",
        args: [assetAddress],
    }) ?? [];

    const ratingsData = ratingsResponse?.length > 0 ? {
        technicalImplementation: ratingsResponse[0][5].technicalImplementation.toNumber(),
        founderReliability: ratingsResponse[0][5].founderReliability.toNumber(),
        trustFactor: ratingsResponse[0][5].trustFactor.toNumber(),
        overallScore: ratingsResponse[0][5].overallScore.toNumber(),
    } : {
        empty: true,
        message: '',
    }
    return [ratingsData];
}
