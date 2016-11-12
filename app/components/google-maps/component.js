import { GoogleMapService } from './map-service';
import './component.scss';

export default class GoogleMaps {
    constructor() {
        const haarlem = new google.maps.LatLng(52.387388, 4.646219);

        this.mapSettings = {
            center: haarlem,
            zoom: 10
        }

        this.map = new google.maps.Map(document.getElementById('map'), this.mapSettings);
        this.service = new google.maps.places.PlacesService(this.map);
        this.bounds = new google.maps.LatLngBounds();

        this.request = {
            location: haarlem,
            radius: '500',
            types: ['restaurants']
        };
        this.markers = [];
        this.render();
    }

    update(filtered) {
        this.render(filtered);
    }

    createMarkers(place) {
        const dialog = new google.maps.InfoWindow();

        const marker = new google.maps.Marker({
            title: place.name,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
            dialog.setContent(`<div><strong> ${place.name} </strong><br> ${place.vicinity}</div>`);
            dialog.open(this.map, this);
        });

        this.markers.push(marker);

        this.bounds.extend(place.geometry.location);
        this.map.fitBounds(this.bounds);

    }

    placeMarkers() {
        this.markers.map(marker => {
            marker.setMap(this.map);
        });
    }

    clearMarkers() {
        this.markers.map(marker => {
            marker.setMap(null);
        });
        this.markers = [];
    }

    render(filteredLocations) {
        this.clearMarkers();
        const that = this;
        let getPlaces;

        if (filteredLocations) {
            getPlaces = function getPlaces(places) {
                places.map(result => that.createMarkers(result));
                that.placeMarkers();
            }
            getPlaces(filteredLocations);
        } else {
            getPlaces = function getPlaces(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    results.map(result => that.createMarkers(result));
                    GoogleMapService.locations(results);
                    GoogleMapService.locationCache = results;
                }
                that.placeMarkers();
            }
            this.service.nearbySearch(this.request, getPlaces);
        }
    }
}
