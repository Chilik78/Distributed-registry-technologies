export function Sender({posterContract, userAddress, updateFunc, tokenDecimals}) {

    const updateParent = () => {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        updateFunc(`UPDATE STATE PARENT ${rand}`);
    }

    const postText = async () => {

        try{
            let text = document.getElementById("input-text").value;
            let tag = document.getElementById("input-tag").value;
    
            await posterContract.methods.post(text, tag).send( {from: userAddress});
        }
        catch(e){
            var threshold = await posterContract.methods.threshold().call();
            threshold = Number(threshold) / (10**tokenDecimals)
            alert("Ошибка, вам не хватает токенов, нужно " + threshold);
        }

       
        updateParent();
    }

    return ( 
        <div id="send-form">
            <input id="input-text" placeholder="Введите текст"></input>
            <input id="input-tag" placeholder="Введите тег"></input>
            <button onClick={postText}>Отправить</button>
        </div>
    );
}