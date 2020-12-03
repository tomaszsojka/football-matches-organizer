class Auth {

    login(token) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('auth', true);
    }

    logout() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('auth');
    }

    isAuthenticated() {
        return window.localStorage.getItem("auth") ? window.localStorage.getItem('auth') : null;
    }

    getToken() {
        return window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null;
    }

    // parseJwt = (token) => {
    //     let base64Url = token.split('.')[1];
    //     let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    //
    //     return JSON.parse(jsonPayload);
    // };
}

export default new Auth()