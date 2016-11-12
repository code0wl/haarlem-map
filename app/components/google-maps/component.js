import { GoogleMapService } from './map-service';
import FourSquareService from '../foursquare/foursquare.service';
import 'whatwg-fetch';
import './component.scss';

export default class GoogleMaps {
    constructor() {
        const haarlem = new google.maps.LatLng(52.387388, 4.646219);

        this.mapSettings = {
            center: haarlem,
            zoom: 10
        };

        this.map = new google.maps.Map(document.getElementById('map'), this.mapSettings);
        this.service = new google.maps.places.PlacesService(this.map);
        this.bounds = new google.maps.LatLngBounds();

        this.request = {
            location: haarlem,
            radius: '1500',
            types: ['restaurants', 'gym', 'bowling']
        };

        this.fourSquareService = new FourSquareService();
        this.markers = [];
        this.render();
    }

    update(filtered) {
        this.render(filtered);
    }

    createMarkers(place) {
        const locale = place.geometry.location;
        const search = `${this.fourSquareService.url}=${this.fourSquareService.id}&client_secret=${this.fourSquareService.secret}&v=20130815&ll=${locale.lat()},${locale.lng()}&query=${place.name}`;
        const dialog = new google.maps.InfoWindow();
        const marker = new google.maps.Marker({ position: place.geometry.location, animation: google.maps.Animation.DROP });
        let content = `<div><strong> ${place.name} </strong><br> ${place.vicinity}</div>`

        fetch(search)
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                if (body.response.venues[0]) {
                    content += `<p> <span class="icon fa fa-foursquare"></span>  <strong> Total Checkins: </strong> ${body.response.venues[0].stats.checkinsCount}</p>`;
                }
            });

        google.maps.event.addListener(marker, 'click', function () {
            dialog.setContent(content);
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
