$(document).ready(function(){
  $('.questions').on('click', 'button', function(e) {
    e.preventDefault();
    evaluateResponseAndSetPreferences();
    serverDrink(theBarTender.createDrink(preference), $('.drink'));
  });
  renderQuestions(questions, $('.questions'));
});

// Let's setup some variables
var questions = []; // Questions to ask user in UI
var preference = []; // User preference info that from use answers to questions

var theBarTender = new Bartender();

var thePantry = new Pantry( // Container for ingredients, these are all array arguments
  // strong
  [
    new Ingredient("strong", "glug of rum"),
    new Ingredient("strong", "slug of whisky"),
    new Ingredient("strong", "splash of gin")
  ],
  // salty
  [
    new Ingredient("salty", "olive on a stick"),
    new Ingredient("salty", "salt-dusted rim"),
    new Ingredient("salty", "rasher of bacon")
  ],
  // bitter
  [
    new Ingredient("bitter","shake of bitters"),
    new Ingredient("bitter","splash of tonic"),
    new Ingredient("bitter", "twist of lemon peel")
  ],
  // sweet
  [
    new Ingredient("sweet", "sugar cube"),
    new Ingredient("sweet", "spoonful of honey"),
    new Ingredient("sweet", "splash of cola")
  ],
  // fruitty
  [
    new Ingredient("fruity", "slice of orange"),
    new Ingredient("fruity", "dash of classic"),
    new Ingredient("fruity", "cherry on top")
  ]
);

// Add some questions to the questions array
questions.push(new Question("strong", "Do ya like em strong?"));
questions.push(new Question("salty", "Do ya lik em salty like the sea?"));
questions.push(new Question("bitter", "Is it bitter yer after?"));
questions.push(new Question("sweet", "What about a little sweetness, las?"));
questions.push(new Question("fruity", "Oh, you like it fruity doncha?"));

// Render answers in .questions form
function renderQuestions(questions, parentEl){
var div = "";
  for (var i = 0; i < questions.length; i++) {
    var questionCount = i + 1;
    var childDiv ="";
    childDiv += "<div class='form-group'><div class='question'>" + questionCount + ".) " + questions[i].question + "</div>";
    childDiv +=  "<select data-drink-type='" + questions[i].type + "' class='form-control'><option value='yes'>Yes</option><option value='no'>No</option></select>";
    childDiv += "</div>" // close form-group div
    div += childDiv;
  }
  div += "<button type='submit' class='btn btn-primary'>Make me a drink, lad</button>";
  parentEl.html(div);
}

//
function evaluateResponseAndSetPreferences(){
  $('select').each(function() {
    var userPref = $(this).val().toLowerCase();
      if (userPref === "yes") preference.push($(this).data("drink-type"));
  });
}

function serverDrink(drink, parentEl) {
  parentEl.html("Here's your drink with a " + drink);

}

// Question constructor
function Question(type, question) {
  this.type = type;
  this.question = question;
}

// Pantry constructor that takes parameters that are arrays of ingredients
function Pantry(strongIng, saltyIng, bitterIng, sweetIng, fruityIng) {
  this.strong = strongIng;
  this.salty = saltyIng;
  this.bitter = bitterIng;
  this.sweet = sweetIng;
  this.fruity = fruityIng;
}

// Ingredient contructor
function Ingredient(type, ingredient) {
  this.ingredient = ingredient;
  this.type = type;
}

// Bartender constructor, now with all new functionality!
function Bartender(){
  this.createDrink = function(preference) {
    var drink = [];
    preference.forEach(function(value){
      var ingredients = thePantry[value];
      var randomNumber = Math.floor((Math.random() * (ingredients.length - 1)));
      drink.push(ingredients[randomNumber].ingredient);
    })
    return drink.join(" and ");
  };
}
