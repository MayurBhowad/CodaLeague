import React, { Component } from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { submitMatchStatusData } from '../../redux/actions/team.action';
import { getAllFutureMatches } from '../../redux/actions/matches.action';

export class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home_team: 'Mumbai',
            challenger: 'Goa',
            winner: '',
            looser: '',
            isTie: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getAllFutureMatches(1, 4);
    }

    onSubmit() {
        const matchData = {
            home_team: this.state.home_team,
            challenger: this.state.challenger,
            winner: this.state.winner,
            looser: this.state.looser,
            isTie: ((this.state.winner === '' || this.state.looser === '') ? true : false),
        }
        // this.props.submitMatchStatusData(matchData);

    }

    render() {
        return (
            <div>
                <h3>Matches</h3>
                <hr />
                <button className="btn btn-primary" onClick={this.onSubmit} >Button</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { getAllFutureMatches })(Matches);
