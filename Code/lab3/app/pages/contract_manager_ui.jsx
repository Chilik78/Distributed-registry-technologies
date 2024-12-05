import UserInfo from "./user_info";
import TokenSender from "./token_sender";
import { useState, useEffect } from "react";

import TokenJSON from "../../../token-contract/build/contracts/Token.json" with {type: "json"};

const TOKEN_ABI = TokenJSON.abi;
const TOKEN_CONTRACT_ADDRESS = "0x6FBBBD23BDB04De46902Fc2E5c74f0F0C5B07617";
const TOKEN_DECIMALS = 18;

export default function ContractManager({web3, userAddress}) {

    const [state, setState] = useState(undefined);
    const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_CONTRACT_ADDRESS);

    return ( 
        <>
            <UserInfo 
                state={state}
                userAddress={userAddress} 
                tokenContract={tokenContract}
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