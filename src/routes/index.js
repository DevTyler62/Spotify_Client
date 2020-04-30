import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';


import TopTracks from '../components/topTracks';
import history from '../services/history';
import currentPlayback from '../components/currentPlayback';
import playlistData from '../components/playlistData';
import App from '../App';

// export default function Routes(){
export default class Routes extends Component{
    render(){
        // console.log(App);
        //console.log(props.params);
        return (
            <Router history={history}>
                <Switch>
                    {/* <Route path="/" component={App} /> */}
                    <Route path="/topTracks" component={TopTracks} />
                    <Route path="/currentPlayback" component={currentPlayback}/>
                    <Route path="/playlistData" component={playlistData}/>
                </Switch>
            </Router>
        )
    }
}