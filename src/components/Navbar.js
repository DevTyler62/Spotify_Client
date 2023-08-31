import React from 'react';
import './Navbar.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Navigation = (props) => {
    console.log(props);
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">React Button</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href={"/#access_token=" + token}>Home</Nav.Link>
                <Nav.Link href={"/topTracks/#access_token=" + token}>Top Stats</Nav.Link>
                <Nav.Link href={"/currentPlayback/#access_token=" + token}>Now Playing</Nav.Link>
                <Nav.Link href={"/playlistData/#access_token=" + token}>Playlist Analytics</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);