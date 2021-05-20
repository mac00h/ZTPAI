import '../css/hru.css'
import sadgeEmoji from '../img/sad.svg'
import mediumEmoji from '../img/medium.svg'
import happyEmoji from '../img/happy.svg'

const HowAreYou = (props) => {
    return ( 
        <div className="hru">
            <h1>How are you feeling today?</h1>
            <div className="hru-container">
                <div className="faces">
                    <input type="image" id="saveform" src={sadgeEmoji} alt="sadgeEmoji"  onClick={() => props.passMood('sadge')}/>
                    <input type="image" id="saveform" src={mediumEmoji} alt="notBadEmoji" onClick={() => props.passMood('notbad')}/>
                    <input type="image" id="saveform" src={happyEmoji} alt="greatEmoji" onClick={() => props.passMood('happy')}/>
                </div>
            </div>
        </div>
    )
}
export default HowAreYou