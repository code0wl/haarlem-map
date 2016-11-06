import ko from 'knockout';
import Navigation from './components/navigation/component';
import GoogleMaps from './components/google-maps/component';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();
        this.navigation = this.navItems;
        this.googleMap = this.mapItem;
    }

    get navItems() {
        return this.nav.navigation.menu;
    }

    get mapItem() {
        console.log(this.map.gm);
        return this.map.gm.map;
    }

}

ko.applyBindings(new App());

    