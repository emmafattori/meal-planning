'use client';

import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { Recipe } from '../page';

const RecipeDetailsPage = () => {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeId || typeof recipeId !== 'string') return;

    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, 'recipes', recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRecipe({
            recipeId: docSnap.id,
            recipeName: data.title,
            ingredients: data.ingredients || [],
            instructions: data.instructions || [],
          });
        } else {
          console.error('No such recipe!');
        }
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]); // Re-run if recipeId changes

  if (loading) return <p>Loading recipe...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.recipeName}</h1>
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-6 mb-4">
        {recipe.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <ol className="list-decimal pl-6">
        {recipe.instructions.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetailsPage;
