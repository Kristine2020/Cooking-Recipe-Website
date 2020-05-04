var newPeople = 4;

var recipeForPeople = 2;

var quantity1 = 1;
var unit1 = "cup(s)";
var name1 = "rolled oats";

var quantity2 = 2;
var unit2 = "cup(s)";
var name2 = "unsweetened almond milk";

var quantity3 = 1;
var unit3 = "";
var name3 = "medium banana(s), mashed";

var quantity4 = 2;
var unit4 = "teaspoon(s)";
var name4 = "vanilla extract";

var quantity5 = 2;
var unit5 = "teaspoon(s)";
var name5 = "cinnamon";


function start() 
{
 calculateQuantity();
 console.log("The recipe for " + newPeople + " is: \n" + quantity1 + " " + unit1 + " of " + name1);
 console.log(quantity2 + " " + unit2 + " of " + name2);
 console.log(quantity3 + " " + name3);
 console.log(quantity4 + " " + unit4 + " of " + name4);
 console.log(quantity5 + " " + unit5 + " of " + name5);
}

function calculateQuantity() 
{
 quantity1 = (quantity1 * newPeople) / recipeForPeople;
 quantity2 = (quantity2 * newPeople) / recipeForPeople;
 quantity3 = (quantity3 * newPeople) / recipeForPeople;
 quantity4 = (quantity4 * newPeople) / recipeForPeople;
 quantity5 = (quantity5 * newPeople) / recipeForPeople;
}

start();
