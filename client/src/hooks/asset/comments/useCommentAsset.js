import { useEffect, useState } from "react"
import { useContractFunction, useContractCall, useEthers } from "@usedapp/core"
import CommunityAudits from "../../../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../../../chain-info/map.json"
import { useDisplayAlert } from "../../../context/Alert"

export const useCommentAsset = (assetAddress, setLoading) => {
    const { showAlertMessage } = useDisplayAlert();

    const { abi } = CommunityAudits
    const { chainId } = useEthers()
    const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    const communityAuditsInterface = new utils.Interface(abi);
    const communityAuditsContract = new Contract(
        communityAuditsContractAddress,
        communityAuditsInterface
    )
    const { send: commentAssetSend, state: commentAssetState } =
        useContractFunction(communityAuditsContract, "commentAsset", {
            transactionName: "Comment Asset",
        })

    const commentAsset = (message) => {
        console.log(assetAddress, message);
        commentAssetSend(assetAddress, message);
    }
    useEffect(() => {
        if (commentAssetState.status === "Success") {
            showAlertMessage("Thanks for submitting your bold comment. Keep going!", "success");
            setLoading(false);
        } else if (commentAssetState.status === "Exception") {
            showAlertMessage(commentAssetState.errorMessage, "danger");
            setLoading(false);
        }
    }, [commentAssetState]);

    return [commentAsset, commentAssetState];
}
