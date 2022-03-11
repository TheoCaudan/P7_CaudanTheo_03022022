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
  console.log('id = ' + id)
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

//displaySearched(userInput);
//displayFiltered(filter);

for (let i = 0; i < recipes.length; i++) {
  recipeData = recipes[i]
  displayMain(
    recipeData,
  )
}
