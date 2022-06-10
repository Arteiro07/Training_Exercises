const mealsEl = document.getElementById('meals');
const favContainer = document.getElementById('fav-meals')
const searchBtn = document.getElementById('search');
const searchTerm = document.getElementById('search-term');
const mealPopup = document.getElementById('popup-container');
const popupCloseBtn = document.getElementById('close-popup');
const mealInfo = document.getElementById('meal-info');

getRandomMeal();
fetchFavMeals();



async function getRandomMeal(){
    const resp = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById( id ){
    const resp = await fetch(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id
    );
    
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal
}

async function getMealBySearch( term ){
    const resp = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s='+term
    );
        
    const respData = await resp.json();
    const Meals = respData.meals;

    return Meals;
}

function addMeal(mealData, random=false){

    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random"> Random Recipe </span> ` : ""}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>     
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
    `;

    btn= meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener("click", () => {
        if(btn.classList.contains('active')){
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        }
        else{
            addMealLs(mealData.idMeal);
            btn.classList.add("active");
        }


        fetchFavMeals();

    });

    meal.addEventListener('click', ()=>{
        showMealInfo(mealData);
    })

    meals.appendChild(meal);
}

function addMealLs( mealId){
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId){
    const mealIds = getMealsLS();
    
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)) )
}

function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals(){
    favContainer.innerHTML="";
    const mealIds = getMealsLS();

    for (let i =0; i<mealIds.length; i++){
        const mealId=mealIds[i];

        const meal = await getMealById(mealId)

        addMealFav(meal);
    }
}


function addMealFav(mealData){

    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
            <span>${mealData.strMeal}</span>
            <button class="removeFav"><i class="fas fa-window-close"></i></buuton>
    `;

    const btn= favMeal.querySelector('.removeFav');
    btn.addEventListener('click', ()=>{
        removeMealLS(mealData.idMeal);

        fetchFavMeals();
    })

    favMeal.addEventListener('click', ()=>{
        showMealInfo(mealData);
    })

    favContainer.appendChild(favMeal);
}

function showMealInfo(mealData){
    mealInfo.innerHTML='';

    const mealEL = document.createElement('div');
    
    const ingredients = [];

    for(let i=1; i<=20; i++){
        if(mealData['strIngredient'+i]){
            ingredients.push(`
                ${mealData['strIngredient' + i]} / ${mealData['strMeasure'+i]}
            `)
        }else{
            break;
        }
    }

    mealEL.innerHTML= `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        
        <p>
            ${mealData.strInstructions}
        </p>
        <h3>Ingridients</h3>
        <ul>
            ${ingredients.map(ing => `
              <li>${ing}</li>  
            `).join('')}
        </ul>
    `
    mealInfo.appendChild(mealEL);
    
    mealPopup.classList.remove("hidden")

}

searchBtn.addEventListener("click", async () =>{
    mealsEl.innerHTML = '';
    const search = searchTerm.value;

    
   const meals = await getMealBySearch(search)

    if(meals)
    {
        meals.forEach(meal => {
                addMeal(meal);
            });
    }
})

popupCloseBtn.addEventListener("click", ()=>{
    mealPopup.classList.add('hidden');
})

