
import { elements } from '../views/base.js'

export const renderFav = (coctail) => {
  const markup = `<li id="${coctail.idDrink}" class="dropdown_li">
                    <span class="fav_title" data-name="${coctail.strDrink}">${coctail.strDrink}</span>  
                    <i class="fas fa-times delete_fav" data-id="${coctail.idDrink}"></i>
                  </li>`;

  elements.favoriteDropdown.insertAdjacentHTML('beforeend', markup)

}

