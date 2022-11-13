import recipes from "./recipes.js";

let initArray = recipes;
let result = recipes;
let previousResult = result;

const ingredientsSet = new Set();
const ustensilsSet = new Set();
const appliancesSet = new Set();

const ingredientsFilter = document.querySelector("#ingredientsList");
const appliancesFilter = document.querySelector("#applianceList");
const ustensilsFilter = document.querySelector("#ustensilsList");
const filterParams = document.querySelector("#filterParams");
const displayArea = document.querySelector(".displayRecipes");

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
  previousResult = result;
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
  if (filterParams === "") {
    previousResult = recipes;
    displayMain(previousResult);
  } else {
    displayMain(previousResult);
  }
};

displayMain(initArray);
getFilters(initArray);
displayFilters();
