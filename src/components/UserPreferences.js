import '../css/preferences.css'
const UserPreferences = () => {

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

    return (
        <div className="preferences">
            Select up to three genres you enjoy:
            <div className="genres">
                {genres.map((e, i) => (
                    <button key={i}>{e}</button>
                ))}
            </div>
            <div className="artist">
                Provide us one artist you enjoy:
                <input></input>
            </div>
        </div>
    );
}
 
export default UserPreferences