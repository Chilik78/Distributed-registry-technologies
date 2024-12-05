'use client'
import "../assets/styles/connect_wallet.css";

export function ConnectWallet({handleConnect}){
    return (
        <>
            <div id="con-wallet">
                <button onClick={handleConnect}>Подключится</button>
            </div>
        </>
    );
}