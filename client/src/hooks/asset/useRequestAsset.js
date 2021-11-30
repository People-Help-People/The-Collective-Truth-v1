import { useEffect, useState } from "react"
import { useContractFunction, useContractCall, useEthers } from "@usedapp/core"
import CommunityAudits from "../../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../../chain-info/map.json"
import { useDisplayAlert } from "../../context/Alert"

export const useRequestAsset = (setLoading) => {
    const { showAlertMessage } = useDisplayAlert();

    const { abi } = CommunityAudits
    const { chainId } = useEthers()
    const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    const communityAuditsInterface = new utils.Interface(abi);
    const communityAuditsContract = new Contract(
        communityAuditsContractAddress,
        communityAuditsInterface

    )
    const { send: requestAssetSend, state: requestAssetState } = useContractFunction(communityAuditsContract, "create", {
        transactionName: "Create"
    })

    const requestAsset = (asset, assetAddress) => {
        requestAssetSend(assetAddress, asset.name, asset.symbol, asset.logo, 0);
    }

    useEffect(() => {
        if (requestAssetState.status === "Success") {
            showAlertMessage("Successfully added asset to the chain. Thank You!", "success");
            setLoading(false);
        } else if (requestAssetState.status === "Exception") {
            showAlertMessage(requestAssetState.errorMessage, "danger");
            setLoading(false);
        }
    }, [requestAssetState])

    return [requestAsset];
}
