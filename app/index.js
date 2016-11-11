import ko from 'knockout';
import Navigation from './components/navigation-bar/component';
import GoogleMaps from './components/google-maps/component';
import FavoriteBar from './components/favorite-bar/component';
import FilterInput from './components/filter-input/component';
import { GoogleMapService } from './components/google-maps/map-service';
import './app.scss';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();
        this.bar = new FavoriteBar();
        this.search = new FilterInput();
        this.query = ko.observable('');
        this.locations;
    }

    get locations() {
        return this.bar.locationCollection = GoogleMapService.locations;
    }

    toggleMenu() {
        const open = 'is-open';
        this.nav.domNav.classList.toggle(open);
        this.nav.menu.classList.toggle(open);
    }

}

ko.applyBindings(new App());
