export const convertObjectToArray = (obj) => {
    let array = [];

    for (let key in obj) {
        obj[key].id = key
        array.push(obj[key])
    }

    return array;
}

export function getZodiac (day, month) {
    if (!day && !month) {
        return '';
    }

    let result = '';

    switch (month) {
        case 1:
            if (day <= 19)
                result = 'Козерог';
            else
                result = 'Водолей';
            break;
        case 2:
            if (day <= 18)
                result = 'Водолей';
            else
                result = 'Рыбы';
            break;
        case 3:
            if (day <= 20)
                result = 'Рыбы';
            else
                result = 'Овен';
            break;
        case 4:
            if (day <= 19)
                result = 'Овен';
            else
                result = 'Телец';
            break;
        case 5:
            if (day <= 20)
                result = 'Телец';
            else
                result = 'Близнецы';
            break;
        case 6:
            if (day <= 21)
                result = 'Близнецы';
            else
                result = 'Рак';
            break;
        case 7:
            if (day <= 22)
                result = 'Рак';
            else
                result = 'Лев';
            break;
        case 8:
            if (day <= 22)
                result = 'Лев';
            else
                result = 'Дева';
            break;
        case 9:
            if (day <= 22)
                result = 'Дева';
            else
                result = 'Весы';
            break;
        case 10:
            if (day <= 22)
                result = 'Весы';
            else
                result = 'Скорпион';
            break;
        case 11:
            if (day <= 22)
                result = 'Скорпион';
            else
                result = 'Стрелец';
            break;
        case 12:
            if (day <= 21)
                result = 'Стрелец';
            else
                result = 'Козерог';
            break;
    };

    return result;
}
export function getAge (day, month, year) {
    const otherDate = new Date();

    let years = (otherDate.getFullYear() - year);

    if (otherDate.getMonth() < month ||
        otherDate.getMonth() == month && otherDate.getDate() < day) {
        years--;
    }

    return years || '';
}
