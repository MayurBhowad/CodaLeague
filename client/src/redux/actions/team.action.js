import { GET_ALL_TEAM_DETAILS, GET_TEAM_DETAILS, LOADING } from '../types.redux';

const axios = require('axios');


//Get Team Details
export const getTeamDetails = (teamName) => dispatch => {
    dispatch({ type: LOADING });
    axios.get(`/teams/team_details/${teamName}`)
        .then(team => {
            dispatch({
                type: GET_TEAM_DETAILS,
                payload: team.data
            })
        })
}

//Get list of team RANK POINTS wise
export const getScoresWise = () => dispatch => {
    dispatch({ type: LOADING });
    axios.get(`/teams/all_teams/sorted?page=${1}&limit=${10}`)
        .then(team => {
            dispatch({
                type: GET_ALL_TEAM_DETAILS,
                payload: team.data
            })
        })
}

export const getAllTeamsDetails = () => dispatch => {
    dispatch({ type: LOADING });
    axios.get(`/teams/all_teams?page=${1}&limit=${5}`)
        .then(team => {
            dispatch({
                type: GET_ALL_TEAM_DETAILS,
                payload: team.data
            })
        })
}

export const submitMatchStatusData = (matchData) => dispatch => {
    axios.post('/matches/match_result', matchData).then(data => {
        console.log(data);
    })
}