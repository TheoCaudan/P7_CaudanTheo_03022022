import recipes from './recipes.js'

let recipeData = {}
let ingredientsData = {}

function displayIngredients(
    ingredient,
    quantity,
    unit,
) {

    const list = document.querySelector('.recipeIngredients')

    const subList = document.createElement('ul')
    subList.className = 'listOfIngredients'
    
    list.append(subList)

    const subListItems = document.createElement('li')
    subListItems.textContent = '' + ingredient + ': ' + quantity + unit

    subList.append(subListItems)

}
function displayMain(
  id,
  name,
  ingredients,
  time,
  description,
  appliance,
  ustensils,
) {
  // Display All Recipes
  const displayArea = document.querySelector('.displayRecipes')

  const recipesCard = document.createElement('article')
  recipesCard.className = 'gridRecipesWrapper'
  recipesCard.ariaLabel = 'Contenu Principal'
  recipesCard.id = 'gridRecipesWrapper'

  displayArea.append(recipesCard)

  const recipe = document.createElement('div')
  recipe.className = 'gridRecipeId'
  recipe.id = 'gridRecipe' + id

  recipesCard.append(recipe)

  const recipeImg = document.createElement('img')
  recipeImg.className = 'recipeImg'
  recipeImg.id = 'recipeImg' + name

  recipe.append(recipeImg)

  const recipeTitle = document.createElement('h1')
  recipeTitle.className = 'recipeName'
  recipeTitle.textContent = '' + name
  recipeTitle.id = 'recipeName' + id

  recipe.append(recipeTitle)

  const recipeIngredients = document.createElement('div')
  recipeIngredients.className = 'recipeIngredients'
  recipeIngredients.id = 'recipeIngredients' + id

  recipe.append(recipeIngredients)

  const recipeTime = document.createElement('span')
  recipeTime.className = 'recipeTime'

  recipeTime.innerHTML = '<i class="fa-regular fa-clock"></i>' + time
  recipeTime.id = 'recipeTime' + id

  recipe.append(recipeTime)

  const recipeText = document.createElement('p')
  recipeText.className = 'recipeText'
  recipeText.textContent = '' + description
  recipeText.id = 'recipeText' + id

  recipe.append(recipeText)
}
//displaySearched(userInput);
//displayFiltered(filter);
for (let i = 0; i < recipes.length; i++) {
  recipeData = recipes[i]
  displayMain(
    recipes[i].id,
    recipes[i].name,
    recipes[i].ingredients,
    recipes[i].time,
    recipes[i].description,
    recipes[i].appliance,
    recipes[i].ustensils,
  )
}
for (let i = 0; i < recipes.ingredients.length; i++) {
    displayIngredients(
    recipes[i].ingredients.ingredient,
    recipes[i].ingredients.quantity,
    recipes[i].ingredients.unit,
  )
}