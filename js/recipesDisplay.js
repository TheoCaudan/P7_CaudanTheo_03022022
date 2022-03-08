import recipes from './recipes.js'

var recipeData = {}
var ingredientsData = {}

var ingredientData = []
var quantityData = []
var unitData = []

function displayIngredients(
    ingredientsData,
    ingredientData,
    quantityData,
    unitData,
    id,
) {
  for (let i = 0; i < ingredientsData.length; i++){
  const subListItems = document.createElement('li')
  if(ingredientsData[i].unit){
  subListItems.textContent = ingredientData[i] + " : " + quantityData[i] + " " + unitData[i]
  } else if(ingredientsData[i].quantity){
    subListItems.textContent = ingredientData[i] + " : " + quantityData[i]
  } else if(ingredientsData[i].ingredient){
    subListItems.textContent = ingredientData[i]
  }
  const subList = document.getElementById('listOfIngredients' + id)
  console.log('id = ' +id)
  subList.append(subListItems)
  }
}

function displayMain(
  recipeData,
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
  recipe.id = 'gridRecipe' + recipeData.id

  recipesCard.append(recipe)

  const recipeImg = document.createElement('img')
  recipeImg.className = 'recipeImg'
  recipeImg.id = 'recipeImg' + recipeData.name

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
function ingredientsLoop(ingredients, id){
  for(let j = 0; j < ingredients.length; j++){
    ingredientsData = ingredients[j]
    ingredientData = ingredients[j].ingredient
    quantityData = ingredients[j].quantity
    unitData = ingredients[j].unit
    displayIngredients(
    ingredientsData,
    ingredientData,
    quantityData,
    unitData,
    id,
    )
  }
}
//displaySearched(userInput);
//displayFiltered(filter);
for (let i = 0; i < recipes.length; i++) {
  recipeData = recipes[i]
  displayMain(
    recipeData,
  )
  ingredientsLoop(
    recipeData.ingredients, 
    recipeData.id,
  )
}
