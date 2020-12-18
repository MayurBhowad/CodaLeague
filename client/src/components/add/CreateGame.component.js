import React, { Component } from 'react'

export class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home_team: '',
            challenger: '',
            date: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newGame = {
            home_team: this.state.home_team,
            challenger: this.state.challenger,
            date: this.state.date
        }
        console.log(newGame);
    }

    render() {
        return (
            <div className='create-game'>
                <h4>Create Game</h4>
                <hr />
                <div className="team">
                    <form role="form" onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Home Team</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="home_team" onChange={this.onChange}>
                                <option>Select team</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Challenger</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="challenger" onChange={this.onChange}>
                                <option>Select team</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="example-date-input" class="">Game Date</label>
                            <div class="">
                                <input class="form-control" name="date" type="date" value="" id="example-date-input" onChange={this.onChange} />
                            </div>
                        </div>
                        <div class="form-group">
                            <button className="btn btn-primary" type="submit" >Create game</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateGame
