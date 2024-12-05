import { useState, useEffect } from "react";



export default function UserInfo({userAddress, tokenContract, tokenDecimals, state}) {

    const [ownerAddr, setOwnerAddr] = useState(undefined);
    const [balance, setBalance] = useState(undefined);

    const getOwner = async () => { 
        const _ownerAddr = await tokenContract.methods.owner().call({ from: userAddress });
        setOwnerAddr(_ownerAddr.toLowerCase());
    };

    const getBalance = async () => {
        const _balance = await tokenContract.methods.balanceOf(userAddress).call();
        const new_balance = (Number(_balance)/ (10**tokenDecimals)).toLocaleString();
        // alert(`Новый баланс: ${new_balance}\nСтарый баланс: ${balance}`);
        setBalance(new_balance);
    }

    useEffect(() => {   
        getOwner();
        getBalance();
    }, [state]);

    return ( 
        <>
            {
                userAddress === ownerAddr ? 
                <address id='user-address'>{"Адрес пользователя: " + userAddress + "\nЯвляется владельцем"}</address> 
                : <address id='user-address'>{"Адрес пользователя: " + userAddress}</address> 
            }
            <h5 key={balance} style={{textAlign: "center", marginTop: "5vh"}}>Баланс: {balance}</h5>
        </>
    );
}