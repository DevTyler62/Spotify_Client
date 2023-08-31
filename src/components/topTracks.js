import React, {Component}  from 'react';
import Spotify from 'spotify-web-api-js';
//import { Grid } from '@material-ui/core';
import './topTracks.css';

const spotifyWebApi = new Spotify();

class TopTracks extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    //this.state = {value: ''};
    this.state ={
      visable: false,
      loggedIn: params.access_token ? true : false,
      redirect: false,
      topTracks:[],
      topTrackAlbumArt:[],
      topArtists:[]
    }
  if (params.access_token){
    spotifyWebApi.setAccessToken(params.access_token)
  }
}
getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
getTopTracks(){
  spotifyWebApi.getMyTopTracks()
  .then((response) => {
    this.setState({
      topTracks: response.items
    });
  })
}
getTopArtists(){
  spotifyWebApi.getMyTopArtists()
  .then((response) => {
    this.setState({
      topArtists: response.items
    });
  })
}
getTopData(){
  this.getTopArtists();
  this.getTopTracks();
}

    render(){

  return(
    <div className="topStats">
      <div className="sectHead">
      <h1>Your Top Artists &amp; Songs</h1>
        <button onClick={() => this.getTopData()}>
         Get top Artists and Tracks
        </button>
        </div>

        <div className="contents">
        <div className="topArtists">
        <h2>Top Artists:</h2>
        <div className="section">
        {this.state.topArtists.map(artists =>
          <div key={artists.id} className="stat">
            <div className="albumCover"> 
              <img alt="" src={artists.images[0] ? artists.images[0].url : require('./default-album-art.jpg')}/>
           </div>
           <div className="info">
            <div className="name"><h3>{artists.name} </h3></div>
            {/* <div>Popularity: {artists.popularity} </div> */}
            <div className="genre">
            {artists.genres.map(genres =>
              <div className="genres">{genres}</div>
            )}
            </div>
            </div>
          </div>
        )}
        </div>
      </div>
      {/* CLOSE TOP ARTISTS */}
      {/* <div className="centerLine"></div> */}

      <div className="topTracks">
        <h2>Top Tracks:</h2>
        <div className="section">
        {this.state.topTracks.map(tracks =>
        // <div class="stat">
          <div key={tracks.id} className="stat">
            <div className="albumCover">
              <img src={tracks.album.images[0].url} alt="track album art" />
           </div>
           <div className="info">
            <div className="name">{tracks.name} </div>
            </div>            
            {/* <div>{track.track.popularity} </div> */}
            {/* <div>{track.track.album.images} </div> */}
          </div>
        )}
        </div>
      </div>
      {/* CLOSE TOP TRACKS */}
      </div>
    </div>
    );
  }
}
export default TopTracks;