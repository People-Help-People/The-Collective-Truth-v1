import { useContractCall, useEthers } from "@usedapp/core"
import CommunityAudits from "../../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import networkMapping from "../../chain-info/map.json"


export const useTruthBalance = () => {
    const { abi } = CommunityAudits
    const { chainId } = useEthers()
    const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    // console.log("useTruthBalance", communityAuditsContractAddress2)
    // const communityAuditsContractAddress = "0x21823EF61f71730C1Dd8973A76D69E1FF14De111";
    const communityAuditsInterface = new utils.Interface(abi);

    const balanceResponse = useContractCall({
        abi: communityAuditsInterface,
        address: communityAuditsContractAddress,
        method: "truthBalance",
        args: [],
    }) ?? [];

    const balanceData = balanceResponse?.length > 0 ? { data: balanceResponse[0] } : {
        empty: true,
        message: '',
    }
    return [balanceData];
}
