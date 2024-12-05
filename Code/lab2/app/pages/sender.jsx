export function Sender({contract, userAddress, updateFunc}) {

    const postText = async () => {

        let text = document.getElementById("input-text").value;
        let tag = document.getElementById("input-tag").value;

        await contract.methods.post(text, tag).send( {from: userAddress})
        updateFunc();
    }

    return ( 
        <div id="send-form">
            <input id="input-text" placeholder="Введите текст"></input>
            <input id="input-tag" placeholder="Введите тег"></input>
            <button onClick={postText}>Отправить</button>
        </div>
    );
}