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
    const [howManyToGo, setHowManyToGo] = useState(3)
    const [test, setTest] = useState('Three more to go!') 
    const handleClick = (ev) => {
        console.log(ev)
        const bt = document.getElementById(ev)
        bt.setAttribute("disabled", "true")

        switch(state){
            case(0):
                setFirstG(ev)
                setHowManyToGo(howManyToGo-1)
            break;

            case(1):
                setSecondG(ev)
                setHowManyToGo(howManyToGo-1)
            break;

            case(2):
                setThirdG(ev)
                setHowManyToGo(howManyToGo-1)
            break;
                
        }
    }

    useEffect(() => {
        switch(howManyToGo){
            case(2):
                setTest('Two more to go!')
                setState(state+1)
            break;

            case(1):
                setTest('One more to go!')
                setState(state+1)
            break;

            case(0):
                setTest('All gucci!')
                setState(state+1)
            break;
        }
    }, [howManyToGo])

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
            <h3>Select three genres you enjoy listening to.</h3>
            <div className="genres">
                {genres.map((e, i) => (
                    <button key={i} id={e} onClick={() => handleClick(e)}>{e}</button>
                ))}
            </div>
            <h3>{test}</h3> 
        </div>
    );
}
 
export default UserPreferences