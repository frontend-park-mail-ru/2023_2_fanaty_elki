import { request, get, post } from "/modules/ajax.js";

export class UserModel {
    _currentUser;

    constructor() {
        this._currentUser = null;
    }

    parseUser(json) {
        obj = JSON.parse(json)
        return {
            id: obj.id,
            username: obj.username,
            email: obj.email
        }
    }

    getUserById(id) {
        fetch("") //TODO Add URL
            .then(responce => {
                if (responce.ok) {
                    return this.parseUser(responce.json())
                }
            })
    }

    createUser(user) {
        fetch("", { //TODO Add URL
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(responce => {
                if (responce.ok) {
                    this._currentUser = parseUser(responce.json());
                    return this._currentUser;
                }
            })
    }

    async login(login_data) {
        const body = JSON.stringify(login_data);
        const response = await fetch(backendURL + '/login', {
            method: POST,
            body: body,
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            this._currentUser = data.Body.id;
            console.log('id', this._currentUser)
            return Promise.resolve();
        }
        return Promise.reject();
    }

    async signup(signup_data) {
        const body = JSON.stringify(signup_data);
        const response = await fetch(backendURL + '/users', {
            method: POST,
            body: body,
        });
        if (response.ok) return Promise.resolve();
        return Promise.reject();
    }

    async auth() {
        const response = await fetch(backendURL + '/auth', {
            method: GET,
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            this._currentUser = data.Body.id;
            return Promise.resolve();
        }
        return Promise.reject();
    }

    async logout() {
        const response = await fetch(backendURL + '/logout', {
            method: POST,
            credentials: 'include'
        });
        if (response.ok) {
            this._currentUser = null;
            return Promise.resolve();
        }
        return Promise.reject();
    }
}
