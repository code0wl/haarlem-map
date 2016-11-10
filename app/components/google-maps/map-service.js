import ko from 'knockout';

export const GoogleMapService = {
    locations: ko.observableArray([{name: 'hi from service'}]),
    saveLocation(location) {
        this.locations.push(location);
    }
}