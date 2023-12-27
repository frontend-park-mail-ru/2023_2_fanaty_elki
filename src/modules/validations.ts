export function validateEmail(email: string): string {
    if (!email) {
        return "Email не может быть пустым";
    }

    if (!email.match(/^[\x21-\x7F]*@[\x21-\x7F]*$/)) {
        return "Невалидный email";
    }

    return "";
}

export function validateUsername(username: string): string {
    if (!username) {
        return "Имя пользователя не может быть пустым";
    }

    if (!username.match(/^[А-Яа-я]*$/)) {
        return "Имя пользователя должно состоять из кириллицы";
    }

    if (!username.match(/^[А-Яа-я\s]*$/)) {
        return "Имя пользователя не должно содержать пробелов";
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

    const birthdayDate = new Date(birthday);
    const currentDate = new Date();

    if (birthdayDate.getTime() >= currentDate.getTime()) {
        return "Укажите валидную дату рождения";
    }

    if (
        currentDate.getFullYear() - birthdayDate.getFullYear() < 14 ||
        (currentDate.getFullYear() - birthdayDate.getFullYear() == 14 &&
            birthdayDate.getMonth() > currentDate.getMonth()) ||
        (currentDate.getFullYear() - birthdayDate.getFullYear() == 14 &&
            birthdayDate.getMonth() <= currentDate.getMonth() &&
            birthdayDate.getDate() > currentDate.getDate())
    ) {
        return "Вы еще слишком малы, чтобы пользоваться нашим сервисом :(";
    }

    return "";
}

export function validatePhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) {
        return "Укажите номер телефона";
    }

    if (!phoneNumber.match(/^\+7\s9[0-9]{2}\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/)) {
        return "Невалидный номер телефона";
    }

    return "";
}
