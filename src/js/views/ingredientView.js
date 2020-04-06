import { elements } from './base.js';
import axios from "axios";

export const renderIngredient = async ingredient => {
  const markup = `
    <div class="ingr_top">
      <img src="${await getIngredientImg(ingredient.strIngredient)}" alt="">  
      <button class="btn btn_showByIngred" data-ingred="${ingredient.strIngredient}" data-tab="${ingredient.strIngredient}">Show all coctails with ${ingredient.strIngredient}</button>   
    </div>

   
    
      <p>${ingredient.strDescription ? ingredient.strDescription : ''}</p>
        
  `;
  elements.ingrContainer.insertAdjacentHTML('afterbegin', markup);
}

const getIngredientImg = async (ingr) => {
  const res = await axios.get(`https://www.thecocktaildb.com/images/ingredients/${ingr}-Medium.png `);
  return res.config.url;
}


