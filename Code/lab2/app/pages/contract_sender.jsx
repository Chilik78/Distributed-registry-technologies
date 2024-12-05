'use client'
import Web3 from "web3";
import "../assets/styles/contract_sender.css";
import { useState, useEffect } from "react";
import PosterJson from '../../../poster-contract/build/contracts/Poster.json' with {type: 'json'};
import { HistoryContainer } from "./history_container";
import { Sender } from "./sender";

const ABI = [...PosterJson.abi]

export function ContractSender({web3, userAddress}) {

    const CONTRACT_ADDRESS = '0x9C3C85d17Ae00A2E13c52bfa3CbE911862E8B2Db';
    const CONTRACT = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    const  [state, setState] = useState(undefined);
    
    return (  
        <>
            <address id='user-address'>{"Адрес пользователя: " + userAddress}</address>
            <HistoryContainer contract={CONTRACT}/>
            <Sender contract={CONTRACT} userAddress={userAddress} updateFunc={setState}/>
        </>
    );
}