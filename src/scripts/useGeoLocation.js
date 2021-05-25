import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
const useGeoLocation = () => {
    const [location, setLocation] = useState({ 
        loaded: false, 
        coordinates: { lat: "", lng: "" }
    });
    
    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
        Cookies.set('latitude', location.coords.latitude)
        Cookies.set('longitude', location.coords.longitude)
    };

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(()=> {
        if( !("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation is not supported.",
            });
        }

        navigator.geolocation.watchPosition(onSuccess, onError);
    }, []);

    return location;
}
 
export default useGeoLocation;