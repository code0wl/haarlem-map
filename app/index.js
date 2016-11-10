import ko from 'knockout';
import Navigation from './components/navigation-bar/component';
import GoogleMaps from './components/google-maps/component';
import FavoriteBar from './components/favorite-bar/component';
import { GoogleMapService } from './components/google-maps/map-service';
import './app.scss';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();
        this.bar = new FavoriteBar();
        this.bar.locationCollection = GoogleMapService.locations;
    }

    changeZoom() {
        this.map.map.setZoom(17);
    }

    toggleMenu() {
        const open = 'is-open';
        this.nav.domNav.classList.toggle(open);
        this.nav.menu.classList.toggle(open);
    }

}

ko.applyBindings(new App());
