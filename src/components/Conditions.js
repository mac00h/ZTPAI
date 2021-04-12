import React from 'react';

const conditions = (props) => {
   return (
       <div>
           {props.responseObj.cod === 200 ?
               <div>
                   <p><strong>{props.responseObj.name}, {props.responseObj.sys.country}</strong></p>
                   <p>Temp: {Math.round(props.responseObj.main.temp)}°C </p>
                   <p>Conditions: {props.responseObj.weather[0].description}.</p>
                   <p>Min_temp: {Math.round(props.responseObj.main.temp_min)}</p>
                   <p>Max_temp: {Math.round(props.responseObj.main.temp_max)}</p>
               </div>
           : null
           }
       </div>
   )
}

export default conditions;