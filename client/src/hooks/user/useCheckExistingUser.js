import { useContractCall, useEthers } from "@usedapp/core"
import CollectiveTruth from "../../chain-info/CollectiveTruth.json"
import { utils, constants } from "ethers"
import networkMapping from "../../chain-info/map.json"


export const useCheckExistingUser = (userAddress) => {
    const { abi } = CollectiveTruth
    const { chainId } = useEthers()
    const address = chainId ? networkMapping[String(chainId)]["CollectiveTruth"][0] : constants.AddressZero;
    // console.log("useCheckExistingUser", communityAuditsContractAddress2)
    // const communityAuditsContractAddress = "0x21823EF61f71730C1Dd8973A76D69E1FF14De111";
    const collectiveTruthInterface = new utils.Interface(abi);

    const response = useContractCall({
        abi: collectiveTruthInterface,
        address: address,
        method: "getUsers",
        args: [userAddress],
    }) ?? [];

    const authState = response?.length > 0 ? { loading: false, data: response[0] } : {
        loading: true,
    };
    return [authState];
}
