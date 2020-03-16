import axios from "axios";

export default class Ingredient {
  constructor(name) {
    this.name = name
  }

  async getIngredient() {
    const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${this.name}`);    
    this.ingredient = res.data.ingredients[0];    
  }

  
}

