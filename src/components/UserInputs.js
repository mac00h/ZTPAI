import '../css/UserInputs.css'
import { useState } from 'react'
import {RangeStepInput} from 'react-range-step-input';
const UserInputs = (props) => {

    const [userArtist, setUserArtist] = useState()
    const [userPopularity, setUserPopuluserPopularity] = useState(50)
    let sliderValue = <div>I'm not sure..</div>;
    function handleClick() {
        props.passInputs({
            artist: userArtist,
            popularity: userPopularity
        })
    }

    switch(true){
        case(userPopularity < 40):
            sliderValue = <div>Definitely less popular</div>
        break;

        case(userPopularity > 60):
            sliderValue = <div>Definitely popular</div>
        break;
    }
    return (
        <div className="userInputs">
            <div className="artistDiv">
            <h2 className="arth2">Feel free to provide one artist you really enjoy!</h2>
            <input type="text" name="userArtist" placeholder="full artist name" autoComplete="off" value={userArtist || ""} onChange={e => setUserArtist(e.target.value)}></input>
            </div>
            
            <div className="sliderDiv">
                <h2>Do you prefer more or less popular songs?</h2>
                <h4>Use the slider below to choose your preference!</h4>
                <RangeStepInput value={userPopularity} onChange={e => setUserPopuluserPopularity(e.target.value)}/>
                <h3>{sliderValue}</h3>
            </div>
            <button onClick={handleClick}>Submit</button>
        </div>
    );
}
 
export default UserInputs;