import React from 'react';
import '../css/conditions.css'

const conditions = (props) => {
   return (
       <div className="mainConditions">
           {props.responseObj.cod === 200 ?
               <div className = "conditionsContainer">
                   <div className = "location"><strong>{props.responseObj.name}, {props.responseObj.sys.country}</strong></div>
                   <div className = "temp">{Math.round(props.responseObj.main.temp)}°C </div>
                   <div className = "subConDesc">
                        <div className = "description">{props.responseObj.weather[0].description}.</div>
                        <div className = "hilow">{Math.round(props.responseObj.main.temp_min)}°C / {Math.round(props.responseObj.main.temp_max)}°C</div>
                   </div>
               </div>
            : null
           }
       </div>
   )
}

export default conditions;