import { GoogleMapService } from './map-service';
import './component.scss';

export default class GoogleMaps {
    constructor() {
        const haarlem = new google.maps.LatLng(52.387388, 4.646219);

        this.mapSettings = {
            center: haarlem,
            zoom: 12
        }

        this.map = new google.maps.Map(document.getElementById('map'), this.mapSettings);
        this.service = new google.maps.places.PlacesService(this.map);

        this.request = {
            location: haarlem,
            radius: '5000',
            types: ['gym', 'bowling_alley']
        };
        this.render();
    }

    createMarkers(place) {
        const bounds = new google.maps.LatLngBounds();

        const marker = new google.maps.Marker({
            map: this.map,
            title: place.name,
            position: place.geometry.location
        });

        GoogleMapService.saveLocation(place);
        bounds.extend(place.geometry.location);
        this.map.fitBounds(bounds);
    }

    render() {
        const that = this;
        this.service.nearbySearch(this.request, getPlaces);

        function getPlaces(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                results.map(result => that.createMarkers(result));
                GoogleMapService.locations = results;
                console.log(GoogleMapService.locations);
            }
        }
    }
}
