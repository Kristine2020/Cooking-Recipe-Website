console.log("This is a message");
var allRecipes = [];
var currentRecipe = null;
var forPeople;
var imageFolder = "images/";

document.addEventListener("DOMContentLoaded", function () {
    loadPageSection("RecipeTemplate.html", "#recipeDetail", function () {
        document.querySelector("#calculateButton").addEventListener("click", calculateIngredient);
        getRecipes();
    });
});


function loadPageSection(url, selector, callback) {
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (htmlText) {
            console.log(htmlText)
            document.querySelector(selector).innerHTML = htmlText;
            callback();
        })
}

function getRecipes() {
console.log("getRecipes function is called")
    // return response.json();
    fetch("data/recipes.json")
        .then(function(response) {
            console.log("We have read the file.")
            return response.json();
        })
        .then(function (data) {
            console.log("We have converted the data to JSON");
            playWithJson(data);
            fillSideNavMenu();
            fillRecipeDetail();
        });
}

function limitRecipeDescription(description) {
    var length = 45;
    if (description.length > length) {
        return description.substring(0, length) + "...";
    }
    return description;
}

function fillSideNavMenu() {
    var sideNavUl = document.querySelector("#recipesNav");
    var html = "";

    allRecipes.forEach(function (recipe) {
        html += `<li class="card recipe-nav-item" target="${recipe.id}" id="card-${recipe.id}">
                    <img src="images/${recipe.thumb_img}" alt="" class="card-thumb">
                    <div class="card-content">
                        <h2 class="card-title">${recipe.title}</h2>
                        <p class="card-description">${limitRecipeDescription(recipe.description)}</p>
                    </div>
                    <div class="card-footer">
                        <small>${recipe.for_people} people</small>
                    </div>
                </li>`;
    });
    sideNavUl.innerHTML = html;

    document.querySelectorAll(".recipe-nav-item").forEach(function (element) {
        element.addEventListener("click", function () {
            onRecipeClick(element);
        });
    });

}

function getRecipeFullImage(recipe) {
    if (recipe.full_img) {
        return imageFolder + recipe.full_img;
    }
    return imageFolder + recipe.thumb_img;
}

function fillRecipeDetail() {
    if (currentRecipe == null) {
        currentRecipe = allRecipes[0];
    }

    var activeRecipe = document.querySelector(".card-active");
    if (activeRecipe) {
        activeRecipe.classList.remove("card-active");
    }
    var newActiveRecipe = document.querySelector("#card-" + currentRecipe.id);
    newActiveRecipe.classList.add("card-active");

    document.querySelector("#recipeTitle").innerHTML = `${currentRecipe.title}`;
    document.querySelector("#recipeFullImage").setAttribute("src", getRecipeFullImage(currentRecipe));
    document.querySelector("#recipeDescriptionText").innerHTML = currentRecipe.description;
    document.querySelector("#recipeForPeople").innerHTML = getRecipePeople();
    document.querySelector("#recipeIngredientsList").innerHTML = listRecipeIngredients(currentRecipe);
    document.querySelector("#recipeInstructionsList").innerHTML = listRecipeInstructions(currentRecipe.instructions);
}

function playWithJson(data) {

    console.log("Now we can work with data.")
    allRecipes = data.recipes;

    var recipe = allRecipes[0];
    console.log("Title of a recipe: " + recipe.title);
    console.log("Description: " + recipe.description);
    console.log("Number of steps: " + recipe.instructions.length);
    console.log("Number of ingredients needed: " + recipe.ingredients.length);

    console.log(recipe.title + " has " + recipe.instructions.length + " steps and " + recipe.ingredients.length + " ingredients");

    console.log(`${recipe.title} has ${recipe.instructions.length} steps and ${recipe.ingredients.length} ingredients`);

    console.log(`Number of recipes: ${allRecipes.length}`);

    for (var rec in allRecipes) {
        console.log(allRecipes[rec].title);
    }

}

function onRecipeClick(recipeCard) {
    forPeople = 0;
    currentRecipe = allRecipes.find(function (rec) {
        return rec.id == recipeCard.getAttribute("target");
    });
    fillRecipeDetail();
}
function getIngredientItem(recipePeopleNumber, ingredient, targetPeople = 0) {
    if (targetPeople && targetPeople != 0) {
        var calculateQuantity =
            (ingredient.quantity * targetPeople) / recipePeopleNumber;
        return (calculateQuantity.toFixed(2) + " " + ingredient.unit + " " + ingredient.name);
    }
    return ingredient.quantity + " " + ingredient.unit + " " + ingredient.name;
}

function listRecipeIngredients(recipe) {
    var recipeIngredients = recipe.ingredients;
    var recipeForPeople = recipe.for_people;

    var html = "";
    recipeIngredients.forEach(function (ingredient) {
        html += `<li> ${getIngredientItem(recipeForPeople, ingredient, forPeople)}</li>`;
    });
    return html;
}

function sortInstructions(instructions) {
    instructions.sort(function (a, b) {
        var orderA = a.order;
        var orderB = b.order;

        if (orderA < orderB) {
            return -1;
        }
        if (orderA > orderB) {
            return 1;
        }
        return 0;
    });
}

function listRecipeInstructions(recipeInstructions) {
    var html = "";
    sortInstructions(recipeInstructions);
    recipeInstructions.forEach(function (instruction) {
        html += `<li> ${instruction.description}</li>`;
    });
    return html;
}

function calculateIngredient() {
    var forPeopleInput = document.querySelector("#forPeopleInput").value;

    if ((forPeopleInput == "") || isNaN(forPeopleInput) || forPeopleInput == 0) {
        // alert("Please enter a valid number.");
    }
    else {
        forPeople = forPeopleInput;
    }

    fillRecipeDetail();
}

function getRecipePeople() {
    if (forPeople && !isNaN(forPeople) && forPeople > 0) {
        return forPeople;
    }
    return currentRecipe.for_people;
}
