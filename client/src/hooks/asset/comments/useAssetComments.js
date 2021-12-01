import { useContractCall, useEthers } from "@usedapp/core"
import CommunityAudits from "../../../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import networkMapping from "../../../chain-info/map.json"


export const useAssetComments = (assetAddress) => {
    const { abi } = CommunityAudits
    const { chainId } = useEthers()
    const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    // console.log("useAssetRatings", communityAuditsContractAddress2)
    // const communityAuditsContractAddress = "0x21823EF61f71730C1Dd8973A76D69E1FF14De111";
    const communityAuditsInterface = new utils.Interface(abi);

    const commentsResponse = useContractCall({
        abi: communityAuditsInterface,
        address: communityAuditsContractAddress,
        method: "getComments",
        args: [assetAddress],
    }) ?? [];

    const sortedComments = commentsResponse[0]?.length ? [...commentsResponse[0]].sort((a, b) => {
        const upvotesDIff = b[2].toNumber() - a[2].toNumber();
        if(upvotesDIff !== 0) {
            return upvotesDIff;
        }
        return a[3].toNumber() - b[3].toNumber();
    }) : [];
    const commentsData = commentsResponse[0]?.length > 0 ? { data: sortedComments } : {
        empty: true,
        message: '',
    }
    console.log("useAssetComments", commentsData);
    return [commentsData];
}
