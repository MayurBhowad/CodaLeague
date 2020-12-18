import { GET_ALL_FUTURE_MATCHES, LOADING } from '../types.redux';

const axios = require('axios');

export const getAllFutureMatches = (page, limit) => dispatch => {
    dispatch({ type: LOADING });
    axios.get(`/matches/all_upcomming_matches?page=${page}&limit=${limit}`)
        .then(teams => {
            dispatch({
                type: GET_ALL_FUTURE_MATCHES,
                payload: teams.data
            })
        })
}