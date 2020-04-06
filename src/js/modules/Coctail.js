import axios from "axios";
import { elements } from '../views/base';

export default class Coctail {
  constructor(id) {
    this.id = id
  }

  async getCoctailInfo() {
    let res;

    if (window.location.hash === '#search-results') {
      //get coctail by id
      elements.loader.style.display = 'block';
      res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`);
      elements.loader.style.display = 'none';
    } else if (window.location.hash.includes('#fav-')) {
      const name = location.hash.substr(5);
      elements.loader.style.display = 'block';
      res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
      elements.loader.style.display = 'none';

    } else {
      //get random coctail
      elements.loader.style.display = 'block';
      res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
      elements.loader.style.display = 'none';
    }

    this.coctail = res.data.drinks[0];
    this.title = res.data.drinks[0].strDrink;
    this.instructions = res.data.drinks[0].strInstructions;
    this.img = res.data.drinks[0].strDrinkThumb;

    //get ingredients and measures (in json they ara separete),
    //and convert units
    let ingredients = [];
    let measures = [];
    Object.entries(this.coctail).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== null) {
        ingredients.push(value);
      } else if (key.includes('strMeasure') && value !== null) {
        measures.push(convertUnits(value))
      }
      function convertUnits(measure) {
        let count;
        const ozIndex = measure.indexOf('oz');
        const clIndex = measure.indexOf('cl');
        const fifthIndex = measure.indexOf('fifth');
        const galIndex = measure.indexOf('gal');
        const qtIndex = measure.indexOf('qt');
        if (ozIndex > -1) {
          count = 30 * eval(measure.slice(0, ozIndex - 1).replace(' ', '+'));
          return `${count} ml`;
        } else if (clIndex > -1) {
          count = 10 * eval(measure.slice(0, clIndex - 1).replace(' ', '+'));
          return `${count} ml`;
        } else if (fifthIndex > -1) {
          count = measure.slice(0, fifthIndex - 1);
          return `${count} ${'fifth'.replace('fifth', 'bottle/s (750ml)')}`;
        } else if (galIndex > -1) {
          count = 3.8 * eval(measure.slice(0, galIndex - 1).replace(' ', '+'));
          return `${count} L`;
        } else if (qtIndex > -1) {
          count = 1 * eval(measure.slice(0, qtIndex - 1).replace(' ', '+'));
          return `${count} L`;
        }
        else return value;
        //1 pint    
        //1 dl
      }
    });
    this.ingredients = ingredients;
    this.measures = measures;
  }
}






