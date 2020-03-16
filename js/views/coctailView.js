import { elements } from './base.js';





export const renderCoctail = coctail => {

 console.log(coctail)

  const markup = `
  <div class="coctail_pict_cont">
    <h2 class="coctail_title">${coctail.title}</h2>
    <img class="coctail_img"
    src="${coctail.img}"
    alt="${coctail.title}"/> 
  </div>

  <div class="coctail_instructions"> 
      <p>${coctail.instructions}</p>          
  </div> 

  <ul class="ingredients_list">          
    ${coctail.ingredients.map((el, i) => createIngredient(el, i, coctail.measures)).join('')}
  </ul>   
  `;

  elements.coctailContainer.insertAdjacentHTML('afterbegin', markup);

  window.location.hash = `#${coctail.title}`
}

export const createIngredient = (ingr, i, measures) => `
  <li>
  <a href="#${ingr}">
    <img class="ingr_img_small" data-ingrname="${ingr}" src="https://www.thecocktaildb.com/images/ingredients/${ingr}-Small.png "/>
  </a>
  <span> ${measures[i] ? measures[i] : ''} ${ingr} </span>            
  </li>
`;







