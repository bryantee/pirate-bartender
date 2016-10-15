// Question constructor
export class Question {
  constructor(type, question) {
    this.type = type;
    this.question = question;
  }
}

// Pantry constructor that takes parameters that are arrays of ingredients
export class Pantry {
  constructor(strongIng, saltyIng, bitterIng, sweetIng, fruityIng) {
    this.strong = strongIng;
    this.salty = saltyIng;
    this.bitter = bitterIng;
    this.sweet = sweetIng;
    this.fruity = fruityIng;
  }
}

// Ingredient contructor
export class Ingredient {
  constructor (type, ingredient) {
    this.ingredient = ingredient;
    this.type = type;
  }
}

// Bartender constructor, now with all new functionality!
export class Bartender{
  constructor(pantry) {
    this.pantry = pantry
  }
  createDrink(preference) {
    let drink = [];
    let bartenderClass = this;
    preference.forEach( value => {
      let ingredients = bartenderClass.pantry[value];
      let randomNumber = Math.floor((Math.random() * (ingredients.length - 1)));
      drink.push(ingredients[randomNumber].ingredient);
    })
    if (drink.length <= 2) {
      return `a ${drink.join(" and a ")}`;
    } else {
      return `a ${drink.splice(0, drink.length - 1).join(", a ")} and a  ${drink[drink.length - 1]}`; // TODO: add some logic to prevent "and and and and"
    }
  };
}
