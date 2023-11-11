enum ERROR_TYPE {
    FAILURE,
    NETWORK_ERROR,
    UNEXPECTED,
}

type ApiElementConfig = {
    url: string;
    params: (body: string) => RequestInit;
    success: { [index: number]: string };
    failure: { [index: number]: string };
    restrictions: { [index: string]: string };
};

type ApiConfig = {
    backend: string;
    api: { [index: string]: ApiElementConfig };
};

type LoginData = {
    username: string;
    password: string;
};

type SignUpData = LoginData & {
    email: string;
};

class RequestError {
    type: ERROR_TYPE;
    status: number;

    constructor(type_: ERROR_TYPE, status_: number = -1) {
        this.type = type_;
        this.status = status_;
    }
}
