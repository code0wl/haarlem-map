import ko from 'knockout';

export const GoogleMapService = {
    locations: ko.observableArray([]),
    saveLocation(location) {
        this.locations.push(location);
    }
}