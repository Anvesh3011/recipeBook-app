const API_KEY = "b8a37f0911204b14aa411fc423903fbd";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  console.log(recipes);
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeEl = document.createElement("li");
    recipeEl.classList.add("recipe-item");
    recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image";
    recipeEl.appendChild(recipeImageEl); //added image to the list  item
    const recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;
    recipeEl.appendChild(recipeTitleEl); //added title to the list item

    const recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = ` <strong>Ingredients:</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}`;

    recipeEl.appendChild(recipeIngredientsEl); //added ingredients to the list item
    const recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";
    recipeEl.appendChild(recipeLinkEl); //added link to the list item
    recipeListEl.appendChild(recipeEl);
  });
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.recipes;
}
async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();
