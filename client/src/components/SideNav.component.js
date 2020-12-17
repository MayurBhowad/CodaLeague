import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SideNav extends Component {
    render() {
        return (
            <div>
                <Link to="/">
                    <h5>Leader Board</h5>
                </Link>
                <hr />
                <Link to="/dashboard/teams">
                    <h5>Teams</h5>
                </Link>
                <hr />
                <Link to="/dashboard/matches">
                    <h5>Matches</h5>
                </Link>
                <hr />
                <Link to="/dashboard/new_game">
                    <h5>New Game</h5>
                </Link>
                <hr />
            </div>
        )
    }
}

export default SideNav
