
export default class Favorites {
  constructor() {
    this.favorites = [];
  }

  addFavorites(coctail) {
    let favorite = coctail;
    this.favorites.push(favorite);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    return favorite
  }

  deleteFavorite(id) {
    //delete from state  
    const favIndex = this.favorites.findIndex(el => el.idDrink === id);
    this.favorites.splice(favIndex, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    //delete from UI
    const favToDelete = document.getElementById(id);
    favToDelete.parentNode.removeChild(favToDelete);
  }

  deleteAll() {
    //delete from state 
    localStorage.clear();
    this.favorites = [];
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
    //delete from UI
    document.querySelector('.dropdown_content').innerHTML = ` <li class="delete_all">Delete all favorites<i class="far fa-trash-alt"></i></li>`;
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('favorites'));
    // get favorites from localStorage
    if (storage) {
      this.favorites = storage;
    };
  }

  isInFav(id) {
    return this.favorites.findIndex(el => el.idDrink === id) !== -1;
  }
}

