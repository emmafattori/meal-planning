import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Recipe } from "../page";

export const RecipeDetails = () => {

   const router = useRouter();
  const { recipeId } = router.query;
  const [recipe, setRecipe] = useState(router.query || null);


  useEffect(() => {
    if (!recipe && recipeId) {
      // Fallback: If recipe data isn't available from the router, fetch it again (optional)
      const fetchRecipe = async () => {
        try {
          const res = await fetch(`/api/recipes/${recipeId}`);
          const data = await res.json();
          setRecipe(data);
        } catch (err) {
          console.error('Error fetching recipe:', err);
        }
      };
      fetchRecipe();
    }
  }, [recipeId, recipe]);

  if (!recipe) {
    return <p>Loading...</p>;
  }
    return (
        <div>This is the recipe details page

            <h3>{recipe.recipeName}</h3>
        </div>
    )
}