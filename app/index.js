import knockout from 'knockout';
import Navigation from './components/navigation/component';

class App {
    constructor() {
        this.nav = new Navigation();
        document.body.innerHTML = this.nav.navigationList;
    }
}

const app = new App();