import axios from 'axios';
import { elements } from '../views/base.js';
import * as searchView from '../views/searchView';

//ALL INGREDIENTS
export const getAllIngredients = async () => {
  let resList = [];
  let res;
  elements.loader.style.display = 'block';
  res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
  elements.loader.style.display = 'none';
  res.data.drinks.forEach(el => resList.push(el.strIngredient1));
  resList.sort();
  renderAllIngredients(resList);
}

export const renderAllIngredients = ingrList => {
  const list = document.querySelector('.all_ingred');
  ingrList.forEach(el => {
    const li = document.createElement('li');
    list.appendChild(li);
    const anchor = document.createElement('a');
    // anchor.href = `#searching`;
    anchor.dataset.ingredname = `${el}`;
    anchor.innerText = `${el}`;
    li.appendChild(anchor);
    list.appendChild(li);
  })
}



