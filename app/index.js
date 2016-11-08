import ko from 'knockout';
import Navigation from './components/navigation-bar/component';
import GoogleMaps from './components/google-maps/component';
import Favorite from './components/favorite-bar/component';
import './app.scss';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();
        this.fav = new Favorite();
    }

    changeZoom() {
        this.map.map.setZoom(17);
    }
}

ko.applyBindings(new App());
