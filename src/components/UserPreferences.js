import '../css/preferences.css'
import { useState, useEffect } from 'react';
const UserPreferences = (props) => {

    const genres = [
        "acoustic","afrobeat","alt-rock","alternative","ambient","black-metal","blues","breakbeat",
        "cantopop","chicago-house","chill","classical","club","comedy","country","dance","dancehall","death-metal","deep-house",
        "disco","drum-and-bass","dubstep","electro","electronic","funk","garage","german","gospel",
        "goth","guitar","happy","hard-rock","hardcore","hardstyle","heavy-metal","hip-hop","holidays","house","industrial",
        "jazz","k-pop","latin","latino","metal","metal-misc",
        "opera","pagode","party","piano","pop","pop-film","post-dubstep","power-pop",
        "progressive-house","punk","punk-rock","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll","romance",
        "sad","salsa","samba","sleep","soul","spanish","study",
        "summer","swedish","tango","techno"];

    const [firstG, setFirstG] = useState('null')
    const [secondG, setSecondG] = useState('null')
    const [thirdG, setThirdG] = useState('null')
    const [state, setState] = useState(0)

    const handleClick = (ev) => {
        console.log(ev)
        const bt = document.getElementById(ev)
        bt.setAttribute("disabled", "true")

        if(state === 0){
            setFirstG(ev)
            setState(state+1)
        }

        if(state === 1){
            setSecondG(ev)
            setState(state+1)
        }

        if(state === 2){
            setThirdG(ev)
            setState(state+1)
        }
    }

    useEffect(() => {
        if(state === 3){
            props.passGenres({
                first: firstG,
                second: secondG,
                third: thirdG
            })
        }
    }, [state])

    return (
        <div className="preferences">
            Select up to three genres you enjoy:
            <div className="genres">
                {genres.map((e, i) => (
                    <button key={i} id={e} onClick={() => handleClick(e)}>{e}</button>
                ))}
            </div>
        </div>
    );
}
 
export default UserPreferences