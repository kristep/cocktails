import { elements } from './base.js';

export const renderCoctail = coctail => {
  const markup = `
  <h2 class="coctail_title">${coctail.title}<i class="far fa-star fav_icon"></i></h2>
  <img class="coctail_pict" src="${coctail.img}" alt="coctail image"/>   
  <div class="coctail_instructions"> 
      <p>${coctail.instructions}</p>          
  </div> 
  <ul class="ingredients_list">    
    ${coctail.ingredients.map((el, i) => createIngredient(el, i, coctail.measures)).join('')}
  </ul>   
  `;

  elements.coctailContainer.insertAdjacentHTML('afterbegin', markup);
}

export const createIngredient = (ingr, i, measures) => `
  <li>
  <a>
    <img class="ingr_img_small" data-ingrname="${ingr}" data-tab="${ingr}" src="https://www.thecocktaildb.com/images/ingredients/${ingr}-Small.png "/>
  </a>
  <span> ${measures[i] ? measures[i] : ''} ${ingr} </span>            
  </li>
`;







