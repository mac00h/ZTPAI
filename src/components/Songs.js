import '../css/songs.css'

const Songs = (props) => {
    return (
        <div className="songsDiv">
            {props.responseObj.tracks.map((e, i) => {
                return props.responseObj.tracks ?
                <a href = {e.external_urls.spotify} target="_blank" key={i}>
                <div className="trackContainer" key={e.id}>
                    <div className="albumCover" key={e.id}>
                        <img src = {e.album.images[1].url}/>
                    </div>
                    <div className="songInfo">
                        <div className="trackArtist">
                            <h3>{e.artists[0].name}</h3>
                            <h4>{e.name}</h4>
                        </div>
                    </div>
                </div>
                </a> 
                :
                <h2>Something went wrong..</h2>
            })}
        </div>
    );
}
 
export default Songs;