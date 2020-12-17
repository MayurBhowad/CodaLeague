import { GET_ALL_TEAM_DETAILS, GET_TEAM_DETAILS, LOADING } from "../types.redux"


const initialState = {
    loading: false,
    team: {},
    teams: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_TEAM_DETAILS:
            return {
                ...state,
                team: action.payload,
                loading: false
            }
        case GET_ALL_TEAM_DETAILS:
            return {
                ...state,
                teams: action.payload,
                loading: false
            }
        default:
            return state;
    }
}