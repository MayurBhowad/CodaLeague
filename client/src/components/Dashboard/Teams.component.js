import React, { Component } from 'react'
import TableView from './TableView.component'

export class Teams extends Component {
    render() {
        return (
            <div>
                <h3>All Teams</h3>
                <hr />
                <h6 className="text-muted">shows only Registered Teams only</h6>
                <TableView />
            </div>
        )
    }
}

export default Teams
