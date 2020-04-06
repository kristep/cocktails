import axios from "axios";
import { elements } from '../views/base.js';

export default class Ingredient {
  constructor(name) {
    this.name = name
  }

  async getIngredient() {
    elements.loader.style.display = 'block';
    const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${this.name}`);
    elements.loader.style.display = 'none';
    this.ingredient = res.data.ingredients[0];
  }


}

