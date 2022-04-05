const keyIngredient = "ingredientList";
const keyRecipe = "recipeList";
const formRecipe = document.getElementById("form-recipe");
var buttonaddIngredient = document.getElementById("newIng")
var ingredientList = document.getElementById("ingredient-temp-list");
var nameIngredient = document.getElementById("ingredient-name");
var recipeList = document.getElementById("view");
document.addEventListener("DOMContentLoaded", function(){
    //Agregar evento al formulario
    formRecipe.addEventListener("submit",submitRecipe);
    buttonaddIngredient.addEventListener("click",submitIngredient);
    paintIngredient();
    var html = '';
    html += `<h1 class="[ color-primary ] [ text-center ]">Listado de recetas</h1>`;
    recipeList.innerHTML = html;
});

function submitIngredient(e){
    e.preventDefault();
    e.stopPropagation();

    let ingredient = {
        id: Date.now(),
        text: nameIngredient.value
    };

    let list = getIngredients();

    list.push(ingredient);

    // console.log(tweet);

    // let list = [ tweet ];

    localStorage.setItem(keyIngredient,JSON.stringify(list));
    paintIngredient();
    // console.log("Enviando formulario");
}

function paintIngredient(){
    let list = getIngredients();
    console.log(list);
    let html = '';

    for(var i = 0; i < list.length; i++){
        html += `<li class="[ bg-white color-gray ]" id="${list[i].id}">
         ${list[i].text} <button class="close" type="button" >X</button>
        </li>`;
    }

    ingredientList.innerHTML = html;
}

function getIngredients(){
    let list = JSON.parse(localStorage.getItem(keyIngredient));

    if(list === null){
        return [];
    }
    else{
        return list;
    }
}

function submitRecipe(e){
    e.preventDefault();
    e.stopPropagation();

    let recipe = {
        id: Date.now(),
        title: formRecipe["title"].value,
        url: formRecipe["img_url"].value,
        description: formRecipe["description"].value,
        ingredients: getIngredients()
    };

    let list = getRecipes();

    list.push(recipe);

    // console.log(tweet);

    // let list = [ tweet ];

    localStorage.setItem(keyRecipe,JSON.stringify(list));
    paintRecipe();
    // console.log("Enviando formulario");
}

function getRecipes(){
    let list = JSON.parse(localStorage.getItem(keyRecipe));

    if(list === null){
        return [];
    }
    else{
        return list;
    }
}

function paintRecipe(){
    let list = getRecipes();
    console.log(list);
    let html = '';

    for(var i = 0; i < list.length; i++){
        html += `<div class="[ row ] [ flex ]" data-state="wrap">
            <div class="[ col ]">
                <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${list[i].id}">
                    <img src="${list[i].url}" alt="">
                    <div class="[ flow ]">
                        <h5>${list[i].title}</h5>
                        <div class="[ flex ]" data-state="justify-between">
                            <button class="[ btn ]" data-state="white" onclick="getRecipe(${list[i].id})">Ver</button>
                            <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${list[i].id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    recipeList.innerHTML = html;
}

function getRecipe(id){
    // console.log(id);
    // let list = getRecipes();
    var recipeslist = [];
    recipesList = getRecipes();
    let html = '';
    
    for(var i = 0; i < recipesList.length; i++){
        console.log("Encontre el id");
        if(id === recipesList[i].id){
            var recipe = {
                id: recipesList[i].id,
                title: recipesList[i].title,
                url: recipesList[i].url,
                description: recipesList[i].description,
                ingredients: recipesList[i].ingredients
            };
            console.log(recipe);
        }
    }

    // console.log("Hola");
    html += `<h1 class="[ color-primary ] [ text-center ]">Receta</h1>

        <div class="[ recipe ] [ flex ] [ shadow ]">
            <div class="recipe-img">
                <img src="${recipe.url}" alt="">
            </div>
            <div class="[ recipe-info ] [ flow ]">
                <h2>${recipe.title}</h2>
                <div class="[ text-justify ]">${recipe.description}</div>
                <h5>Ingredientes</h5>
                <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
                    <li>Ingrediente 1</li>
                </ul>
            </div>
        </div>

        <div class="text-right">
            <button class="[ btn ]" data-state="primary" onclick="paintRecipe()">Volver al listado</button>
        </div>`;
        // console.log("Hola");

    recipeList.innerHTML = html;
}

function deleteRecipe(id){

}