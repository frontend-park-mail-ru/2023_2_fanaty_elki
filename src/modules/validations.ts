export function validateEmail(email: string): string {
    if (!email) {
        return "Email не может быть пустым";
    }

    if (!email.match(/^[\x00-\x7F]*@[\x00-\x7F]*$/)) {
        return "Невалидный email";
    }

    return "";
}

export function validateUsername(username: string): string {
    if (!username) {
        return "Имя пользователя не может быть пустым";
    }

    if (!username.match(/^[a-zA-Z0-9_-]*$/)) {
        return 'Имя пользователя должно состоять из латинских букв, цифр, символов "-", "_"';
    }

    if (!String(username).match(/^.{4,29}$/)) {
        return "Имя пользователя должно иметь длину от 4 до 29 символов";
    }

    return "";
}

export function validatePassword(password: string): string {
    if (!password) {
        return "Пароль не может быть пустым";
    }

    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&-_\d]{8,}$/)) {
        return "Пароль должен быть длиннее 8 символов и содержать хотя бы одну букву и цифру";
    }

    return "";
}

export function validatePasswordConfirm(
    password: string,
    passwordConfirm: string,
): string {
    if (!passwordConfirm) {
        return "Подтвердите пароль";
    }

    if (password !== passwordConfirm) {
        return "Пароли не совпадают";
    }

    return "";
}

export function validateBirthday(birthday: string): string {
    if (!birthday) {
        return "Укажите дату рождения";
    }

    return "";
}

export function validatePhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) {
        return "Укажите номер телефона";
    }

    if (
        !phoneNumber.match(
            /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/,
        )
    ) {
        return "Невалидный номер телефона";
    }

    return "";
}
