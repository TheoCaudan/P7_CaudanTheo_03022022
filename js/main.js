import recipes from "./recipes.js";

let initArray = recipes;
let result = recipes;

let currentRecipe = [];
let arrFiltered = [];

const ingredientsSet = new Set();
const ustensilsSet = new Set();
const appliancesSet = new Set();

const ingredientsFilter = document.querySelector("#ingredientsList");
const appliancesFilter = document.querySelector("#applianceList");
const ustensilsFilter = document.querySelector("#ustensilsList");

const filterParams = document.querySelector("#filterParams");
/* const activeFilters = document.querySelectorAll("#filterParams").children; */

const displayArea = document.querySelector(".cards");
const searchBar = document.getElementById("searchBar");
const cards = document.querySelectorAll(".gridRecipesWrapper");

let displayMain = (arr) => {
  displayArea.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const recipesCard = document.createElement("article");
    recipesCard.className = "gridRecipesWrapper";
    recipesCard.ariaLabel = "Contenu Principal";
    recipesCard.id = "gridRecipesWrapper" + arr[i].id;

    displayArea.append(recipesCard);

    const recipe = document.createElement("div");
    recipe.className = "gridRecipeId";
    recipe.id = "gridRecipe" + arr[i].id;

    recipesCard.append(recipe);

    const recipeImg = document.createElement("img");
    recipeImg.className = "recipeImg";
    recipeImg.id = "recipeImg" + arr[i].id;

    recipe.append(recipeImg);

    const recipeTitle = document.createElement("h1");
    recipeTitle.className = "recipeName";
    recipeTitle.textContent = "" + arr[i].name;
    recipeTitle.id = "recipeName" + arr[i].id;

    recipe.append(recipeTitle);

    const recipeIngredients = document.createElement("div");
    recipeIngredients.className = "recipeIngredients";
    recipeIngredients.id = "recipeIngredients" + arr[i].id;

    recipe.append(recipeIngredients);

    const subList = document.createElement("ul");
    subList.className = "listOfIngredients";
    subList.id = "listOfIngredients" + arr[i].id;

    recipeIngredients.append(subList);

    for (let j = 0; j < arr[i].ingredients.length; j++) {
      const subListItems = document.createElement("li");
      if (arr[i].ingredients[j].unit) {
        subListItems.textContent =
          arr[i].ingredients[j].ingredient +
          " : " +
          arr[i].ingredients[j].quantity +
          " " +
          arr[i].ingredients[j].unit;
      } else if (arr[i].ingredients[j].quantity) {
        subListItems.textContent =
          arr[i].ingredients[j].ingredient +
          " : " +
          arr[i].ingredients[j].quantity;
      } else if (arr[i].ingredients[j].ingredient) {
        subListItems.textContent = arr[i].ingredients[j].ingredient;
      }
      subList.append(subListItems);
    }

    const recipeTime = document.createElement("span");
    recipeTime.className = "recipeTime";

    recipeTime.innerHTML = "" + arr[i].time;
    recipeTime.id = "recipeTime" + arr[i].id;

    recipe.append(recipeTime);

    const recipeText = document.createElement("p");
    recipeText.className = "recipeText";
    recipeText.textContent = "" + arr[i].description;
    recipeText.id = "recipeText" + arr[i].id;

    recipe.append(recipeText);
  }
};

let getFilters = (arr) => {
  ingredientsSet.clear();
  appliancesSet.clear();
  ustensilsSet.clear();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].ingredients.length; j++) {
      ingredientsSet.add(arr[i].ingredients[j].ingredient.toLowerCase());
    }
    for (let k = 0; k < arr[i].ustensils.length; k++) {
      ustensilsSet.add(arr[i].ustensils[k].toLowerCase());
    }
    appliancesSet.add(arr[i].appliance.toLowerCase());
  }
};

let displayFilters = () => {
  let ingredientsArray = Array.from(ingredientsSet);

  ingredientsFilter.innerHTML =
    '<option value="" hidden selected>Ingredients</option>';
  ingredientsFilter.onclick = () => {
    result = filterIngredient(ingredientsFilter.value, result);
    displayMain(result);
    if (ingredientsFilter.value) {
      displayIngredientsTags();
      currentRecipeTracker(ingredientsFilter.value);
      filterOptions(currentRecipe);
    }
  };

  for (let i = 0; i < ingredientsArray.length; i++) {
    ingredientsFilter.innerHTML +=
      '<option value="' +
      ingredientsArray[i] +
      '">' +
      ingredientsArray[i] +
      "</option>";
  }

  let appliancesArray = Array.from(appliancesSet);

  appliancesFilter.innerHTML =
    '<option value="" hidden selected>Appareils</option>';
  appliancesFilter.onclick = () => {
    result = filterAppliance(appliancesFilter.value, result);
    displayMain(result);
    if (appliancesFilter.value) {
      displayAppliancesTags();
      currentRecipeTracker(appliancesFilter.value);
      filterOptions(currentRecipe);
    }
  };

  for (let i = 0; i < appliancesArray.length; i++) {
    appliancesFilter.innerHTML +=
      '<option value="' +
      appliancesArray[i] +
      '">' +
      appliancesArray[i] +
      "</option>";
  }

  let ustensilsArray = Array.from(ustensilsSet);

  ustensilsFilter.innerHTML =
    '<option value="" hidden selected>Ustensiles</option>';
  ustensilsFilter.onclick = () => {
    result = filterUstensil(ustensilsFilter.value, result);
    displayMain(result);
    if (ustensilsFilter.value) {
      displayUstensilsTags();
      currentRecipeTracker(ustensilsFilter.value);
      filterOptions(currentRecipe); 
    }
  };

  for (let i = 0; i < ustensilsArray.length; i++) {
    ustensilsFilter.innerHTML +=
      '<option value="' +
      ustensilsArray[i] +
      '">' +
      ustensilsArray[i] +
      "</option>";
  }
};

