import ko from 'knockout';
import Navigation from './components/navigation/component';
import GoogleMaps from './components/google-maps/component';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();
        this.navigation = this.navItems;
    }

    get navItems() {
        return this.nav.navigation.menu;
    }

}

ko.applyBindings(new App());
    