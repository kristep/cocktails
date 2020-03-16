import axios from "axios";
import { elements } from '../views/base.js';


export default class Search {
  constructor(query) {
    this.query = query;
  }

  async searchCoctail() {
    try {
      let results = [];
      let res;
      let res2;

      if(elements.titleRadio.checked === true || elements.titleRadio.onclick === true ) {  
        //search by name
        res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.query}`);

        res.data.drinks.forEach(element => {
          results.push(element)
        }); 
        this.results = results;

      } else if(elements.ingredRadio.checked === true) {  
        //search by ingredient
        res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.query}`);
          res.data.drinks.forEach(element => {
            results.push(element)
          }); 
          this.results = results;





        // res.data.drinks.forEach(async element => {
        //   res2 = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${element.strDrink}`)
          
        //   let result = res2.data.drinks[0]
        //   results.push(result);
                   
        //   //console.log(results)
        //   this.results = results;
        // }); 
        // this.results = results;
         
      } 
   

    } catch(error) {
      console.log(error);
     if(elements.titleRadio.checked === false && elements.ingredRadio.checked === false) {
        elements.error.innerText = 'Please select by which parameter to search - name or ingredient.'
      } else {
          elements.error.innerText = `Sorry, your search (${this.query}) did not match any coctail.`;
      }
    }
  }
}

