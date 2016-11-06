import './component.scss';

export default class GoogleMaps {
    constructor() {
        this.mapSettings = {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        }
        this.render
    }

    get render() {
        this.map = new google.maps.Map(document.getElementById('map'), this.mapSettings);
        return this.map;
    }
} 