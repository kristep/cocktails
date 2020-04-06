import Search from "./modules/Search.js";
import Coctail from './modules/Coctail.js';
import Ingredient from './modules/Ingredient.js';
import Favorites from './modules/Favorites.js';
import * as showAll from './modules/ShowAll.js';
import { elements } from './views/base.js';
import * as searchView from './views/searchView.js';
import * as coctailView from './views/coctailView.js';
import * as ingredientView from './views/ingredientView.js';
import * as favoritesView from './views/favoritesView.js';



// ********      TODO      **********

//error handling --> works only in searchByIngredient (isvis nerodo dabar)
//make animation on fav dropdown
//finish to convert units  --> dl

const state = {};
//state: search obj, current coctail, current ingredient, favorites

export const clean = () => {
  elements.recipeContainer.innerHTML = '';
  elements.searchInput.value = '';
  elements.searchResults.innerHTML = '';
  elements.ingrContainer.innerHTML = '';
  document.querySelector('.all_ingred').innerHTML = '';
  document.querySelector('.abc_menu').style.display = 'none';
  elements.searchResults.style.display = 'none';
  elements.recipeContainer.style.display = 'none';
  elements.ingrContainer.style.display = 'none';
  elements.favoriteDropdown.style.display = 'none';
}

// const headerShrink = () => {
//   if (window.screen.width > 480) {
//     document.querySelector('header').style.height = '15vh';
//     document.querySelector('header').style.justifyContent = 'space-between';
//     document.querySelector('.header_title').style.fontSize = '2em';
//     elements.sideNav.style.display = 'flex';
//   }
// }
// const headerBig = () => {
//   document.querySelector('header').style.height = '100vh';
// }

const getInput = () => {
  if (elements.searchInput.value) {

    return elements.searchInput.value
  } else if (elements.favoriteTitle) {
    return elements.favoriteTitle.dataset.name
  }
}

/**
 * from API we get:
 * full info about coctail (with category, alcoholic etc) if we searh BY NAME
 * not full ingo if search BY INGREDIENT - I made double request to get full info, searching by ingred --> then searching by names, got from previous request
 */

const controlSearch = async () => {
  //get query (if its not get from arguments)
  let query;
  const inputValue = elements.searchInput.value;
  query = getInput();


  //create new Search obj
  state.search = new Search(query);
  clean()
  if (query) {
    if (elements.titleRadio.checked === true || elements.titleRadio.onclick === true) {
      //make search BY NAME and put it in state     
      state.search = new Search(query);
      await state.search.searchCoctailByName();
      elements.message.innerText = `Search results by "${query}":`;
    } else if (elements.ingredRadio.checked === true || elements.ingredRadio.onclick === true) {
      //make search BY INGRED and get QUERY as name
      await state.search.searchCoctailByIngredient();
      const resultsArr = state.search.results.map(el => el.strDrink);
      query = resultsArr;
      state.search = new Search(query)
      //make search BY NAME to get all data
      await state.search.searchCoctailByNameAfterIngred();
      elements.message.innerText = `Search results by ingredientlime "${inputValue}":`;
    }
    window.location.hash = `search-results`;
  }
}

const showCoctail = async (id) => {
  //create new Coctail obj
  state.coctail = new Coctail(id);
  clean();
  //get coctail info, put it in state 
  await state.coctail.getCoctailInfo();
  window.location.hash = `coctail-${state.coctail.title}`;
  elements.message.style.display = 'none'
}

const controlIngredient = async (name) => {
  state.ingredient = new Ingredient(name);
  clean();
  await state.ingredient.getIngredient();
  window.location.hash = `ingredient-${state.ingredient.ingredient}`
};

const controlFavorites = () => {
  if (!state.favorites) {
    state.favorites = new Favorites()
  }
  const currentID = state.coctail.coctail.idDrink;
  if (!state.favorites.isInFav(currentID)) {
    state.favorites.addFavorites(state.coctail.coctail);
    favoritesView.renderFav(state.coctail.coctail);
  }
}


//***********************   event handlers   **************************
//ON LOAD
window.addEventListener('load', () => {
  clean();
  window.location.hash = ``;
  state.favorites = new Favorites();
  state.favorites.readStorage()
  state.favorites.favorites.forEach(fav => favoritesView.renderFav(fav))
});

// window.addEventListener('scroll', () => {
//   if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) headerShrink()
// });

document.querySelector('.header_title').addEventListener('click', () => {
  clean()
})

document.querySelector('.btn_submit', e => {
  e.preventDefault();
})

//RANDOM coctail
elements.randomBtn.addEventListener('click', () => {
  window.location.hash = `random`;
  showCoctail();
})

// ALL INGREDIENTS
elements.allIngred.addEventListener('click', () => {
  elements.ingredRadio.checked = true;
  elements.titleRadio.checked = false;
  clean();
  window.location.hash = 'allingredients';
})
document.addEventListener('click', async e => {
  if (e.target.dataset.ingredname) {
    clean();
    state.search = new Search(e.target.dataset.ingredname)
    await state.search.searchCoctailByIngredient();
    const resultsArr = state.search.results.map(el => el.strDrink)
    let query = resultsArr;
    state.search = new Search(query);
    await state.search.searchCoctailByNameAfterIngred();
    window.location.hash = 'search-results';
  }
})

