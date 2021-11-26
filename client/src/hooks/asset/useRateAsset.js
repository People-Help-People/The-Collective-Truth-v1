import { useEffect, useState } from "react"
import { useContractFunction, useContractCall, useEthers } from "@usedapp/core"
import CommunityAudits from "../../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../../chain-info/map.json"
import { useDisplayAlert } from "../../context/Alert"

export const useRateAsset = (assetAddress, setLoading) => {
    const { showAlertMessage } = useDisplayAlert();

    const { abi } = CommunityAudits
    // const { chainId } = useEthers()
    // const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    const communityAuditsContractAddress = "0x21823EF61f71730C1Dd8973A76D69E1FF14De111";
    const communityAuditsInterface = new utils.Interface(abi);
    const communityAuditsContract = new Contract(
        communityAuditsContractAddress,
        communityAuditsInterface
    )
    const { send: rateAssetSend, state: rateAssetState } =
        useContractFunction(communityAuditsContract, "rateAsset", {
            transactionName: "Rate Asset",
        })

    const rateAsset = (ratings1, ratings2, ratings3) => {
        rateAssetSend(assetAddress, ratings1, ratings2, ratings3);
    }
    useEffect(() => {
        if (rateAssetState.status === "Success") {
            showAlertMessage("Thanks for submitting your vote. Every vote counts!", "success");
            setLoading(false);
        } else if (rateAssetState.status === "Exception") {
            showAlertMessage(rateAssetState.errorMessage, "danger");
            setLoading(false);
        }
    }, [rateAssetState]);

    return [rateAsset, rateAssetState];
}
