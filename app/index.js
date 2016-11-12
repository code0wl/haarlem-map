import './app.scss';
import ko from 'knockout';
import Navigation from './components/navigation-bar/component';
import GoogleMaps from './components/google-maps/component';
import FavoriteBar from './components/favorite-bar/component';
import FilterInput from './components/filter-input/component';
import { GoogleMapService } from './components/google-maps/map-service';

class App {
    constructor() {
        this.nav = new Navigation();
        this.map = new GoogleMaps();
        this.bar = new FavoriteBar();
        this.search = new FilterInput();

        this.bindSearch();
        this.locations();
    }

    bindSearch(query) {
        const that = this;
        this.query = ko.observable('');
        this.query.subscribe(query => search(query));

        function search(query) {
            let matchers;
            if (query !== '') {
                matchers = GoogleMapService.locationCache.map(location => {
                    const lowerCase = location.name.toLowerCase();
                    const q = query.toLowerCase();
                    if (location && lowerCase.includes(q)) {
                        return location;
                    } else {
                        return false;
                    }
                }).filter(x => x);
            } else {
                matchers = GoogleMapService.locationCache;
            }
            that.bar.locationCollection(matchers);
            that.map.update(matchers);
        }
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
