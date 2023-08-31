import React, {Component}  from 'react';
import Spotify from 'spotify-web-api-js';
import {Doughnut} from 'react-chartjs-2';
import './currentPlayback.css';

const spotifyWebApi = new Spotify();

// const BarGraph = (props) => {
const DoughnutGraph = (props) => {
//const LineGraph = (props) => {
  // console.log(props);
  const value1 = (props.trackData.Sdanceability);
  const value2 = (props.trackData.Senergy);
  const value3 = (props.trackData.Sacoustic);
  const value4 = (props.trackData.Sspeech);
  const value5 = (props.trackData.Sinstrument);
  const value6 = (props.trackData.Sliveness);
  const value7 = (props.trackData.Svalence);  
  //console.log(value1);
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
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(104, 132, 245, 0.5)',
        'rgba(153, 102, 255, 0.5)',
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
      label: 'Song Stats',
      borderWidth: 1,
      data: [value1, value2, value3, value4, value5, value6, value7],
    },
  ],
};
return(
  // <Bar data={data} />
  <Doughnut data={data} />
  // <Line data={data} />
  )
}
export default class currentPlayback extends Component {
  constructor(props){
  super(props);
  const params = this.getHashParams();
  //this.state = {value: ''};
  this.state ={
    trackData:[],
    loggedIn: params.access_token ? true : false,
    redirect: false,
    nowPlaying: {
      Sname: 'Not Checked',
      image: '',
      artist: '',
      explicitS: '',
      popularity: ''
    }
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
getNowPlaying(){
  spotifyWebApi.getMyCurrentPlaybackState()
  .then((response) =>{
    this.setState({
      nowPlaying: {
        itemCheck: response.item,
        Sname: response.item.name,
        image: response.item.album.images[0].url,
        artist: response.item.artists[0].name,
        explicitS: response.item.explicit,
        popularity: response.item.popularity
      }
    })
  }).catch(err => alert("No song is currently playing"));
}
getTrackFeatures(){
  spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      return response.item.id;
    }).then((id) => {
      //console.log(id);
      return spotifyWebApi.getAudioFeaturesForTrack(id);
    }).then((response) => {
      this.setState({
        trackData: {
          Sdanceability: Math.round(response.danceability * 100)/100,
          Senergy: Math.round(response.energy * 100)/100,
          Sacoustic: Math.round(response.acousticness * 100)/100,
          Sspeech: Math.round(response.speechiness * 100)/100,
          Sinstrument: Math.round(response.instrumentalness * 100)/100,
          Sliveness: Math.round(response.liveness * 100)/100,
          Svalence: Math.round(response.valence * 100)/100
        }
      })
    }).catch(err => alert("No song is currently playing"));
}
pauseTrack(){
  spotifyWebApi.getMyCurrentPlaybackState()
  .then((response) => { 
    return response.device.id;
  }).then((id) => {
    //console.log(id);
    spotifyWebApi.pause({},id);
    //this.callback();
  })
}
playTrack(){
  spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => { 
      return response.device.id;
    }).then((id) => {
      //console.log(id);
      spotifyWebApi.play({},id);
    })
  }
nextTrack(){
  spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => { 
      return response.device.id;
    }).then((id) => {
      //console.log(id);
      spotifyWebApi.skipToNext({},id);
  })
}
previousTrack(){
  spotifyWebApi.getMyCurrentPlaybackState()
  .then((response) => { 
    return response.device.id;
  }).then((id) => {
      //console.log(id);
      spotifyWebApi.skipToPrevious({},id);
  })
}
getCurrentTrackData(){
  this.getNowPlaying();
  this.getTrackFeatures();
}
render(){
  // var explicit;
  var SongName = this.state.nowPlaying.Sname;
  var AlbumImage = this.state.nowPlaying.image;
  var SongArtist = this.state.nowPlaying.artist;
  //var SongPop = this.state.nowPlaying.popularity;

  const {trackData} = this.state

  // if(this.state.nowPlaying.explicitS === true){
  //     explicit = "True";
  // }
  // else if(this.state.nowPlaying.explicitS === false){
  //   explicit = "False";
  // }
  return (
      <div className="currentPlayback">
      <div className="content">
        <div className="sectHead">
          <h1>Currently Playing Song</h1>
          <button id="checkmobile" onClick={() => this.getCurrentTrackData()}>
              <svg className="bi bi-arrow-repeat" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clipRule="evenodd"/>
              </svg>
            </button>
        </div>
        <div className="playing">
        <div className="left">
           <div className="cover">
                <img src={AlbumImage} alt="" className="coverimg"/>
           </div>
           <div className="inform">
            <div className="infor">
             <div className="NowPlaying">{SongName} </div>
              <div className="artist">{SongArtist}</div>
               {/* <div>Explicit: {explicit}</div> */}
              {/* <div>Popularity: {SongPop}</div> */}
            </div>
            <div className="act">
            <button className="check" onClick={() => this.getCurrentTrackData()}>
                  Check Now Playing
            </button>
            <div className="buttons">
               <button onClick={() => this.previousTrack()}>
                 <svg className="bi bi-skip-backward-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M.5 3.5A.5.5 0 000 4v8a.5.5 0 001 0V4a.5.5 0 00-.5-.5z" clipRule="evenodd"/>
                    <path d="M.904 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.692-1.01-1.233-.696L.904 7.304a.802.802 0 000 1.393z"/>
                    <path d="M8.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L8.404 7.304a.802.802 0 000 1.393z"/>
                 </svg>
               </button>
               <button onClick={() => this.pauseTrack()}>
                 <svg className="bi bi-pause-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                     <path d="M5.5 3.5A1.5 1.5 0 017 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5zm5 0A1.5 1.5 0 0112 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5z"/>
                 </svg>
               </button>
               <button onClick={() => this.playTrack()}>
                 <svg className="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>
                 </svg>
               </button>
               <button onClick={() => this.nextTrack()}>
                 <svg className="bi bi-skip-forward-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                   <path fillRule="evenodd" d="M15.5 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clipRule="evenodd"/>
                   <path d="M7.596 8.697l-6.363 3.692C.693 12.702 0 12.322 0 11.692V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>
                   <path d="M15.096 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>
                 </svg>
               </button>
             </div>
            </div>
           </div>
        </div>
        <div className="right">
            <div className="graph">
              {/* <BarGraph trackData={trackData} /> */}
              <DoughnutGraph trackData={trackData} />
              {/* <LineGraph trackData={trackData} /> */}
            </div>
        </div>
        </div>
      </div>
      </div>

    )
  }
}