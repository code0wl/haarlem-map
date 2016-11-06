import ko from 'knockout';
import Navigation from './components/navigation/component';
import GoogleMaps from './components/google-maps/component';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();
        this.navigation = this.navItems;
        this.addWatchers();
    }

    addWatchers() {
        ko.observable(this.map);
        ko.observable(this.nav);
    }

    get navItems() {
        return this.nav.navigation.menu;
    }
}

ko.applyBindings(new App());
    