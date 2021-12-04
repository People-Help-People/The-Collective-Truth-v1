import { useEffect, useState } from "react"
import { useContractFunction, useContractCall, useEthers } from "@usedapp/core"
import CommunityAudits from "../../chain-info/CommunityAudits.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../../chain-info/map.json"
import { useDisplayAlert } from "../../context/Alert"

export const useRegisterUser = (setLoading,nextCycle) => {
    const { showAlertMessage } = useDisplayAlert();

    const { abi } = CommunityAudits
    const { chainId } = useEthers()
    const communityAuditsContractAddress = chainId ? networkMapping[String(chainId)]["CommunityAudits"][0] : constants.AddressZero;
    const communityAuditsInterface = new utils.Interface(abi);
    const communityAuditsContract = new Contract(
        communityAuditsContractAddress,
        communityAuditsInterface

    )
    const { send: registerUserSend, state: registerUserState } = useContractFunction(communityAuditsContract, "registerUser", {
        transactionName: "Register User",
    })

    const registerUser = (userAddress) => {
        registerUserSend(userAddress);
    }

    useEffect(() => {
        if (registerUserState.status === "Success") {
            showAlertMessage("Welcome to the Collective Truth Network, it's a pleasure to have you", "success");
            setLoading(false);
            nextCycle();
        } else if (registerUserState.status === "Exception") {
            showAlertMessage(registerUserState.errorMessage, "danger");
            setLoading(false);
        }
    }, [registerUserState])

    return [registerUser];
}
