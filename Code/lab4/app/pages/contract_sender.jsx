'use client'
import "../assets/styles/contract_sender.css";
import { HistoryContainer } from "./history_container";
import { Sender } from "./sender";

export function ContractSender({userAddress, posterContract, updateFunc, state, tokenDecimals}) {
    return (
        <>
            <HistoryContainer posterContract={posterContract} state={state}/>
            <Sender posterContract={posterContract} userAddress={userAddress} updateFunc={updateFunc} tokenDecimals={tokenDecimals}/>
        </>
    );
}