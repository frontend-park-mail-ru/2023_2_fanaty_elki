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

    // login(user) {
    //     fetch("", { //TODO Add URL
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             username: user.username,
    //             password: user.password
    //         })
    //     })
    //         .then(responce => {
    //             if (responce.ok) {
    //                 this._currentUser = parseUser(responce.json());
    //                 return this._currentUser;
    //             }
    //         })
    // }

    login(login_data) {
        const body = JSON.stringify(signup_data);
        return post('/login', body, {'Content-Type': 'application/json'});
    }

    signup(signup_data) {
        const body = JSON.stringify(signup_data);
        return post('/users', body, {'Content-Type': 'application/json'});
    }
}
