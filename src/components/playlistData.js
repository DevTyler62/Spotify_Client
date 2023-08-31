import React, {Component}  from 'react';
import Spotify from 'spotify-web-api-js';
import {Bar} from 'react-chartjs-2';
import './playlistData.css';

const spotifyWebApi = new Spotify();

const BarGraph = (props) => {
//const DoughnutGraph = (props) => {
//const LineGraph = (props) => {
  //console.log(props);
  // Total number of tracks in the playlist
  var tracksTotal = (props.Tracks.totalTracks);
  if(tracksTotal >= 100){
    tracksTotal = 100;
  }
  //console.log(tracksTotal);
  // Total Danceability 
  const DT = (props.trackStuff.totalDan);
  const avgD = Math.round((DT / tracksTotal)*100)/100;
  // Total Energy
  const ET = (props.trackStuff.totalEnergy);
  const avgE = Math.round((ET / tracksTotal)*100)/100;
  // Total Acoustic
  const AT = (props.trackStuff.totalAcoustic);
  const avgA = Math.round((AT / tracksTotal)*100)/100;
  // Total Speech
  const ST = (props.trackStuff.totalSpeech);
  const avgS = Math.round((ST / tracksTotal)*100)/100;
  // Total Instrument
  const IT = (props.trackStuff.totalInstrument);
  const avgI = Math.round((IT / tracksTotal)*100)/100;
  // Total Liveness
  const LT = (props.trackStuff.totalLiveness);
  const avgL = Math.round((LT / tracksTotal)*100)/100;
  // Total Valence
  const VT = (props.trackStuff.totalValence);
  const avgV = Math.round((VT / tracksTotal)*100)/100;

  const data = {
    labels: [
      'Danceability',
      'Energy',
      'Acousticness',
      'Speechiness',
      'Instrumentalness',
      'Liveness',
      'Valence',
    ],
    datasets: [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(104, 132, 245, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(104, 132, 245, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      label: 'Average Stats for Playlist',
      borderWidth: 1,
      data: [avgD, avgE, avgA, avgS, avgI, avgL, avgV]
     },
  ],
};
return(
  <Bar data={data} />
  //  <Doughnut data={data} />
  // <Line data={data} />
  )
}
export default class playlistData extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    this.state = {Pvalue: ''};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    this.state ={
      loggedIn: params.access_token ? true : false,
      redirect: false,
      playlistTracks:[],
      trackFeatures:[],
      playlistNames:[],
      nowPlaying: {
        playlistID: ''
      },
      trackStuff: {
        totalDan: 0,
        totalEnergy: 0, 
        totalAcoustic: 0, 
        totalSpeech: 0,
        totalInstrument: 0, 
        totalLiveness: 0,
        totalValence: 0
      },
      Tracks: {
        totalTracks: 0
      },
    }
  if (params.access_token){
     spotifyWebApi.setAccessToken(params.access_token)
  }
}
//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }
    
//   handleSubmit(event) {
//     // alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }
getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
 q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
getPlaylists(){
spotifyWebApi.getUserPlaylists()
  .then((response) => {
    this.setState({
      playlistNames: response.items
    })
  })
}
getUserPlaylist(){
  spotifyWebApi.getPlaylist(null,this.state.Pvalue)
    .then((response) => {
      this.setState({
        nowPlaying:{
          playlistName: response.name
        }  
    })
}) 
//     return response.items[this.state.Pvalue].id;
//   }).then((id) => {
//console.log(id);
spotifyWebApi.getPlaylistTracks(null,this.state.Pvalue)
  .then((response) =>{
    this.setState({
      playlistTracks: response.items,
      Tracks: {
        totalTracks: response.total
      } 
   })
return response.items
}).then((items) => {
  const mappingFunction = p => p.track.id;
  const ids = items.map(mappingFunction);
  //console.log(ids);
 //console.log(items);
return spotifyWebApi.getAudioFeaturesForTracks(ids);
}).then((response) => {
  this.setState({
    trackFeatures: response.audio_features
  })
return response.audio_features;
}).then((audio_features) => {
//console.log(audio_features);
  this.setState({
    trackStuff: {
      totalDan: audio_features.reduce((danceTotal, dance) => danceTotal + dance.danceability,0),
      totalEnergy: audio_features.reduce((energyTotal, energy) => energyTotal + energy.energy,0),
      totalAcoustic: audio_features.reduce((acousticTotal, acoustic) => acousticTotal + acoustic.acousticness,0),
      totalSpeech: audio_features.reduce((speechTotal, speech) => speechTotal + speech.speechiness,0),
      totalInstrument: audio_features.reduce((instrumentTotal, instument) => instrumentTotal + instument.instrumentalness,0),
      totalLiveness: audio_features.reduce((livenessTotal, liveness) => livenessTotal + liveness.liveness,0),
      totalValence: audio_features.reduce((valenceTotal, valence) => valenceTotal + valence.valence,0)
      }
    })
  }).catch(err => alert("Incorrect Value has been Selected"));
}
getData(){
  this.getUserPlaylist();
}
render(){
  const {trackStuff,Tracks} = this.state

  return(
    <div className="playlistData">
      <div className="content">
      <div className="sectHead">
        <div className="headA">
          <h1 className="head">Playlist Analytics</h1>
          <button onClick={() => this.getPlaylists()} className="head1">
            Get Playlists
           </button>
        </div>
        <div className="headB">
          <div className="actions">
             {/* PLAYLIST NAMES:              */}
              <select className="head2" value={this.state.Pvalue}
                onChange={(e) => this.setState({Pvalue: e.target.value})}>
               {this.state.playlistNames.map((name) => <option key={name.id} value={name.id}>{name.name}</option>
               // ,console.log(this.state.Pvalue)
               /* <ol>
               <li>{name.name}</li>
               </ol> */
               /* <div>{track.track.popularity} </div> */
               /* <div>{track.track.album.images} </div> */
               )}                
              </select>   
             {/* <form onSubmit={this.handleSubmit}>
            <label>
              Enter Playlist Number:
               <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
                <input type="submit" value="Submit" />
              </form>
            <div>
              The value entered was: {this.state.value}
            </div> */}
            <button className="head3" onClick={() => this.getData()}>
            <svg className="bi bi-chevron-double-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L9.293 8 3.646 2.354a.5.5 0 010-.708z" clipRule="evenodd"/>
  <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L13.293 8 7.646 2.354a.5.5 0 010-.708z" clipRule="evenodd"/>
</svg>
             </button>
          </div>
        </div>
       </div>
      
       <div className="data">
          <div className="chart">
              <BarGraph trackStuff={trackStuff} Tracks={Tracks} />
          </div>
          <div className="infos">
            {/* <div>PLAYLIST NAME: </div> */}
            <div className="playlistName"> {this.state.nowPlaying.playlistName}</div>
            <div className="track">
            {/* Tracks: */}
            {this.state.playlistTracks.map(track =>
          
            <div key={track.track.id}>
              <div className="songInfo">
              <div className="cover">
                  <img src={track.track.album.images[0].url} alt="album art" />
              </div>
              <div className="infor">
                <div className="song">
                  {track.track.name}
                </div>
                <div className="artist"> 
                     {track.track.artists[0].name}
                </div>
              </div>
                   {/* {track.track.id} */}
                   {/* <div>{track.track.popularity} </div> */}
                   {/* <div>{track.track.album.images} </div> */}
              </div>
            </div>
              )}
              {/* <div className="continue">
                <svg class="bi bi-chevron-compact-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clip-rule="evenodd"/>
                </svg>
              </div> */}
          </div>
          </div>
          </div>
        </div>
    </div>
  )}
}
