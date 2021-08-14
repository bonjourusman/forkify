import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id.slice(1)}`
    ); // returns a promise
    const data = await res.json(); // returns a promise
    // console.log(res, data);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { recipe } = data.data;

    state.recipe = {
      // Rename Properties to get rid of underscores and add them to the state object
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    console.err(err);
  }
};
