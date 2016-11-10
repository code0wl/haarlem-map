import './component.scss';

export default class Navigation {
    constructor() {
        this.navigation = [
            { label: 'menu' }
        ];
        this.domNav = document.querySelector('.favorite-aside');
        this.menu = document.querySelector('.navigation');
    }
} 
