export default class GoogleMaps {
    constructor() {
        this.render
    }

    get render() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }
} 