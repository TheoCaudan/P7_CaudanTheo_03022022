import recipes from './recipes.js'

var recipeData = {}
var tab = []

const ingredientsSet = new Set()
const appliancesSet = new Set()
const ustensilsSet = new Set()

function search(key) {
  const nodesName = document.querySelectorAll('.recipeName')
  const nodesText = document.querySelectorAll('.recipeText')
  const nodesIngredients = document.querySelectorAll('.listOfIngredients')

  const nodesNameArr = Array.from(nodesName)
  const nodesTextArr = Array.from(nodesText)
  const nodesIngredientsArr = Array.from(nodesIngredients)

  const constructionSet = new Set()

  nodesNameArr.forEach((element) => {
    if (element.innerHTML.toLowerCase().includes(key.toLowerCase())) {
      constructionSet.add(element.parentElement)
    }
  })

  nodesTextArr.forEach((element) => {
    if (element.innerHTML.toLowerCase().includes(key.toLowerCase())) {
      constructionSet.add(element.parentElement)
    }
  })

  nodesIngredientsArr.forEach((element) => {
    if (element.innerHTML.toLowerCase().includes(key.toLowerCase())) {
      constructionSet.add(element.parentElement.parentElement)
    }
  })

  const constructionArr = Array.from(constructionSet)

  const displayArea = document.querySelector('.displayRecipes')
  displayArea.innerHTML = ''
  constructionArr.forEach((el) => {
    displayArea.append(el)
  })
}

function filters(arr) {
  /* Get appliances, ustensils and ingredients converted to lower case and throw everything in Sets to prevent duplicates  */
  for (let i = 0; i < arr.ingredients.length; i++) {
    ingredientsSet.add(arr.ingredients[i].ingredient.toLowerCase())
  }
  for (let i = 0; i < arr.ustensils.length; i++) {
    ustensilsSet.add(arr.ustensils[i].toLowerCase())
  }
  appliancesSet.add(arr.appliance.toLowerCase())
}

function displayMain(arr) {
  // Display All Recipes

  const recipesCard = document.createElement('article')
  recipesCard.className = 'gridRecipesWrapper'
  recipesCard.ariaLabel = 'Contenu Principal'
  recipesCard.id = 'gridRecipesWrapper' + arr.id

  displayArea.append(recipesCard)

  const recipe = document.createElement('div')
  recipe.className = 'gridRecipeId'
  recipe.id = 'gridRecipe' + arr.id

  recipesCard.append(recipe)

  const recipeImg = document.createElement('img')
  recipeImg.className = 'recipeImg'
  recipeImg.id = 'recipeImg' + arr.id

  recipe.append(recipeImg)

  const recipeTitle = document.createElement('h1')
  recipeTitle.className = 'recipeName'
  recipeTitle.textContent = '' + arr.name
  recipeTitle.id = 'recipeName' + arr.id

  recipe.append(recipeTitle)

  const recipeIngredients = document.createElement('div')
  recipeIngredients.className = 'recipeIngredients'
  recipeIngredients.id = 'recipeIngredients' + arr.id

  recipe.append(recipeIngredients)

  const subList = document.createElement('ul')
  subList.className = 'listOfIngredients'
  subList.id = 'listOfIngredients' + arr.id

  recipeIngredients.append(subList)

  for (let i = 0; i < arr.ingredients.length; i++) {
    const subListItems = document.createElement('li')
    if (arr.ingredients[i].unit) {
      subListItems.textContent =
        arr.ingredients[i].ingredient +
        ' : ' +
        arr.ingredients[i].quantity +
        ' ' +
        arr.ingredients[i].unit
    } else if (arr.ingredients[i].quantity) {
      subListItems.textContent =
        arr.ingredients[i].ingredient + ' : ' + arr.ingredients[i].quantity
    } else if (arr.ingredients[i].ingredient) {
      subListItems.textContent = arr.ingredients[i].ingredient
    }
    subList.append(subListItems)
  }

  const recipeTime = document.createElement('span')
  recipeTime.className = 'recipeTime'

  recipeTime.innerHTML = '' + arr.time
  recipeTime.id = 'recipeTime' + arr.id

  recipe.append(recipeTime)

  const recipeText = document.createElement('p')
  recipeText.className = 'recipeText'
  recipeText.textContent = '' + arr.description
  recipeText.id = 'recipeText' + arr.id

  recipe.append(recipeText)
}

function displayFilterOptions() {
  const ingredientsArray = Array.from(ingredientsSet)
  const ingredientsFilter = document.querySelector('#ingredientsList')
  for (let i = 0; i < ingredientsArray.length; i++) {
    ingredientsFilter.innerHTML +=
      '<option value="ingredient' + i + '">' + ingredientsArray[i] + '</option>'
  }
  const appliancesArray = Array.from(appliancesSet)
  const appliancesFilter = document.querySelector('#applianceList')
  for (let i = 0; i < appliancesArray.length; i++) {
    appliancesFilter.innerHTML +=
      '<option value="appliance' + i + '">' + appliancesArray[i] + '</option>'
  }
  const ustensilsArray = Array.from(ustensilsSet)
  const ustensilsFilter = document.querySelector('#ustensilsList')
  for (let i = 0; i < ustensilsArray.length; i++) {
    ustensilsFilter.innerHTML +=
      '<option value="ustensil' + i + '">' + ustensilsArray[i] + '</option>'
  }
}

const displayArea = document.querySelector('.displayRecipes')

for (let i = 0; i < recipes.length; i++) {
  recipeData = recipes[i]
  displayMain(recipeData)
  filters(recipeData)
}
displayFilterOptions()

document.querySelector('#searchengine').addEventListener('keyup', function (e) {
  let val = e.target.value
  console.log(val)
  if (val.length > 2) {
    search(val)
  } else {
    document.querySelector('.displayRecipes').innerHTML = ''
    for (let i = 0; i < recipes.length; i++) {
      recipeData = recipes[i]
      displayMain(recipeData)
      filters(recipeData)
    }
    displayFilterOptions()
  }
})
