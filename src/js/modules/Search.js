import axios from "axios";
import { elements } from '../views/base.js';
import { clean } from '../index.js'

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async searchCoctailByName() {
    let results = [];
    let res;
    try {
      elements.loader.style.display = 'block';
      res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.query}`);
      elements.loader.style.display = 'none';
      res.data.drinks.forEach(element => {
        results.push(element)
      });
      this.results = results;

    } catch (error) {
      clean();
      elements.loader.style.display = 'none';
      console.log(error);
      if (!res.data.drinks) {
        elements.message.innerText = `Sorry, your search (${this.query}) did not match any coctail.`;
      } else {
        elements.message.innerText = `Sorry, something wrong, try again later.`;
      }
    }
  };

  async searchCoctailByIngredient() {
    let results = [];
    let res;
    try {
      elements.loader.style.display = 'block';
      res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.query}`);

      res.data.drinks.forEach(async element => {
        results.push(element)
      });
      this.results = results;


    } catch (error) {
      clean();
      elements.loader.style.display = 'none';
      console.log(error);
      if (!res.data.drinks) {
        elements.message.innerText = `Sorry, your search (${this.query}) did not match any coctail.`;
      } else {
        elements.message.innerText = `Sorry, something wrong, try again later.`;
      }
    }
  };

  async searchCoctailByNameAfterIngred() {
    try {
      let results = [];
      let res;
      //search by name, this.query - array, got from previous search by name - loopinam
      for (let i = 0; i < this.query.length; i++) {
        elements.loader.style.display = 'block';
        res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.query[i]}`);
        elements.loader.style.display = 'none';
        results.push(res.data.drinks[0])
      }
      this.results = results;

    } catch (error) {
      console.log(error);
      if (!res) {
        elements.message.innerText = `Sorry, your search did not match any coctail.`;
      } else {
        elements.message.innerText = `Sorry, something wrong, try again later.`;
      }
    }
  };

  //ALL COCTAILS BY ABC
  async searchCoctailsByABC(letter) {
    let resList = [];
    let res;
    this.query = letter;
    try {
      elements.loader.style.display = 'block';
      res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${this.query}`);
      elements.loader.style.display = 'none';
      res.data.drinks.forEach(el => resList.push(el));
      elements.searchResults.style.display = 'flex';
      this.results = resList;
    } catch (error) {
      console.log(error);
      if (!res.data) {
        clean();
        elements.message.innerText = `Sorry, currently there is no coctail which begins with (${this.query}).`;
      }
    }
  };

}

