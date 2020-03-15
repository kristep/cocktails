import Search from "./js/modules/Search.js";
import Coctail from './js/modules/Coctail.js';
import Ingredient from './js/modules/Ingredient.js';
import { elements } from './js/views/base.js';
import * as searchView from './js/views/searchView.js';
import * as coctailView from './js/views/coctailView.js';
import * as ingredientView from './js/views/ingredientView.js';


const state = {};
//state: search obj, current coctail, current ingredient

const clean = () => { 
  elements.recipeContainer.innerHTML = '';    
  elements.searchInput.value = '';  
  elements.searchResults.innerHTML = '';
  elements.error.innerText = '';
  elements.ingrContainer.innerHTML = '';  
}
 
const controlSearch = async () => {
  //get query
  const query = ingredientView.getInput() 


  if(query) { 
    //create new Search obj
    state.search = new Search(query);    
    //prepare UI
    clean();
    //make search and put it in state  
    await state.search.searchCoctail();     
    //render to UI results
    searchView.renderResults(state.search.results);     
  }  
}

const showCoctail = async (id) => {
  //create new Coctail obj
  state.coctail = new Coctail(id);
  clean();
  //get coctail info, put it in state 
  await state.coctail.getCoctailInfo();  
  //render coctail to UI
  coctailView.renderCoctail(state.coctail);  
}

const controlIngredient = async (name) => {
  state.ingredient = new Ingredient(name);
  clean();
  await state.ingredient.getIngredient();    
  ingredientView.renderIngredient(state.ingredient.ingredient);
}


//event handlers
//on load
window.addEventListener('load', () => {
  elements.searchResults.innerHTML = '';  
  window.location.hash = ``;
});

//random btn coctail
elements.randomBtn.addEventListener('click', () => {
  showCoctail();  
})

//radio buttons clicked
elements.titleRadio.onclick = () => {
  clean();
  window.location.hash = ``;
}
elements.ingredRadio.onclick = () => {
  clean();
  window.location.hash = ``;  
}

//search input
elements.searchInput.addEventListener('change', () => {
  controlSearch();
});

//show coctail 
document.addEventListener('click', e => {  
  if(e.target.matches('.search_var, .search_var *')) {    
    const id = e.target.dataset.coctailid;    
    showCoctail(id); 
  }
})

//show ingredient
document.addEventListener('click', e => {  
  if(e.target.className === 'ingr_img_small') {
    const name = e.target.dataset.ingrname;
    controlIngredient(name)
  }
});

//show coctails by ingredient if clicked in ingredient description
document.addEventListener('click',async e => {  
  if(e.target.className.includes('btn_showByIngred')) {
    elements.ingredRadio.checked = true;
    elements.titleRadio.checked = false;
    
    const query = e.target.dataset.ingred;   
    state.search = new Search(query);
    clean();
    await state.search.searchCoctail();
    searchView.renderResults(state.search.results);    
    }

    window.location.hash = `search by ingred`;
});

window.addEventListener('hashchange', (e) => {
  console.log(e.oldURL);
  console.log(e.newURL);  
})


//finish to convert units
// ?? back
//ingredient style
//ingredient searchView yra undefined dalyku

