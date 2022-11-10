import recipes from './recipes.js'

let result = recipes

const ingredientsSet = new Set()
const appliancesSet = new Set()
const ustensilsSet = new Set()

const ingredientsFilter = document.querySelector('#ingredientsList')
const appliancesFilter = document.querySelector('#applianceList')
const ustensilsFilter = document.querySelector('#ustensilsList')
const filterParams = document.querySelector('#filterParams')
const displayArea = document.querySelector('.displayRecipes')
const searchEngine = document.querySelector('#searchengine')

let getFilters = (arr) => {
  ingredientsSet.clear()
  appliancesSet.clear()
  ustensilsSet.clear()
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr[i].ingredients.length; j++){
      ingredientsSet.add(arr[i].ingredients[j].ingredient.toLowerCase())
    }
    for(let k = 0; k < arr[i].ustensils.length; k++){
      ustensilsSet.add(arr[i].ustensils[k].toLowerCase())
    }
    appliancesSet.add(arr[i].appliance.toLowerCase())
  }
}

let displayMain = (arr) => {
  displayArea.innerHTML = ''
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

let displayFilters = () => {
  let ingredientsArray = Array.from(ingredientsSet)

  ingredientsFilter.innerHTML = '<option value="" hidden selected>Ingredients</option>'
  ingredientsFilter.onclick = () => {
    result = filterIngredient(ingredientsFilter.value, result)
    displayMain(result)
    if(ingredientsFilter.value){
      displayTags()
    }
  }

  for (let i = 0; i < ingredientsArray.length; i++) {
    ingredientsFilter.innerHTML +=
      '<option value="'+ ingredientsArray[i] + '">' + ingredientsArray[i] + '</option>'
  }

  let appliancesArray = Array.from(appliancesSet)

  appliancesFilter.innerHTML = '<option value="" hidden selected>Appareils</option>'
  appliancesFilter.onclick = () => {
    result = filterAppliance(appliancesFilter.value, result)
    displayMain(result)
    if(appliancesFilter.value){
      displayTags()
    }
  } 
  
  for (let i = 0; i < appliancesArray.length; i++) {
    appliancesFilter.innerHTML +=
      '<option value="' + appliancesArray[i] + '">' + appliancesArray[i] + '</option>'
  }

  let ustensilsArray = Array.from(ustensilsSet)

  ustensilsFilter.innerHTML = '<option value="" hidden selected>Ustensiles</option>'
  ustensilsFilter.onclick = () => {
    result = filterUstensil(ustensilsFilter.value, result)
    displayMain(result)
    if(ustensilsFilter.value){
      displayTags()
    }
  }

  for (let i = 0; i < ustensilsArray.length; i++) {
    ustensilsFilter.innerHTML +=
      '<option value="' + ustensilsArray[i] + '">' + ustensilsArray[i] + '</option>'
  }
}

let selectedFilters = () => {
  const filterParamIng = document.createElement('div')
  filterParamIng.className = 'filterParamIng'
  filterParamIng.textContent = ingredientsFilter.value.toLowerCase()
  filterParams.append(filterParamIng)
  filterParamIng.onclick = function (e) {
    e.target.remove()
  }
  const filterParamUst = document.createElement('div')
  filterParamUst.className = 'filterParamUst'
  filterParamUst.textContent = ustensilsFilter.value.toLowerCase()
  filterParams.append(filterParamUst)
  filterParamUst.onclick = function (e) {
    e.target.remove()
  }
  const filterParamApp = document.createElement('div')
  filterParamApp.className = 'filterParamApp'
  filterParamApp.textContent = appliancesFilter.value.toLowerCase()
  filterParams.append(filterParamApp)
  filterParamApp.onclick = function (e) {
    e.target.remove()
  }
}

let filterIngredient = (key, arr) => {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].ingredients.length; j++) {
      if(arr[i].ingredients[j].ingredient.toLowerCase().includes(key.toLowerCase())) {
        result.push(arr[i])
        break
      }
    }
  }
  return result
}

let filterUstensil = (key, arr) => {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].ustensils.length; j++) {
      if(arr[i].ustensils[j].toLowerCase().includes(key.toLowerCase())) {
        result.push(arr[i])
        break
      }
    }
  }
  return result
}

let filterAppliance = (key, arr) => {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].appliance.toLowerCase().includes(key.toLowerCase())) {
      result.push(arr[i])
    }
  }
  return result
}