let displayIngredientsTags = () => {
  const filterParamIng = document.createElement("div");
  filterParamIng.className = "filterParamIng";
  filterParamIng.textContent = ingredientsFilter.value.toLowerCase();
  filterParams.append(filterParamIng);
  filterParamIng.onclick = function (e) {
    e.target.remove();
    eventHandler();
  };
};

let displayAppliancesTags = () => {
  const filterParamApp = document.createElement("div");
  filterParamApp.className = "filterParamApp";
  filterParamApp.textContent = appliancesFilter.value.toLowerCase();
  filterParams.append(filterParamApp);
  filterParamApp.onclick = function (e) {
    e.target.remove();
    eventHandler();
  };
};

let displayUstensilsTags = () => {
  const filterParamUst = document.createElement("div");
  filterParamUst.className = "filterParamUst";
  filterParamUst.textContent = ustensilsFilter.value.toLowerCase();
  filterParams.append(filterParamUst);
  filterParamUst.onclick = function (e) {
    e.target.remove();
    eventHandler();
  };
};

let filterIngredient = (key, arr) => {
  result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].ingredients.length; j++) {
      if (
        arr[i].ingredients[j].ingredient
          .toLowerCase()
          .includes(key.toLowerCase())
      ) {
        result.push(arr[i]);
        break;
      }
    }
  }
  return result;
};

let filterAppliance = (key, arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].appliance.toLowerCase().includes(key.toLowerCase())) {
      result.push(arr[i]);
      break;
    }
  }
  return result;
};

let filterUstensil = (key, arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].ustensils.length; j++) {
      if (arr[i].ustensils[j].toLowerCase().includes(key.toLowerCase())) {
        result.push(arr[i]);
        break;
      }
    }
  }
  return result;
};

let eventHandler = () => {
  if (filterParams.children.length === 0) {
    displayMain(initArray);
  } else {
    let r = filterParams.children[0].textContent.toLowerCase();
    const actingArray = [];
    for (let i = 0; i < initArray.length; i++) {
      if (
        initArray[i].name.toLowerCase().includes(r) ||
        initArray[i].ingredients.ingredient.toLowerCase().includes(r) ||
        initArray[i].description.toLowerCase().includes(r) ||
        initArray[i].appliance.toLowerCase().includes(r) ||
        initArray[i].ustensils.toLowerCase().includes(r)
      ) {
        actingArray.push(initArray[i]);
      }
    }
    displayMain(actingArray);
  }
};

let searchResults = (key, element) => {
  if (key.length > 2) {
    for (let i = 0; i < element.length; i++) {
      if (element[i].textContent.toLowerCase().includes(key)) {
        element[i].style.display = "block";
      } else {
        element[i].style.display = "none";
      }
    }
  }
};

let filterOptions = (arr) => {
  arrFiltered = [];
  if (filterParams.innerText) {
    for(let m = 0; m < appliancesFilter.length; m++) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].appliance.toLowerCase().includes(appliancesFilter[m].innerText)) {
          arrFiltered.push(arr[i]);
        } else
          for (let j = 0; j < arr[i].ingredients.length; j++) {
            if (
              arr[i].ingredients[j].ingredient
                .toLowerCase()
                .includes(ingredientsFilter[m].innerText)
            ) {
              arrFiltered.push(arr[i]);
            } else
                if (
                  arr[i].ustensils
                    .toLowerCase()
                    .includes(ustensilsFilter[m].innerText)
                ) {
                  arrFiltered.push(arr[i]);
                }
          }
      }
    }
  } else
    for (let i = 0; i < arr.length; i++) {
      arrFiltered.push(arr[i]);
  }
  cards.remove();
  displayMain(arrFiltered);
}; 

let currentRecipeTracker = (key) => {
  currentRecipe = [];
  for (let i = 0; i < initArray.length; i++) {
    if (initArray[i].name.toLowerCase().includes(key.toLowerCase())) {
      currentRecipe.push(initArray[i]);
    } else if (initArray[i].description.toLowerCase().includes(key.toLowerCase())) {
      currentRecipe.push(initArray[i]);
    } else for (let j = 0; j < initArray[i].ingredients.length; j++) {
      if (initArray[i].ingredients[j].ingredient.toLowerCase().includes(key.toLowerCase())) {
        currentRecipe.push(initArray[i]);
      }
    }
  }
};

displayMain(initArray);
getFilters(initArray);
displayFilters();
searchBar.onchange = (e) => {
  const val = e.target.value;
  searchResults(val, cards);
};
