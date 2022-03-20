import recipes from './recipes.js'

var recipeData = {}

function filters(recipeData){
/* Get appliances, ustensils and ingredients and throw everything in Sets to prevent duplicates  */
const ingredientsSet = new Set()
for(let i = 0; i < recipeData.ingredients.length; i++){
  ingredientsSet.add(recipeData.ingredients[i].ingredient)
}
const appliancesSet = new Set()
appliancesSet.add(recipeData.appliance)

const ustensilsSet = new Set()
ustensilsSet.add(recipeData.ustensils)

/* Convert the Sets into Arrays */
var ingredientsArray = Array.from(ingredientsSet)
var applianceArray = Array.from(appliancesSet)
var ustensilsArray = Array.from(ustensilsSet)

/* Display filters from the Array */
console.log('ingredientsArray : ' + ingredientsArray)

const ingredientsFilter = document.querySelector('#ingredientsList')
for(let i = 0; i < ingredientsArray.length; i++){
ingredientsFilter.innerHTML += '<option value="' + ingredientsArray[i] + '">' + ingredientsArray[i] + '</option>'
}

console.log(ingredientsSet)
console.log('applianceArray : ' + applianceArray)
console.log(appliancesSet)
console.log('ustensilsArray : ' + ustensilsArray)
console.log(ustensilsSet)
console.log(ingredientsArray.length, applianceArray.length, ustensilsArray.length)
}

function displayMain(
  recipeData,
) {
  // Display All Recipes
  const displayArea = document.querySelector('.displayRecipes')

  const recipesCard = document.createElement('article')
  recipesCard.className = 'gridRecipesWrapper'
  recipesCard.ariaLabel = 'Contenu Principal'
  recipesCard.id = 'gridRecipesWrapper' + recipeData.id

  displayArea.append(recipesCard)

  const recipe = document.createElement('div')
  recipe.className = 'gridRecipeId'
  recipe.id = 'gridRecipe' + recipeData.id

  recipesCard.append(recipe)

  const recipeImg = document.createElement('img')
  recipeImg.className = 'recipeImg'
  recipeImg.id = 'recipeImg' + recipeData.id

  recipe.append(recipeImg)

  const recipeTitle = document.createElement('h1')
  recipeTitle.className = 'recipeName'
  recipeTitle.textContent = '' + recipeData.name
  recipeTitle.id = 'recipeName' + recipeData.id

  recipe.append(recipeTitle)

  const recipeIngredients = document.createElement('div')
  recipeIngredients.className = 'recipeIngredients'
  recipeIngredients.id = 'recipeIngredients' + recipeData.id

  recipe.append(recipeIngredients)

  const subList = document.createElement('ul')
  subList.className = 'listOfIngredients'
  subList.id = 'listOfIngredients' + recipeData.id

  recipeIngredients.append(subList)

  for(let i = 0; i < recipeData.ingredients.length; i++){
    const subListItems = document.createElement('li')
    if(recipeData.ingredients[i].unit){
      subListItems.textContent = recipeData.ingredients[i].ingredient + " : " + recipeData.ingredients[i].quantity + " " + recipeData.ingredients[i].unit
    } else if(recipeData.ingredients[i].quantity){
      subListItems.textContent = recipeData.ingredients[i].ingredient + " : " + recipeData.ingredients[i].quantity
    } else if(recipeData.ingredients[i].ingredient){
      subListItems.textContent = recipeData.ingredients[i].ingredient
    }
    subList.append(subListItems)
  }

  const recipeTime = document.createElement('span')
  recipeTime.className = 'recipeTime'

  recipeTime.innerHTML = '' + recipeData.time
  recipeTime.id = 'recipeTime' + recipeData.id

  recipe.append(recipeTime)

  const recipeText = document.createElement('p')
  recipeText.className = 'recipeText'
  recipeText.textContent = '' + recipeData.description
  recipeText.id = 'recipeText' + recipeData.id

  recipe.append(recipeText)
}

for (let i = 0; i < recipes.length; i++) {
  recipeData = recipes[i]

  displayMain(
    recipeData,
  )
  filters(recipeData)
}

