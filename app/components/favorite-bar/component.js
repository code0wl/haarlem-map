import './component.scss';

export default class FavoriteBar {
    
    constructor() {
        this.placesList = document.querySelector('.favorite-bar');
        this.listFragment = document.createDocumentFragment();
    }

    createFavoritePlace(place) {
        const list = document.createElement('li');
        const icon = document.createElement('span');
        const locationLabel = document.createElement('label');
        locationLabel.textContent = place.name;
        icon.classList.add('fa', 'fa-star-o');
        list.appendChild(icon);
        list.appendChild(locationLabel);
        this.listFragment.appendChild(list);
        this.placesList.appendChild(this.listFragment);
    }

} 