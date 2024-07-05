import {useState} from 'react';
export default function Player({ name, symbol,isActivePlayer ,onChangeName}) {
    const [isEditing,setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(name);
    function handleClick(){
        setIsEditing(editing=>!editing);
        if (isEditing) {
            onChangeName(symbol,playerName);
        }
    }
    return (
        <>
            <li className={isActivePlayer?"active":undefined}>
                <span className="player">
                    {isEditing ? (<input placeholder='Player Name' onChange={(e)=> setPlayerName(e.target.value)}></input>):(<span className="player-name">{playerName}</span>)}
                    <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={handleClick}>{isEditing?"Save":"Edit"}</button>
            </li>
        </>
    );
}