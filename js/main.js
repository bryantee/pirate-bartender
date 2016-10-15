import $ from 'jquery';
window.jQuery = $;
require('bootstrap');
import {Question, Pantry, Ingredient, Bartender} from './modules';


$(document).ready(function(){
  $('.questions').on('click', 'button', function(e) {
    e.preventDefault();
    evaluateResponseAndSetPreferences();
    serverDrink(theBarTender.createDrink(preference), nameDrink(adjectives, nouns), $('.drink'));
  });
  renderQuestions(questions, $('.questions'));
});

// Let's setup some variables
var questions = []; // Questions to ask user in UI
var preference = []; // User preference info that comes from user answers to questions
// some nouns and adjectives used to name drinks:
var adjectives = [
  "Curvy",
  "Chubby",
  "Slippery",
  "Shallow",
  "Crusty"
]
var nouns = [
  "Bowling-pin",
  "Cave Monster",
  "Barnacle",
  "Scab"
]

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

var theBarTender = new Bartender(thePantry); // Instantiate the bartender

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

// Used to get the response data and push user pref to preference array as needed
function evaluateResponseAndSetPreferences(){
  $('select').each(function() {
    var userPref = $(this).val().toLowerCase();
      if (userPref === "yes") preference.push($(this).data("drink-type"));
  });
}

// Helper function to be used by bartender to serve up the dirnk
// (write to html div)
function serverDrink(ingredientList, drink, parentEl) {
  var div = '';
  div += "<h3>Here's your drink with </h3>" + "<p>" + ingredientList + "</p>";
  div += "<p>We call it the <span class='drink-name'>" + drink + ".</span></p>";
  parentEl.html(div);
}

// Names drink, takes two arguments that are arrays and returns a string for drink name
function nameDrink(adjectives, nouns) {
  var randomAdjective = adjectives[Math.floor((Math.random() * (adjectives.length - 1)))];
  var randomNoun = nouns[Math.floor((Math.random() * (adjectives.length - 1)))];
  return randomAdjective + " " + randomNoun;
}
