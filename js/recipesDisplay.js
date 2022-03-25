import recipes from "./recipes.js";

var recipeData = {};

const ingredientsSet = new Set();
const appliancesSet = new Set();
const ustensilsSet = new Set();

function filters(recipeData) {
  /* Get appliances, ustensils and ingredients convert to lower case and throw everything in Sets to prevent duplicates  */

  for (let i = 0; i < recipeData.ingredients.length; i++) {
    ingredientsSet.add(recipeData.ingredients[i].ingredient.toLowerCase());
  }
  for (let i = 0; i < recipeData.ustensils.length; i++) {
    ustensilsSet.add(recipeData.ustensils[i].toLowerCase());
  }
  appliancesSet.add(recipeData.appliance.toLowerCase());
}

function displayMain(recipeData) {
  // Display All Recipes
  const displayArea = document.querySelector(".displayRecipes");

  const recipesCard = document.createElement("article");
  recipesCard.className = "gridRecipesWrapper";
  recipesCard.ariaLabel = "Contenu Principal";
  recipesCard.id = "gridRecipesWrapper" + recipeData.id;

  displayArea.append(recipesCard);

  const recipe = document.createElement("div");
  recipe.className = "gridRecipeId";
  recipe.id = "gridRecipe" + recipeData.id;

  recipesCard.append(recipe);

  const recipeImg = document.createElement("img");
  recipeImg.className = "recipeImg";
  recipeImg.id = "recipeImg" + recipeData.id;

  recipe.append(recipeImg);

  const recipeTitle = document.createElement("h1");
  recipeTitle.className = "recipeName";
  recipeTitle.textContent = "" + recipeData.name;
  recipeTitle.id = "recipeName" + recipeData.id;

  recipe.append(recipeTitle);

  const recipeIngredients = document.createElement("div");
  recipeIngredients.className = "recipeIngredients";
  recipeIngredients.id = "recipeIngredients" + recipeData.id;

  recipe.append(recipeIngredients);

  const subList = document.createElement("ul");
  subList.className = "listOfIngredients";
  subList.id = "listOfIngredients" + recipeData.id;

  recipeIngredients.append(subList);

  for (let i = 0; i < recipeData.ingredients.length; i++) {
    const subListItems = document.createElement("li");
    if (recipeData.ingredients[i].unit) {
      subListItems.textContent =
        recipeData.ingredients[i].ingredient +
        " : " +
        recipeData.ingredients[i].quantity +
        " " +
        recipeData.ingredients[i].unit;
    } else if (recipeData.ingredients[i].quantity) {
      subListItems.textContent =
        recipeData.ingredients[i].ingredient +
        " : " +
        recipeData.ingredients[i].quantity;
    } else if (recipeData.ingredients[i].ingredient) {
      subListItems.textContent = recipeData.ingredients[i].ingredient;
    }
    subList.append(subListItems);
  }

  const recipeTime = document.createElement("span");
  recipeTime.className = "recipeTime";

  recipeTime.innerHTML = "" + recipeData.time;
  recipeTime.id = "recipeTime" + recipeData.id;

  recipe.append(recipeTime);

  const recipeText = document.createElement("p");
  recipeText.className = "recipeText";
  recipeText.textContent = "" + recipeData.description;
  recipeText.id = "recipeText" + recipeData.id;

  recipe.append(recipeText);
}

for (let i = 0; i < recipes.length; i++) {
  recipeData = recipes[i];
  displayMain(recipeData);
  filters(recipeData);
}
const ingredientsArray = Array.from(ingredientsSet);
const ingredientsFilter = document.querySelector("#ingredientsList");
for (let i = 0; i < ingredientsArray.length; i++) {
  ingredientsFilter.innerHTML +=
    '<option value="ingredient' + i + '">' + ingredientsArray[i] + "</option>";
}
const appliancesArray = Array.from(appliancesSet);
const appliancesFilter = document.querySelector("#applianceList");
for (let i = 0; i < appliancesArray.length; i++) {
  appliancesFilter.innerHTML +=
    '<option value="appliance' + i + '">' + appliancesArray[i] + "</option>";
}
const ustensilsArray = Array.from(ustensilsSet);
const ustensilsFilter = document.querySelector("#ustensilsList");
for (let i = 0; i < ustensilsArray.length; i++) {
  ustensilsFilter.innerHTML +=
    '<option value="ustensil' + i + '">' + ustensilsArray[i] + "</option>";
}
