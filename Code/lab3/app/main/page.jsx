"use client"
import { ConnectWallet } from "../pages/connect_wallet";
import ContractManager from "../pages/contract_manager_ui";
import { useState } from "react";
import Web3 from "web3";

export default function Main(){

    const [web3, setWeb3] = useState(undefined);
    const [userAddress, setUserAddress] = useState(undefined);
    const funcConnectToWallet = async () => {
        const gettingWeb3 = new Web3(window.ethereum);
        const [address] = await window.ethereum.enable();
        setUserAddress(address);
        setWeb3(gettingWeb3); 
    };

    return(
        <>
            {userAddress === undefined ? <></> : <ContractManager web3={web3} userAddress={userAddress}/>}
            {web3 === undefined ? <ConnectWallet handleConnect={funcConnectToWallet}/> : <></>}
        </>
    );
}