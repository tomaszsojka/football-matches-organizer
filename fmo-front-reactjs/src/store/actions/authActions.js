export function setToken(token) {
    return {
        type: "SET_TOKEN",
        payload: token
    };
};

export function setUserId(userId) {
    return {
        type: "SET_USERID",
        payload: userId
    };
}

export function cleanToken() {
    return {
        type: "CLEAN_TOKEN"
    };
};

export function cleanUserId() {
    return {
        type: "CLEAN_USERID"
    };
}