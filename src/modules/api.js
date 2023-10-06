/**
 * Отправляет на сервер запрос об аутентификации по кукам,
 * @async
 */
export async function authUser() {
    const response = await fetch(backendURL + '/auth', {
        method: GET,
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) return Promise.resolve(json.Body);
    return Promise.reject({
        err: json.Err,
    });
}

/**
 * Отправляет на сервер запрос о выходе из аккаунта,
 * @async
 */
export async function logoutUser() {
    const response = await fetch(backendURL + '/logout', {
        method: POST,
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) return Promise.resolve();
    return Promise.reject();
}

/**
 * Отправляет на сервер запрос о создании пользователя,
 * @async
 * @param {Object} signup_data - данные пользователя
 */
export async function createUser(signup_data) {
    const body = JSON.stringify(signup_data);
    const response = await fetch(backendURL + '/users', {
        method: POST,
        body: body,
    });
    if (response.ok) return Promise.resolve();
    return Promise.reject();
}

/**
 * Отправляет на сервер запрос о входе в аккаунт,
 * @async
 * @param {Object} login_data - данные пользователя
 */
export async function loginUser(login_data) {
    const body = JSON.stringify(login_data)
    const response = await fetch(backendURL + '/login', {
        method: POST,
        body: body,
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) return Promise.resolve(json.Body);
    return Promise.reject({
        err: json.Err,
    });
}

/**
 * Отправляет на сервер запрос на получение списка ресторанов,
 * @async
 */
export async function getRestaurants() {
    const response = await fetch(backendURL + '/restaurants', {
        method: GET,
        credentials: 'include',
    });
    const json = await response.json();
    if (response.ok) return Promise.resolve(json.Body);
    return Promise.reject({
        err: json.Err,
    });
}
