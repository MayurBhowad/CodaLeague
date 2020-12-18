import React, { Component } from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import TableView from './TableView.component'
import Spinner from '../common/Spinner';

import { getScoresWise } from '../../redux/actions/team.action';

export class MainView extends Component {

    componentDidMount() {
        this.props.getScoresWise()
    }

    render() {
        const { teams, loading } = this.props.team;
        let table;
        if (teams === null || loading) {
            table = (<Spinner />)
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
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabIndex="-1">Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    team: state.team
})

export default connect(mapStateToProps, { getScoresWise })(MainView);
