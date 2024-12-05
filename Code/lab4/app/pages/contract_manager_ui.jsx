import { ContractSender } from "./contract_sender";
import UserInfo from "./user_info";
import TokenSender from "./token_sender";
import { useState, useEffect } from "react";

import PosterJSON from "../../../token-gated-poster/build/contracts/Poster.json" with {type: "json"};
import TokenJSON from "../../../token-gated-poster/build/contracts/Token.json" with {type: "json"};

const POSTER_ABI = PosterJSON.abi;
const TOKEN_ABI = TokenJSON.abi;
const TOKEN_CONTRACT_ADDRESS = "0x8AC005Dc94d2C89D7dfbB286087F202Ad5233B1d";
const POSTER_CONTRACT_ADDRESS = '0xEa8232215E5Da022Ab38A48Db660fBFe7Df534e8';
const TOKEN_DECIMALS = 18;

export default function ContractManager({web3, userAddress}) {

    const [state, setState] = useState(undefined);
    const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_CONTRACT_ADDRESS);
    const posterContract = new web3.eth.Contract(POSTER_ABI, POSTER_CONTRACT_ADDRESS);

    const setThreshold = async () => {
        try{
            await posterContract.methods.setTokenAddress(TOKEN_CONTRACT_ADDRESS).send({from: userAddress});
            await posterContract.methods.setThreshold(10 * (10**TOKEN_DECIMALS)).send({from: userAddress});
        }
        catch (e){
            alert("ОШИБКА. НЕ УСТАНОВЛЕН АДРЕСС ТОКЕНА И ГРАНИЦА");
        }
    };

    useEffect(() =>{setThreshold();}, []);

    return ( 
        <>
            <UserInfo 
                state={state}
                userAddress={userAddress} 
                tokenContract={tokenContract}
                tokenDecimals={TOKEN_DECIMALS}
            />          
            <ContractSender 
                userAddress={userAddress} 
                updateFunc={setState}
                posterContract={posterContract}
                state={state}
                tokenDecimals={TOKEN_DECIMALS}
            />
            <TokenSender 
                userAddress={userAddress}
                tokenContract={tokenContract}
                updateFunc={setState}
                tokenDecimals={TOKEN_DECIMALS}
            />
        </>
    );
}