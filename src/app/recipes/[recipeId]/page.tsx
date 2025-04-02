import fs from 'fs';
import path from 'path';

interface Recipe {
  recipeId: number;
  recipeName: string;
  ingredients: string[];
  instructions: string[];
}

async function fetchRecipeData(): Promise<{ recipes: Recipe[] }> {
  // Using path.resolve to get the path to the JSON file in the public folder, since we're using a server-side function
  const filePath = path.resolve('public', 'recipes.json');
  const fileContents = await fs.promises.readFile(filePath, 'utf-8');

  return JSON.parse(fileContents);
}

export default async function RecipeDetails({
  params,
}: {
  params: { recipeId: string };
}) {
  const { recipeId } = params;

  const { recipes } = await fetchRecipeData();

  // Find the recipe with the matching recipeId
  const recipe = recipes.find((r) => r.recipeId === parseInt(recipeId));

  if (!recipe) {
    return <div>Sorry, we couldn't find the recipe.</div>;
  }

  return (
    <div className="m-10 grid gap-3">
      <h1 className="border-b-yellow-400 border-b-2 text-2xl w-fit mx-auto text-center">{recipe.recipeName}</h1>

      <h2 className="border-b-yellow-400 border-b-2 text-lg w-fit mx-auto">Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}
