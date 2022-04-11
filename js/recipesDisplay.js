import recipes from './recipes.js'

let currentRecipe = []

const ingredientsSet = new Set()
const appliancesSet = new Set()
const ustensilsSet = new Set()

function search(key) {
  currentRecipe = []
  for(let i = 0; i < recipes.length; i++){
    if(recipes[i].name.toLowerCase().includes(key.toLowerCase())){
      currentRecipe.push(recipes[i])
    } else if(recipes[i].description.toLowerCase().includes(key.toLowerCase())){
      currentRecipe.push(recipes[i])
    } else for(let j = 0; j < recipes[i].ingredients.length; j++){
      if(recipes[i].ingredients[j].ingredient.toLowerCase().includes(key.toLowerCase())){
        currentRecipe.push(recipes[i])
      }
    }
  }
  document.querySelector('.displayRecipes').innerHTML = ''
  displayMain(currentRecipe)
  filters(currentRecipe)
  displayFilterOptions()
}

function filters(arr) {
  /* Get appliances, ustensils and ingredients converted to lower case and throw everything in Sets to prevent duplicates  */
  ingredientsSet.clear()
  ustensilsSet.clear()
  appliancesSet.clear()
  for(let k = 0; k < arr.length; k++){
    for (let i = 0; i < arr[k].ingredients.length; i++) {
      ingredientsSet.add(arr[k].ingredients[i].ingredient.toLowerCase())
    }
    for (let i = 0; i < arr[k].ustensils.length; i++) {
      ustensilsSet.add(arr[k].ustensils[i].toLowerCase())
    }
    appliancesSet.add(arr[k].appliance.toLowerCase())
  }
}

function displayMain(arr) {
  for(let i = 0; i < arr.length; i++){
    const recipesCard = document.createElement('article')
    recipesCard.className = 'gridRecipesWrapper'
    recipesCard.ariaLabel = 'Contenu Principal'
    recipesCard.id = 'gridRecipesWrapper' + arr[i].id

    displayArea.append(recipesCard)

    const recipe = document.createElement('div')
    recipe.className = 'gridRecipeId'
    recipe.id = 'gridRecipe' + arr[i].id

    recipesCard.append(recipe)

    const recipeImg = document.createElement('img')
    recipeImg.className = 'recipeImg'
    recipeImg.id = 'recipeImg' + arr[i].id

    recipe.append(recipeImg)

    const recipeTitle = document.createElement('h1')
    recipeTitle.className = 'recipeName'
    recipeTitle.textContent = '' + arr[i].name
    recipeTitle.id = 'recipeName' + arr[i].id

    recipe.append(recipeTitle)

    const recipeIngredients = document.createElement('div')
    recipeIngredients.className = 'recipeIngredients'
    recipeIngredients.id = 'recipeIngredients' + arr[i].id

    recipe.append(recipeIngredients)

    const subList = document.createElement('ul')
    subList.className = 'listOfIngredients'
    subList.id = 'listOfIngredients' + arr[i].id

    recipeIngredients.append(subList)

    for (let j = 0; j < arr[i].ingredients.length; j++) {
      const subListItems = document.createElement('li')
      if (arr[i].ingredients[j].unit) {
        subListItems.textContent =
          arr[i].ingredients[j].ingredient + ' : ' +
          arr[i].ingredients[j].quantity + ' ' +
          arr[i].ingredients[j].unit
      } else if (arr[i].ingredients[j].quantity) {
        subListItems.textContent =
          arr[i].ingredients[j].ingredient + ' : ' + arr[i].ingredients[j].quantity
      } else if (arr[i].ingredients[j].ingredient) {
        subListItems.textContent = arr[i].ingredients[j].ingredient
      }
      subList.append(subListItems)
    }

    const recipeTime = document.createElement('span')
    recipeTime.className = 'recipeTime'

    recipeTime.innerHTML = '' + arr[i].time
    recipeTime.id = 'recipeTime' + arr[i].id

    recipe.append(recipeTime)

    const recipeText = document.createElement('p')
    recipeText.className = 'recipeText'
    recipeText.textContent = '' + arr[i].description
    recipeText.id = 'recipeText' + arr[i].id

    recipe.append(recipeText)
  }
}

function displayFilterOptions() {
  const ingredientsArray = Array.from(ingredientsSet)
  const ingredientsFilter = document.querySelector('#ingredientsList')

  ingredientsFilter.innerHTML = '<option value="" hidden selected>Ingredients</option>'
  ingredientsFilter.onclick = function () {
    const filterParams = document.querySelector('#filterParams')
    const filterParamIng = document.createElement('div')
    filterParamIng.className = 'filterParamIng'
    filterParamIng.textContent = ingredientsFilter.value
    filterParamIng.onclick = function () {
      this.remove()
    }
    filterParams.append(filterParamIng)

  }
  
  for (let i = 0; i < ingredientsArray.length; i++) {
    ingredientsFilter.innerHTML +=
      '<option value="'+ ingredientsArray[i] + '">' + ingredientsArray[i] + '</option>'
  }
  const appliancesArray = Array.from(appliancesSet)
  const appliancesFilter = document.querySelector('#applianceList')

  appliancesFilter.innerHTML = '<option value="" hidden selected>Appareils</option>'
  appliancesFilter.onclick = function () {
    const filterParams = document.querySelector('#filterParams')
    const filterParamApp = document.createElement('div')
    filterParamApp.className = 'filterParamApp'
    filterParamApp.textContent = appliancesFilter.value
    filterParamApp.onclick = function () {
      this.remove()
    }

    filterParams.append(filterParamApp)

  }

  for (let i = 0; i < appliancesArray.length; i++) {
    appliancesFilter.innerHTML +=
      '<option value="' + appliancesArray[i] + '">' + appliancesArray[i] + '</option>'
  }
  const ustensilsArray = Array.from(ustensilsSet)
  const ustensilsFilter = document.querySelector('#ustensilsList')

  ustensilsFilter.innerHTML = '<option value="" hidden selected>Ustensiles</option>'
  ustensilsFilter.onclick = function () {
    const filterParams = document.querySelector('#filterParams')
    const filterParamUst = document.createElement('div')
    filterParamUst.className = 'filterParamUst'
    filterParamUst.textContent = ustensilsFilter.value
    filterParamUst.onclick = function () {
      this.remove()
    }

    filterParams.append(filterParamUst)

  }

  for (let i = 0; i < ustensilsArray.length; i++) {
    ustensilsFilter.innerHTML +=
      '<option value="' + ustensilsArray[i] + '">' + ustensilsArray[i] + '</option>'
  }
}

const displayArea = document.querySelector('.displayRecipes')

displayMain(recipes)
filters(recipes)
displayFilterOptions()

document.querySelector('#searchengine').addEventListener('keyup', function (e) {
  let val = e.target.value
  if (val.length > 2) {
    search(val)
  } else {
    document.querySelector('.displayRecipes').innerHTML = ''
    displayMain(recipes)
    filters(recipes)
    displayFilterOptions()
  }
})
