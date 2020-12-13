import {SET_TEAMSLIST} from "../actions/types";
// import sendHttpRequest from "../../Fetch/useFetch";

//TODO
// const loadTeams = () => {
//     let teams = [];
//     sendHttpRequest('GET', '/api/user/teams?token=' + localStorage.getItem('token'))
//     .then(responseData => {
//         if(!responseData.success) {
//             console.log("No Success");
//         } else {
//             console.log(teams);
//             teams = responseData.teams;
//         }
//     })
//     console.log("TEAMS : ",teams);
//     return teams;
// }

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