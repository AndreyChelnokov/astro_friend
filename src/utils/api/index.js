// https://vgoroskope.ru/api/"Method"?"Parameters"&access_token="AccessToken";
// https://vgoroskope.ru/api/planetvalues??city=236922&date=2015-01&hour=11


const TOKEN = 'c9afc57febcd1cdb668bfef1a944a293';

export class Api {
    constructor() {
    }

    static get(method = 'planetvalues', city = 236922, date = '2015-01', hour = 11) {
        fetch(`https://vgoroskope.ru/api/${method}??city=${city}&date=${date}&hour=${hour}&access_token=${TOKEN}&format=json`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
            })
    }
}
