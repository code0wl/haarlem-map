export default class FourSquareService {
    constructor() {
        this.url = 'https://api.foursquare.com/v2/venues/search?client_id';
        this.id = 'DPVUN1KPYLNON0CVJZFOKB1SLLRDDK0QSRZ51TWGLDCYAJKJ';
        this.secret = 'YTZPNDX110MS4BNUXHQNABBRLZXTM1QJIRJ5D0ZK0LK1HNG4';
    }

    requestLocation(search) {
        var promise = new Promise(resolver)

        function resolver(resolve, reject) {
            resolve(fetch(search).then(response => response.json()));
            reject(e => console.error(e));
        }

        return promise;
    }

}