let displayTags = () => {
  const filterParamIng = document.createElement('div')
  filterParamIng.className = 'filterParamIng'
  filterParamIng.textContent = ingredientsFilter.value.toLowerCase()
  filterParams.append(filterParamIng) 
  filterParamIng.onclick = function (e) {
    e.target.remove()
  }   
  const filterParamUst = document.createElement('div')
  filterParamUst.className = 'filterParamUst'
  filterParamUst.textContent = ustensilsFilter.value.toLowerCase()
  filterParams.append(filterParamUst) 
  filterParamUst.onclick = function (e) {
    e.target.remove()
  }
  const filterParamApp = document.createElement('div')
  filterParamApp.className = 'filterParamApp'
  filterParamApp.textContent = appliancesFilter.value.toLowerCase()
  filterParams.append(filterParamApp) 
  filterParamApp.onclick = function (e) {
    e.target.remove()
  }
}

displayMain(result)
getFilters(result)
displayFilters()
//selectedFilters()

// get recipes, ingredients, appliances, ustensils and push it into arrays
// display recipes, filters available from arrays

/*
let displayMain = (arr) => {
  displayArea.innerHTML = ''
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


let displayFilters = () => {
  let ingredientsArray = Array.from(ingredientsSet)

  ingredientsFilter.innerHTML = '<option value="" hidden selected>Ingredients</option>'
  ingredientsFilter.onclick = () => {
    result = filterIngredient(ingredientsFilter.value, result)
    displayMain(result)
    if(ingredientsFilter.value){
      displayIngredientTags()
    }
  }

  for (let i = 0; i < ingredientsArray.length; i++) {
    ingredientsFilter.innerHTML +=
      '<option value="'+ ingredientsArray[i] + '">' + ingredientsArray[i] + '</option>'
  }

  let appliancesArray = Array.from(appliancesSet)

  appliancesFilter.innerHTML = '<option value="" hidden selected>Appareils</option>'
  appliancesFilter.onclick = () => {
    result = filterAppliance(appliancesFilter.value, result)
    displayMain(result)
    if(appliancesFilter.value){
      displayApplianceTags()
    }
  } 
  
  for (let i = 0; i < appliancesArray.length; i++) {
    appliancesFilter.innerHTML +=
      '<option value="' + appliancesArray[i] + '">' + appliancesArray[i] + '</option>'
  }

  let ustensilsArray = Array.from(ustensilsSet)

  ustensilsFilter.innerHTML = '<option value="" hidden selected>Ustensiles</option>'
  ustensilsFilter.onclick = () => {
    result = filterUstensil(ustensilsFilter.value, result)
    displayMain(result)
    if(ustensilsFilter.value){
      displayUstensilTags()
    }
  }

  for (let i = 0; i < ustensilsArray.length; i++) {
    ustensilsFilter.innerHTML +=
      '<option value="' + ustensilsArray[i] + '">' + ustensilsArray[i] + '</option>'
  }
}

let displayTags = () => {
  const filterParamIng = document.createElement('div')
  filterParamIng.className = 'filterParamIng'
  filterParamIng.textContent = ingredientsFilter.value.toLowerCase()
  filterParams.append(filterParamIng) 
  filterParamIng.onclick = function (e) {
    e.target.remove()
  }   
  const filterParamUst = document.createElement('div')
  filterParamUst.className = 'filterParamUst'
  filterParamUst.textContent = ustensilsFilter.value.toLowerCase()
  filterParams.append(filterParamUst) 
  filterParamUst.onclick = function (e) {
    e.target.remove()
  }
  const filterParamApp = document.createElement('div')
  filterParamApp.className = 'filterParamApp'
  filterParamApp.textContent = appliancesFilter.value.toLowerCase()
  filterParams.append(filterParamApp) 
  filterParamApp.onclick = function (e) {
    e.target.remove()
  }
}

let filterElements = (strTyped, elements) => {
  if(strTyped.length > 2){
    for(let i = 0; i < elements.length; i++){
      if(elements[i].textContent.toLowerCase().includes(strTyped)){
        elements[i].style.display = "block"
      } else {
        elements[i].style.display = "none"
      }
    }
  }
}

displayMain(recipes)
getFilters(recipes)
displayFilters()
displayTags()
searchEngine.addEventListener("keyup", (e) => {
  const searchTyped = e.target.value
  const cards = document.querySelectorAll(".gridRecipesWrapper")
  filterElements(searchTyped, cards)
})
*/
/*
let searchFunction = (key, arr) => {
  let result = []
  if(typeof key === undefined || !key) {
    result = arr
  }
  else if(key.length > 2) {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].name.toLowerCase().includes(key.toLowerCase())) {
        result.push(arr[i])
      }
      else if(arr[i].description.toLowerCase().includes(key.toLowerCase())) {
        result.push(arr[i])
      }
      else if(arr[i].appliance.toLowerCase().includes(key.toLowerCase())) {
        result.push(arr[i])
      }
      else {
        for(let j = 0; j < arr[i].ingredients.length; j++) {
          if(arr[i].ingredients[j].ingredient.toLowerCase().includes(key.toLowerCase())) {
            result.push(arr[i])
            break
          }
        }
        for(let k = 0; k < arr[i].ustensils.length; k++) {
          if(arr[i].ustensils[k].toLowerCase().includes(key.toLowerCase())) {
            result.push(arr[i])
            break
          }
        }
      }
    }
  }
  return result
}

let filterIngredient = (key, arr) => {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].ingredients.length; j++) {
      if(arr[i].ingredients[j].ingredient.toLowerCase().includes(key.toLowerCase())) {
        result.push(arr[i])
        break
      }
    }
  }
  return result
}

let filterUstensil = (key, arr) => {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].ustensils.length; j++) {
      if(arr[i].ustensils[j].toLowerCase().includes(key.toLowerCase())) {
        result.push(arr[i])
        break
      }
    }
  }
  return result
}

let filterAppliance = (key, arr) => {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].appliance.toLowerCase().includes(key.toLowerCase())) {
      result.push(arr[i])
    }
  }
  return result
}

let filters = (arr) => {
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

let displayMain = (arr) => {
  displayArea.innerHTML = ''
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

let displayFilterOptions = () => {
  // display ingredients filters into the select menu
  let ingredientsArray = Array.from(ingredientsSet)

  ingredientsFilter.innerHTML = '<option value="" hidden selected>Ingredients</option>'
  ingredientsFilter.onclick = () => {
    result = filterIngredient(ingredientsFilter.value, result)
    displayMain(result)
    if(ingredientsFilter.value){
      displayIngredientTags()
    }
  }

  for (let i = 0; i < ingredientsArray.length; i++) {
    ingredientsFilter.innerHTML +=
      '<option value="'+ ingredientsArray[i] + '">' + ingredientsArray[i] + '</option>'
  }

  // display appliances filters into the select menu
  let appliancesArray = Array.from(appliancesSet)

  appliancesFilter.innerHTML = '<option value="" hidden selected>Appareils</option>'
  appliancesFilter.onclick = () => {
    result = filterAppliance(appliancesFilter.value, result)
    displayMain(result)
    if(appliancesFilter.value){
      displayApplianceTags()
    }
  } 
  
  for (let i = 0; i < appliancesArray.length; i++) {
    appliancesFilter.innerHTML +=
      '<option value="' + appliancesArray[i] + '">' + appliancesArray[i] + '</option>'
  }

  // display ustensils filters into the select menu
  let ustensilsArray = Array.from(ustensilsSet)

  ustensilsFilter.innerHTML = '<option value="" hidden selected>Ustensiles</option>'
  ustensilsFilter.onclick = () => {
    result = filterUstensil(ustensilsFilter.value, result)
    displayMain(result)
    if(ustensilsFilter.value){
      displayUstensilTags()
    }
  }

  for (let i = 0; i < ustensilsArray.length; i++) {
    ustensilsFilter.innerHTML +=
      '<option value="' + ustensilsArray[i] + '">' + ustensilsArray[i] + '</option>'
  }
}

let displayIngredientTags = () => {
  const filterParamIng = document.createElement('div')
  filterParamIng.className = 'filterParamIng'
  filterParamIng.textContent = ingredientsFilter.value.toLowerCase()
  filterParams.append(filterParamIng) 
  filterParamIng.onclick = function (e) {
    e.target.remove()
    if(filterParams.innerHTML == '') {
      location.reload()
    }
  }   
}

let displayApplianceTags = () => {
  const filterParamApp = document.createElement('div')
  filterParamApp.className = 'filterParamApp'
  filterParamApp.textContent = appliancesFilter.value.toLowerCase()
  filterParams.append(filterParamApp)
  filterParamApp.onclick = function (e) {
    e.target.remove()
    if(filterParams.innerHTML == '') {
      location.reload()
    }
  }
}

let displayUstensilTags = () => {
  const filterParamUst = document.createElement('div')
  filterParamUst.className = 'filterParamUst'
  filterParamUst.textContent = ustensilsFilter.value.toLowerCase()
  filterParams.append(filterParamUst)
  filterParamUst.onclick = function (e) {
    e.target.remove()
    if(filterParams.innerHTML == '') {
      location.reload()
    }
  }
}

displayMain(recipes)
filters(recipes)
displayFilterOptions()
searchEngine.addEventListener('change', function (e) {
  let val = e.target.value
  if(val.length > 2) { 
    result = searchFunction(val, result)
    filters(result)
    displayFilterOptions()
    displayMain(result)
  }
  else {
    displayMain(recipes)
    filters(recipes)
    displayFilterOptions()
  }
})
 */
