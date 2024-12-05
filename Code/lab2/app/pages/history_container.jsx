import { useState, useEffect } from "react";
import { InfoContractItem } from "./info_contract_item";

export function HistoryContainer({contract}) {
    const [messages, setMessages] = useState([]);

    const getMsgs = async () => {

        const fromBlockID = '14425532';
        const toBlockID = '14428032';

        const newPostEvent = await contract.events.NewPost({
            fromBlock: fromBlockID,
            toBlock: toBlockID,
        }, function(error, event){ console.log(event); });


        newPostEvent.on('data', async function(event){
            console.log(event);
        });


        const events = await contract.getPastEvents('NewPost',
            {
                fromBlock: fromBlockID,
                toBlock: toBlockID,
            }
        );

        let items = [];
        for(let event of events){
            if(!events)
                break;
            items.push(event.returnValues);
        }
        setMessages(items);
    }


    useEffect(() => {getMsgs();}, [])

    return ( 
        <div id="history-con">
            <h1 id='header-history'>История сообщений</h1>
            {messages.map((msg, index) => 
                <InfoContractItem 
                    key={index} 
                    user={msg.user}
                    content={msg.content} 
                    tag={msg.tag}
                />
            )}
        </div>
    );
}