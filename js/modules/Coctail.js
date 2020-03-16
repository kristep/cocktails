import axios from "../../node_modules/axios/index";
import { elements } from '../views/base';

export default class Coctail {
  constructor(id) {
    this.id = id
  }

  async getCoctailInfo() {
    let res;

    if(window.location.hash === '#search%20results') {
      //get coctail by id
      res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`);
    } else {
      //get random coctail
      res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);      
    }
console.log(res)

    this.coctail = res.data.drinks[0];
    this.title = res.data.drinks[0].strDrink;
    this.instructions = res.data.drinks[0].strInstructions;
    this.img = res.data.drinks[0].strDrinkThumb;  
 
    //get ingredients and measures (in json they ara separete),
    //and convert units
    let ingredients = [];
    let measures = [];    
    Object.entries(this.coctail).forEach(([key, value]) => {
      if(key.includes('strIngredient') && value !== null) {
        ingredients.push(value);
      } else if(key.includes('strMeasure') && value !== null) {
        measures.push(convertUnits(value))        
      }
      function convertUnits(measure) {
        const ozIndex = measure.indexOf('oz');
        if (ozIndex > -1) {
          const count = 30 * eval(measure.slice(0, ozIndex-1).replace(' ', '+'));        
          return `${count} ml`;
        } else return value;
        //1 fifth
        //1 pint
        //1 qt (quarts)
        //1 cl (centilitre)
        //1 dl
          }
        }  
      );

      this.ingredients = ingredients;
      this.measures = measures;
      
  }

  
}






