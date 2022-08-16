const $ = document.querySelector.bind(document)

const searchInput = $('.search-control')
const searchBtn = $('.search-btn')
const mealList = $('#meal')
const mealDetailsContent = $('.meal-details-content')
const closeRecipeBtn = $('.recipe-close-btn')


searchBtn.onclick = getDataMeal
mealList.onclick = getRecipeMeal
closeRecipeBtn.onclick = ()=>{
        mealDetailsContent.parentElement.style.display = 'none'

}



function getDataMeal(){
    var valueInput = searchInput.value.trim()
    let api=`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`
    fetch(api)
        .then(res => res.json())
        .then(data =>{
            let html =''
            if(data.meals){
                data.meals.forEach(meal=>{
                    html +=`
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">get recipe</a>
                        </div>
                    </div>
                    `
                })
                mealList.classList.remove('notFound')
            }else{
                html= 'sorry, we did not found your meal!'
                mealList.classList.add('notFound')
            }
            mealList.innerHTML = html
        })
}


function getRecipeMeal(e){
    e.preventDefault()
    let parentMealList = e.target.closest('.recipe-btn').parentElement.parentElement
    console.log(parentMealList);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${parentMealList.dataset.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
         let meal = data.meals[0]
          let html=`
            <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
                <h3>instructions:</h3>
                <p>${meal.strInstructions}</p>
            </div>

            <div class="rercipe-meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="recipe-link">
                <a href="${meal.strYoutube}" target="_blank" class="">watch video</a>
            </div>
          `
          mealDetailsContent.innerHTML = html
          mealDetailsContent.parentElement.classList.add('showRecipe')
        //   mealDetailsContent.parentElement.style.display = 'block'
        })
    
}