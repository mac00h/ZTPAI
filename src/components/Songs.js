import '../css/songs.css'

const Songs = (props) => {
    return (
        <div className="songsDiv">
            {props.responseObj.tracks.map((e) => {
                return props.responseObj.tracks ? 
                <div className="trackContainer" key={e.id}>
                    <div className="albumCover">
                        <img src = {e.album.images[1].url}/>
                    </div>
                    <div className="songInfo">
                        <div className="trackArtist">{e.artists[0].name}</div>
                        <div className="trackName">{e.name}</div>
                    </div>
                </div>
                :
                <h2>Something went wrong..</h2>
            })}
        </div>
    );
}
 
export default Songs;