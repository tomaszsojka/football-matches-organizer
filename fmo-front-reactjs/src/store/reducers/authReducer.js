const initialState = {
    token: "",
    userId: ""
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_TOKEN":
            state = {
                ...state,
                token : action.payload
            }
            break;
        case "SET_USERID":
            state = {
                ...state,
                userId : action.payload
            }
            break;
        case "CLEAN_TOKEN":
            state = {
                ...state,
                token : ""
            }
            break;
        case "CLEAN_USERID":
            state = {
                ...state,
                userId : ""
            }
            break;
        default:
            break;
    }
    return state;
};

export default authReducer;