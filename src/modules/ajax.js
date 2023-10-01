export function request(url, method, headers, body = null) {
    return fetch(url, {
        method: method,
        body: body,
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(error => {
                const e = new Error('my error');
                e.data = error;
                throw e;
            })
        }
    });
}

export function get(url, headers = null) {
    return fetch(url, {
        method: GET,
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(error => {
                const e = new Error('my error');
                e.data = error;
                throw e;
            })
        }
    });
}

export function post(url, body, headers = null) {
    return fetch(url, {
        method: POST,
        body: body,
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(error => {
                const e = new Error('my error');
                e.data = error;
                throw e;
            })
        }
    });
}
