import { GET_ALL_FUTURE_MATCHES, LOADING } from "../types.redux"


const initialState = {
    loading: false,
    match: {},
    matches: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_FUTURE_MATCHES:
            return {
                ...state,
                matches: action.payload,
                loading: false
            }
        default:
            return state;
    }
}