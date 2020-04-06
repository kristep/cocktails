import { elements } from './base.js';



export const renderResults = (coctails) => {


  if (coctails) {
    coctails.forEach(coctail => {
      const markup = `    
        <div class="search_var"  data-coctailid="${coctail.idDrink}">
          <a class="coctail_link" >
            <span class="bookmark"  data-coctailid="${coctail.idDrink}">
              <h3 class=" title_var" data-coctailid="${coctail.idDrink}">${coctail.strDrink} </h3>
              <span class="alco" data-coctailid="${coctail.idDrink}">${coctail.strAlcoholic}</span>
              <span class="category" data-coctailid="${coctail.idDrink}">${coctail.strCategory !== 'Other/Unknown' ? coctail.strCategory : ''}</span> 
            </span>
          <img class="coctail_img_var" data-coctailid="${coctail.idDrink}"
            data-tab="${coctail.strDrink}"
              src="${coctail.strDrinkThumb}" alt="mojito"/>              
          </a>        
        </div>`;
      elements.searchResults.insertAdjacentHTML("afterbegin", markup);
    })
  }
}


