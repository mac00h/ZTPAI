import '../css/hru.css'
import sadgeEmoji from '../img/sad.svg'
import mediumEmoji from '../img/medium.svg'
import happyEmoji from '../img/happy.svg'

const HowAreYou = () => {

    return ( 
        <div className="hru">
            <h1>How are you feeling today?</h1>
            <div className="hru-container">
                <div className="faces">
                <input type="image"  id="saveform" src={sadgeEmoji} alt="Submit Form" />
                <input type="image"  id="saveform" src={mediumEmoji} alt="Submit Form" />
                <input type="image"  id="saveform" src={happyEmoji} alt="Submit Form" />
                </div>
            </div>
        </div>
    )
}
export default HowAreYou