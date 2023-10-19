

/**
 * Отправляет на сервер запрос об аутентификации по кукам,
 * @async
 */
export async function authUser() {
    const response = await fetch(backendURL + '/auth', {
        method: GET,
        credentials: 'include'
    });
    if (!response.ok) {
        throw Error(response.status); // тело даже не запрашивается, думаю, можно обойтись кодами
    }
    if (response.headers.get('content-type') != 'application/json') {
        throw Error('unexpected error');
    }
    const json = await response.json();
    return json.Body;
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
    if (!response.ok) {
        throw Error(response.status); // тело даже не запрашивается, думаю, можно обойтись кодами
    }
    if (response.headers.get('content-type') != 'application/json') {
        throw Error('unexpected error');
    }
    const json = await response.json();
    return json.Body;
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
    if (!response.ok) {
        throw Error(response.status);
    }
    return;
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
    if (!response.ok) {
        throw Error(response.status);
    }
    return;
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
    if (!response.ok) {
        throw Error(response.status); // тело даже не запрашивается, думаю, можно обойтись кодами
    }
    if (response.headers.get('content-type') != 'application/json') {
        throw Error('unexpected error');
    }
    const json = await response.json();
    return json.Body;
}
