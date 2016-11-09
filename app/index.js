import ko from 'knockout';
import Navigation from './components/navigation-bar/component';
import GoogleMaps from './components/google-maps/component';

import './app.scss';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();        
    }

    changeZoom() {
        this.map.map.setZoom(17);
    }
}

ko.applyBindings(new App());
