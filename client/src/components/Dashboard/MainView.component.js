import React, { Component } from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import TableView from './TableView.component'

import { getScoresWise } from '../../redux/actions/team.action';

export class MainView extends Component {

    componentDidMount() {
        this.props.getScoresWise()
    }

    render() {
        const { teams, loading } = this.props.team;
        let table;
        if (teams === null || loading) {
            table = (<h4>Loading...</h4>)
        } else {
            if (teams) {
                if (teams.length > 0) {
                    table = (<TableView teams={teams} loading={loading} />)
                }
            } else {
                table = <h4>No product found...</h4>
            }
        }


        return (
            <div>
                <h3>Team Raking</h3>
                <hr />
                {table}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    team: state.team
})

export default connect(mapStateToProps, { getScoresWise })(MainView);
