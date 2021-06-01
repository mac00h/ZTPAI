import Cookies from 'js-cookie'
import { useEffect } from 'react'

const ApplyVariables = (mood) => {

    let object = {
        positivity: 0,
        minTempo: 0,
        maxTempo: 0,
        energy: 0
    }
    useEffect(() => {
        if(Cookies.get('weatherData')){
            let tmp = JSON.parse(Cookies.get('weatherData'))
        
        switch(tmp.weather[0].main){
            case ('Clear'): 
            object.positivity = 0.75
            object.minTempo = 96
            object.maxTempo = 158
            object.energy = 0.7
            break;

            case('Clouds'):
                switch(tmp.weather[0].description){
                    case ('few clouds'):
                        object.positivity = 0.76
                        object.minTempo = 93
                        object.maxTempo = 138
                        object.energy = 0.7
                    break;
                    
                    case ('scattered clouds'):
                        object.positivity = 0.73
                        object.minTempo = 76
                        object.maxTempo = 128
                        object.energy = 0.7
                    break;
    
                    case ('broken clouds'):
                        object.positivity = 0.71
                        object.minTempo = 76
                        object.maxTempo = 110
                        object.energy = 0.7
                    break;
    
                    case ('overcast clouds'):
                        object.positivity = 0.72
                        object.minTempo = 66
                        object.maxTempo = 118
                        object.energy = 0.7
                    break;
                }
            break;
        
            case ('Snow'):
                switch(tmp.weather[0].description){
                    case ('light snow'):
                        object.positivity = 0.68
                        object.minTempo = 62
                        object.maxTempo = 128
                        object.energy = 0.68
                    break;
    
                    case ('Snow'):
                        object.positivity = 0.66
                        object.minTempo = 56
                        object.maxTempo = 118
                        object.energy = 0.68
                    break;
    
                    case ('Heavy snow'):
                        object.positivity = 0.62
                        object.minTempo = 52
                        object.maxTempo = 98
                        object.energy = 0.66
                    break;
    
                    case ('Rain and snow'):
                        object.positivity = 0.56
                        object.minTempo = 52
                        object.maxTempo = 78
                        object.energy = 0.59
                    break;
                }
            break;
        
            case ('Rain'):
                    switch(tmp.weather[0].description){
                    case ('light rain'):
                        object.positivity = 0.66
                        object.minTempo = 60
                        object.maxTempo = 98
                        object.energy = 0.6
                    break;
        
                    case ('moderate rain'):
                        object.positivity = 0.69
                        object.minTempo = 66
                        object.maxTempo = 98
                        object.energy = 0.6
                    break;
        
                    case ('heavy intensity rain'):
                        object.positivity = 0.59
                        object.minTempo = 85
                        object.maxTempo = 148
                        object.energy = 0.6
                    break;
        
                    case ('very heavy rain'):
                        object.positivity = 0.57
                        object.minTempo = 66
                        object.maxTempo = 138
                        object.energy = 0.66
                    break;
                        
                    case ('extreme rain'):
                        object.positivity = 0.56
                        object.minTempo = 76
                        object.maxTempo = 148
                        object.energy = 0.65
                    break;
        
                    case ('freezing rain'):
                        object.positivity = 0.55
                        object.minTempo = 66
                        object.maxTempo = 98
                        object.energy = 0.59
                    break;
        
                    case ('light intesity shower rain'):
                        object.positivity = 0.66
                        object.minTempo = 56
                        object.maxTempo = 88
                        object.energy = 0.64
                    break;
        
                    case ('shower rain'):
                        object.positivity = 0.71
                        object.minTempo = 66
                        object.maxTempo = 98
                        object.energy = 0.61
                    break;
                }
                case ('Thunderstorm'):
                    object.positivity = 0.56
                    object.minTempo = 88
                    object.maxTempo = 138
                    object.energy = 0.72
                break;

                case ('Drizzle'):
                    object.positivity = 0.66
                    object.minTempo = 56
                    object.maxTempo = 88
                    object.energy = 0.68
                break;

                case('Haze'):
                    object.positivity = 0.67
                    object.minTempo = 78
                    object.maxTempo = 138
                    object.energy = 0.64
                break;

                case ('Fog'):
                    object.positivity = 0.51
                    object.minTempo = 56
                    object.maxTempo = 88
                    object.energy = 0.58
                break;

                case ('Mist'):
                    object.positivity = 0.51
                    object.minTempo = 66
                    object.maxTempo = 98
                    object.energy = 0.56
                break;

                case ('Smoke'):
                    object.positivity = 0.4
                    object.minTempo = 46
                    object.maxTempo = 78
                    object.energy = 0.55
                break;
            }

            switch(mood){
                case('happy'):
                object.positivity += 0.15
                break;
    
                case('notbad'):
                object.positivity += 0.05
                break
    
                case('sadge'):
                object.positivity -= 0.1
                break
            }



        }
        
        
        // switch(tmp.wind.speed){
        //     case()
        // }
    })

    return object
}

export default ApplyVariables;