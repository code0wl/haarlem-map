import './component.scss';
import { GoogleMapService } from './map-service';
import FavoriteBar from '../favorite-bar/component';

export default class GoogleMaps {
    constructor() {
        const haarlem = new google.maps.LatLng(52.387388, 4.646219);
        this.bar = new FavoriteBar();
        this.mapSettings = {
            center: haarlem,
            zoom: 12
        }

        this.request = {
            location: haarlem,
            radius: '5000',
            types: ['gym', 'bowling_alley']
        };
        this.render();
    }

    createMarkers(place) {
        const bounds = new google.maps.LatLngBounds();
        const image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        const marker = new google.maps.Marker({
            map: this.map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        GoogleMapService.saveLocation(place);

        bounds.extend(place.geometry.location);

        this.map.fitBounds(bounds);

    }

    render() {
        const that = this;
        this.map = new google.maps.Map(document.getElementById('map'), this.mapSettings);
        this.service = new google.maps.places.PlacesService(this.map);
        this.service.nearbySearch(this.request, places);

        function places(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                results.map(result => {
                    return that.createMarkers(result);
                });
            }
        }
        this.bar.locationCollection = GoogleMapService.locations;
        console.log(this.bar);
        return this.service;
    }

} 