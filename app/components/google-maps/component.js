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
        this.dialogs = [];
        this.contents = [];
        this.render();
    }

    update(filtered) {
        this.render(filtered);
    }

    displayLocation(location) {
        const currentLocation = location[0];
        this.markers.map((marker, index) => {
            if (marker.name === currentLocation.name) {
                this.toggleSelected(marker, this.dialogs[index], this.contents[index]);
            }
        });
        this.placeMarkers(location);
    }

    toggleSelected(marker, dialog, content) {
        if (marker.getAnimation() !== null) {
            dialog.close(this.map, marker);
            marker.setAnimation(null);
        } else {
            dialog.open(this.map, marker);
            marker.setAnimation(4);
        }
        dialog.setContent(content);
    }

    createMarkers(place) {
        const that = this;
        const locale = place.geometry.location;
        const search = `${this.fourSquareService.url}=${this.fourSquareService.id}&client_secret=${this.fourSquareService.secret}&v=20130815&ll=${locale.lat()},${locale.lng()}&query=${place.name}`;
        const dialog = new google.maps.InfoWindow();
        const marker = new google.maps.Marker({ position: place.geometry.location, animation: google.maps.Animation.DROP, name: place.name });
        let content = `<div><strong> ${place.name} </strong><br> ${place.vicinity}</div> <p> <span class="icon fa fa-foursquare"></span>`;
        this.markers.push(marker);
        this.dialogs.push(dialog);

        this.fourSquareService
            .requestLocation(search)
            .then(body => {
                if (body.response.venues[0]) {
                    content += `<strong> Total Checkins: </strong> ${body.response.venues[0].stats.checkinsCount}</p>`;
                } else {
                    content += `<strong> No FourSquare information found on location</strong> </p>`;
                }
                this.contents.push(content);
            })
            .then(() => {
                marker.addListener('click', function () {
                    that.toggleSelected(marker, dialog, content);
                });
            })
            .catch(e => {
                alert('content could not have been retrieved from foursquare at this moment');
            });

        this.bounds.extend(place.geometry.location);
        this.map.fitBounds(this.bounds);
    }

    placeMarkers(location) {
        if (!location) {
            this.markers.map(marker => {
                marker.setMap(this.map);
            });
        } else {
            this.markers.map(marker => {
                if (marker.name === location[0].name) {
                    marker.setMap(this.map);
                }
            });
        }
    }

    clearMarkers() {
        this.markers.map(marker => marker.setMap(null));
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
