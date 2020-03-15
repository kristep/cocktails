import { elements } from './base.js';
import axios from "axios";

export const renderIngredient = async ingredient => {
  const markup = `
    <div class="ingr_top">
     <h3 class="ingr_name" id="${ingredient.strIngredient}">${ingredient.strIngredient}</h3>
      <button class="btn btn_showByIngred" data-ingred="${ingredient.strIngredient}">Show all coctails with ${ingredient.strIngredient}</button>   
    </div>
    <div class="ingr_content">
      <img src="${await getIngredientImg(ingredient.strIngredient)}" alt="">
      <p class="ingr_description">${ingredient.strDescription ? ingredient.strDescription : ''}</p>
    </div>  
  `;
  elements.ingrContainer.insertAdjacentHTML('afterbegin', markup);  
}

const getIngredientImg = async (ingr) => {
  const res = await axios.get(`https://www.thecocktaildb.com/images/ingredients/${ingr}-Medium.png `);
    return res.config.url;  
}

export const getInput = () => {
  if(elements.searchInput.value) {
    return elements.searchInput.value
  } else {
    //getFromButton()
  }
}

// function getFromButton() {
//   document.addEventListener('click', e => {
//     if(e.target.className === 'btn_showByIngted') {
//       return e.target.dataset.ingred
//     }
//   })
// }