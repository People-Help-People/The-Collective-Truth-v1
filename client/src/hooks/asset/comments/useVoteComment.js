import { useEffect, useState } from "react"
import { useContractFunction, useContractCall, useEthers } from "@usedapp/core"
import CommunityAudits from "../../../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../../../chain-info/map.json"
import { useDisplayAlert } from "../../../context/Alert"

export const useVoteComment = (assetAddress, setLoading) => {
    const { showAlertMessage } = useDisplayAlert();

    const { abi } = CommunityAudits
    const { chainId } = useEthers()
    const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    const communityAuditsInterface = new utils.Interface(abi);
    const communityAuditsContract = new Contract(
        communityAuditsContractAddress,
        communityAuditsInterface
    )
    const { send: voteCommentSend, state: voteCommentState } =
        useContractFunction(communityAuditsContract, "voteComment", {
            transactionName: "Vote Comment",
        })

    const voteComment = (comment, vote) => {
        setLoading(true);
        voteCommentSend(assetAddress, comment, vote);
    }
    useEffect(() => {
        if (voteCommentState.status === "Success") {
            showAlertMessage("Thanks for submitting your vote. Every vote counts!", "success");
            setLoading(false);
        } else if (voteCommentState.status === "Exception") {
            showAlertMessage(voteCommentState.errorMessage, "danger");
            setLoading(false);
        }
    }, [voteCommentState]);

    return [voteComment, voteCommentState];
}
