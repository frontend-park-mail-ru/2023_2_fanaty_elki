export function request(url, method, headers, body = null) {
    return fetch(url, {
        method: method,
        body: body,
        headers: headers,
    }).then(response => response.json());
}

export function get(url, headers) {
    return request(url, GET, headers);
}

export function post(url, body, headers) {
    return request(url, POST, headers, body);
}

// export function request(url, method, headers, body = null) {
//     return fetch(url, {
//         method: method,
//         body: body,
//         headers: headers
//     }).then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             return response.json().then(error => {
//                 const e = new Error('my error');
//                 e.data = error;
//                 throw e;
//             })
//         }
//     });
// }
