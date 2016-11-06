import ko from 'knockout';
import Navigation from './components/navigation/component';
import GoogleMaps from './components/google-maps/component';

import './app.scss';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();

        console.log(this.nav);
    }

    changeZoom() {
        this.map.map.zoom = 18;
        console.log(this.map.map);
    }
}

ko.applyBindings(new App());
