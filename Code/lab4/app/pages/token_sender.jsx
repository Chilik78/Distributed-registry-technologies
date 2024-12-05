import "../assets/styles/token_sender.css";
import { useState, useEffect } from "react";

export default function TokenSender({userAddress, tokenContract, updateFunc, tokenDecimals}) {

    const [ownerAddr, setOwnerAddr] = useState(undefined);

    const updateParent = () => {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        updateFunc(`UPDATE STATE PARENT ${rand}`);
    }

    const getOwner = async () => { 
        const _ownerAddr = await tokenContract.methods.owner().call({ from: userAddress });
        setOwnerAddr(_ownerAddr.toLowerCase());
    };

    const mintTokens = async () => {
        try {
            const toMint = document.getElementById("input-to-mint").value;
            var amountMint = BigInt(document.getElementById("input-amount-mint").value);

            amountMint = Number(amountMint) * (10**tokenDecimals)
            console.log(`TO: ${toMint}`);
            console.log(`Amount Mint: ${amountMint}`);

            await tokenContract.methods.mint(toMint, amountMint).send({ from: userAddress });
            updateParent();
        }
        catch (e) {
            alert("Неудалось исполнить по причине: " + e);
        }
    }

    const sendTokens = async () => {
        try {
            const toAddr = document.getElementById("input-to-addr").value;
            var amount = document.getElementById("input-amount").value;

            amount = Number(amount) * (10**tokenDecimals)
            await tokenContract.methods.transfer(toAddr, amount).send({ from: userAddress });
            updateParent();
        }
        catch (e) {
            alert("Неудалось исполнить по причине: " + e);
        }
    }

    useEffect(() => {   
        getOwner();
    }, []);

    return ( 
        <div id="send-token-form">
            <div id="send-form">
                <h5>Отправка токенов другому пользователю</h5>
                <input id="input-to-addr" placeholder="Введите адрес получателя"></input>
                <input id="input-amount" type="number" placeholder="Введите сколько хотите оправить"></input>
                <button onClick={sendTokens}>Отправить</button>
            </div>

            {userAddress == ownerAddr ? 
                <div id="send-form" style={{flex: 1}}>
                    <h5>Чиканка монет</h5>
                    <input id="input-to-mint" placeholder="Введите адрес получателя"></input>
                    <input id="input-amount-mint" type="number" placeholder="Введите сколько хотите оправить"></input>
                    <button onClick={mintTokens}>Отправить</button>
                </div>
                : <></>
            }

        </div>
    );
}