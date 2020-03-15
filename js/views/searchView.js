import { elements } from './base.js';



export const renderResults = (coctails) => {
  window.location.hash = `search results`;

  if(coctails) {
    coctails.forEach(coctail => {    
      

      const markup = `
        <div class="search_var" >
          <a class="coctail_link" >
            <h3 class="coctail_title title_var" data-coctailid="${coctail.idDrink}">${coctail.strDrink}</h3>
            <img class="coctail_img_var" data-coctailid="${coctail.idDrink}"
              src="${coctail.strDrinkThumb}" alt="mojito"/>
            <span class="alco">${coctail.strAlcoholic}</span>
            <span class="category">${coctail.strCategory !== 'Other/Unknown' ? coctail.strCategory : ''}</span>
            
          </a>        
        </div>`;
  elements.searchResults.insertAdjacentHTML("beforeend", markup);
    })
  }
}