import React, { Component } from 'react';
import './App.css';
//import playlistData from './components/playlistData';
//import TopTracks from './components/topTracks';
import Spotify from 'spotify-web-api-js';
//import {Doughnut, Bar} from 'react-chartjs-2';
//import {Router} from 'react-router-dom';
//import { Redirect } from 'react-router-dom';
//import { Navbar, Nav} from 'react-bootstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';

//import history from './services/history';
//import Navigation from './components/Navbar';
import Routes from './routes/index';

const spotifyWebApi = new Spotify();


class App extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    //console.log(params);
    this.state = {value: ''};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);

    this.state ={
      visible: true, 
      showTopTracks: false,
      loggedIn: params.access_token ? true : false,
      accessToken: params.access_token,
      redirect: false
    }
    // this._onButtonClick = this._onButtonClick.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
      //console.log(params.access_token);
    }
  }
/*******************
 * Top Tracks links
 */
handleClickTop = topTracksLink => ev => {
  this.setState({visible: false}, this.nextFunction(topTracksLink));
  //window.location.href = topLink;
  //this.setState({visible: false});
}
nextFunction = topTracksLink => ev => {
  //console.log(this.state.visible);
  window.location.href = topTracksLink;
}
/*********************
 *  Current playback link
 */
handleClickCurrent = currentPlaybackLink => ev => {
  this.setState({visible: false}, this.nextFunctionC(currentPlaybackLink));
  //window.location.href = topLink;
  //this.setState({visible: false});
}
nextFunctionC = currentPlaybackLink => ev => {
  //console.log(this.state.visible);
  window.location.href = currentPlaybackLink;
}
/*****************
 * Playlist data link
 */
handleClickPlaylist = playlistDataLink => ev => {
  this.setState({visible: false}, this.nextFunctionD(playlistDataLink));
  //window.location.href = topLink;
  //this.setState({visible: false});
}
nextFunctionD = playlistDataLink => ev => {
  console.log(this.state.visible);
  window.location.href = playlistDataLink;
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
render() {
  const token = this.state.accessToken;
  const topTracksLink = "/topTracks/#access_token=" + token;
  const currentPlaybackLink = "/currentPlayback/#access_token=" + token;
  const playlistDataLink = "/playlistData/#access_token=" + token;

  if(window.location === topTracksLink){
    this.state.visible = false;
  }
  // console.log(this.state.loggedIn);
  // console.log(this.state.accessToken);
  
  return (
    <div className="Routes">
       {/* <Router history={history}> */}
       <Routes />
       {/* </Router> */}
        <div className="App">
          <Grid container direction="column">
            <Grid item>
              <AppBar position="fixed">
                <div id="top">
                 
                <Toolbar id="navback">

                <div id="menuToggle">
                 
                  <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                      <a href={"/#access_token=" + token}><li>HOME</li></a>
                      <a href={"/topTracks/#access_token=" + token}><li>TOP STATS</li></a>
                      <a href={"/currentPlayback/#access_token=" + token}><li>CURRENT SONG</li></a>
                      <a href={"/playlistData/#access_token=" + token}><li>PLAYLISTS</li></a>
                      {/* <a href="https://erikterwan.com/" target="_blank"><li>Show me more</li></a> */}
                    </ul>
                  </div>
                  
                <div id="logo">
                  <a href={"/#access_token=" +token}><img src="https://i.ibb.co/QC8xjv1/DF2.png" alt="DF2" border="0"></img></a>
                  </div>
                  {/* <Button className="active" id="links" href={"/#access_token=" + token}>Home</Button> */}
                  {/* <Button href={"/topTracks/#access_token=" + token} onClick={this._onButtonClick}> Top Tracks</Button> */}
                  <div className="navlinks">
                  <Button className="active" id="links" onClick={this.handleClickTop(topTracksLink)}> Top Stats</Button>
                  {/* <Button className="active" id="links" onClick={() => this.handleClick()} href={"/topTracks/#access_token=" + token}> Top Stats</Button> */}
                  <Button className="active" id="links" onClick={this.handleClickCurrent(currentPlaybackLink)}>Now Playing</Button>
                  <Button className="active" id="links" onClick={this.handleClickPlaylist(playlistDataLink)}>Playlist Analytics</Button>
                  {/* <Button color="secondary" className="active" href='http://localhost:8888'>Login With Spotify</Button> */}
                  {/* <Button color="secondary" className="active" href='https://login-to-spotify.herokuapp.com'>Login With Spotify</Button> */}
                  </div>
                </Toolbar>
                </div>
              </AppBar>
          </Grid>
            <Grid item>
              {/* <playlistData />
              {this.state.showTopTracks ? <TopTracks /> : null} */}
              {/* <TopTracks /> */}
            </Grid>
        </Grid>
          {/* <ul>
            <li><a className="active" href={"/#access_token=" + token}>Home</a></li>
            <li><a href={"/topTracks/#access_token=" + token}>Top Tracks</a></li>
            <li><a href={"/currentPlayback/#access_token=" + token}>Currently Playing Song</a></li>
            <li><a href={"/playlistData/#access_token=" + token}>Playlist Analytics</a></li>
            <li><a href='http://localhost:8888'>Login With Spotify</a></li>
          </ul> */}
        {/* <Navbar className="sticky-nav" fixed="top" bg="primary" variant="dark"> 
          {/* <Navbar.Brand href="#home">React Button</Navbar.Brand> */}
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href={"/#access_token=" + token}>Home</Nav.Link>
            <Nav.Link href={"/topTracks/#access_token=" + token}>Top Tracks</Nav.Link>
            <Nav.Link href={"/currentPlayback/#access_token=" + token}>Currently Playing Song</Nav.Link>
            <Nav.Link href={"/playlistData/#access_token=" + token}>Playlist Analytics</Nav.Link>
          </Nav>
          {/* </Navbar.Collapse>
        </Navbar> */}
          {/* <a href='http://localhost:8888'>Login With Spotify</a> */}
        </div>


        {/* {console.log(this.state.visible)} */}
        {/* HOME PAGE DATA STARTS HERE */}
        {this.state.visible ?
        <div className="homepage">
          <div className="introduction">
            <div className="logoimg">
              {/* <a href={"/#access_token=" + token}> */}
                <img src="https://i.ibb.co/hcd96qs/DF3.png" alt="logo"></img>
              {/* </a> */}
            </div>
            <h2>DATAFY</h2>
            <h3>Curious about what your listening trends look like?</h3>
            <p>Get your top tracks, playlists and what you're currently listening to visualized.</p>
            <p>Just login below!</p>

          </div>
            <Button color="secondary" className="active" id="login" href='http://localhost:8888'>Login With Spotify</Button>
          </div>
          : null}
      </div>
     
    );
  }
}
export default App;