//ALL COCTAILS by ABC
elements.allCoctails.addEventListener('click', () => {
  //clean();
  document.querySelector('.abc_menu').style.display = 'flex';
  document.addEventListener('click', async e => {
    if (elements.ABCmenu.contains(e.target) && e.target.tagName === 'A') {
      // clean();
      state.search = new Search();
      await state.search.searchCoctailsByABC(e.target.innerText);
      window.location.hash = 'search-results';
    }
  })

})

//RADIO BUTTONS clicked
elements.titleRadio.onclick = () => {
  clean();
  elements.message.innerText = '';
  window.location.hash = ``;
  elements.searchInput.focus();
}
elements.ingredRadio.onclick = () => {
  clean();
  elements.message.innerText = '';
  window.location.hash = ``;
  elements.searchInput.focus();
}

//SEARCH input
elements.searchInput.addEventListener('change', () => {
  if (elements.titleRadio.checked == false && elements.ingredRadio.checked == false) {
    elements.message.innerText = `Please select one option above (name or ingredient)`;
    elements.searchInput.value = ``;
  } else {
    controlSearch();
  }
  window.location.hash = `searching`;
});

//SHOW coctail 
document.addEventListener('click', e => {
  if (e.target.matches('.search_var, .search_var *') || e.target.matches('.bookmark, .bookmark *')) {
    const id = e.target.dataset.coctailid;
    showCoctail(id);
  }
})

//FAVORITE
//click on fav icon
document.addEventListener('click', e => {
  if (e.target.closest('.fav_icon')) {
    document.querySelector('.fa-star').classList.add('fav_icon-clicked');
    //add to list 
    controlFavorites();
  }
})

//delete all davorites
document.addEventListener('click', (e) => {
  if (e.target.className === 'delete_all') {
    state.favorites.deleteAll()
  };
  elements.favoriteDropdown.style.display = 'none'
})

//delete from favorites list
document.addEventListener('click', e => {
  if (e.target.className.includes('delete_fav')) {
    e.preventDefault();
    state.favorites.deleteFavorite(e.target.dataset.id);
  }
})
//go to favorite coctail
document.addEventListener('click', async e => {
  if (e.target.className === 'fav_title') {
    window.location.hash = `fav-${e.target.dataset.name}`;
    state.coctail = new Coctail();
    await state.coctail.getCoctailInfo(e.target.dataset.name);
    window.location.hash = `coctail-${state.coctail.title}`;
  }
})
//page (except fav_title & delete_fav) clicked - SHOW/HIDE dropdown
document.addEventListener('click', (e) => {
  if (!e.target.className.includes('favorite') && !e.target.className.includes('delete_fav') && !e.target.className.includes('delete_all')) {
    // if (elements.favoriteDropdown.style.display === 'block') {
    elements.favoriteDropdown.style.display = 'none'
    // } else {
    // elements.favoriteDropdown.style.display = 'block'
    // }
  } else if (e.target.className.includes('favorite')) {
    const favTitle = Array.from(document.querySelectorAll('.fav_title'));
    let favCount = favTitle.length;
    elements.favoriteDropdown.style.display = 'block'
    if (favCount === 0) {
      document.querySelector('.delete_all').innerText = 'Favorites list is empty'
    } else {
      document.querySelector('.delete_all').innerText = 'Delete all favorites'
    }
  }
})

//show INGREDIENT
document.addEventListener('click', e => {
  if (e.target.className === 'ingr_img_small') {
    const name = e.target.dataset.ingrname;
    controlIngredient(name)
  }
});

//show coctails by ingredient if clicked in ingredient description
document.addEventListener('click', async e => {
  if (e.target.className.includes('btn_showByIngred')) {
    elements.ingredRadio.checked = true;
    elements.titleRadio.checked = false;
    clean();
    //get query from data set in button
    let query = e.target.dataset.ingred;
    //make search by ingred --> by name
    state.search = new Search(query)
    await state.search.searchCoctailByIngredient();
    const resultsArr = state.search.results.map(el => el.strDrink)
    query = resultsArr;

    state.search = new Search(query);
    await state.search.searchCoctailByNameAfterIngred();

    window.location.hash = 'search-results';
  }
});


document.querySelector('.go-up').addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})





// if (elements.titleRadio.checked == true || elements.ingredRadio.checked == true && elements.searchInput.value != elements.searchInput.defaultValue) {
//   console.log('asdasdsd')
// }


//***********************   route   **************************

window.addEventListener('hashchange', () => {

  if (window.location.hash.includes('search-results')) {
    clean();


    elements.searchResults.style.display = 'flex';
    searchView.renderResults(state.search.results);

  } else if (window.location.hash.includes('coctail-')) {
    clean();
    elements.recipeContainer.style.display = 'grid';
    coctailView.renderCoctail(state.coctail)
  } else if (window.location.hash.includes('ingredient-')) {
    clean();
    elements.ingrContainer.style.display = 'flex';
    ingredientView.renderIngredient(state.ingredient.ingredient)
  }
  else if (window.location.hash === '#allingredients') {
    clean();
    showAll.getAllIngredients();
  } else if (window.location.hash === '#allcoctails') {
    clean();
    document.querySelector('.abc_menu').style.display = 'flex';
  }


  else if (!window.location.hash) {
    clean();
    //window.location.hash = '';
  }
})



