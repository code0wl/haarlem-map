import ko from 'knockout';

export const GoogleMapService = {
    locations: ko.observableArray([]),
    filtered: ko.observableArray([]),
    locationCache: []
}