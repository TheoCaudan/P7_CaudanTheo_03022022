function displayMain(id, name, servings, ingredients, time, description, appliance, ustensils) {
    const displayArea = document.querySelector('.displayRecipes')

    const recipes = document.createElement('div')
    recipes.className
}

(async () => {
    await fetch('./recipes.js')
    .then((data) => data.json())
    .then((result) => {
        const parameter = new URLSearchParams(window.location.search)
        const recipeId = parameter.get('id')
        let recipeData = {}

        const parameter2 = new URLSearchParams(document.location.search)
        recipeData = parameter2.get(
            'id',
            'name',
            'servings',
            'ingredients',
            'time',
            'description',
            'appliance',
            'ustensils',
        )

        for (let i = 0; i < result.recipes.length; i++) {
            if (result.recipes[i].id == recipeId) {
                displayMain(
                    result.recipes[i].id,
                    result.recipes[i].name,
                    result.recipes[i].servings,
                    result.recipes[i].ingredients,
                    result.recipes[i].time,
                    result.recipes[i].description,
                    result.recipes[i].appliance,
                    result.recipes[i].ustensils,
                )
                console.log(recipeData)
            }
        }

        let ingredientsData = {}

        const parameter3 = new URLSearchParams(document.location.search)
        ingredientsData = parameter3.get(
            'ingredient',
            'quantity',
            'unit',
        )

        for (let i = 0; i < result.ingredients.length; i++) {
            if (result.ingredients[i].id = recipeId) {
                ingredientsData = result.ingredients[i]
                console.log(ingredientsData)
            }
        }
    })

    displayMain();

}) ()