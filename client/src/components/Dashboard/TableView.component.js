import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export class TableView extends Component {
    render() {
        const { teams, loading } = this.props;
        let tableRow;
        if (teams) {
            tableRow = teams.map((team, index) => (
                <Table_Row key={team._id} team={team} index={index} />
            ))
        }

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team Name</th>
                        <th>Wins</th>
                        <th>Loss</th>
                        <th>Tie</th>
                        <th>Total Score</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRow}
                </tbody>
            </Table>

        )
    }
}

class Table_Row extends Component {
    render() {
        const { team, index } = this.props;

        return (
            <tr key={team._id}>
                <td><strong>{index + 1}</strong></td>
                <td>{team.team_name}</td>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
                <td>{team.ties}</td>
                <td>{team.score}</td>
            </tr>
        )
    }
}

export default TableView
