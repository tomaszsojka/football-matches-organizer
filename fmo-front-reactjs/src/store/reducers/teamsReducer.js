import {SET_TEAMSLIST} from "../actions/types";

const initialState = {
    teams : []
};

        
const teamsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TEAMSLIST:
            state = {
                ...state,
                teams: action.payload
            }
            break;
        default:
            break;
    }
    return state;
};

export default teamsReducer;