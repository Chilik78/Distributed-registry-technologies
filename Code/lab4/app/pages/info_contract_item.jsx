

export function InfoContractItem({user, content, tag}) {
    return (  
        <div className="info-contract-item">
            <h5>user: {user}</h5>
            <h5>text: {content}</h5>
            <h5>tag: {tag}</h5>
        </div>
    );
}