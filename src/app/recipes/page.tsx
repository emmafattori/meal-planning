"use client";
import { RecipeCard } from "@/components/recipe-card/recipe-card";
import { addDoc, collection, db } from "../../lib/firebase-config";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { serverTimestamp } from "firebase/firestore";

export interface Recipe {
  recipeId: number;
 recipeName: string;
 ingredients: string[];
 instructions: string[];   
}

export interface ApiResponse {
  hits: Recipe[]
}

export const getRecipes = async () => {
  const response = await fetch('/recipes.json')
  if (!response.ok) {
    throw new Error("Failed to fetch")
  }
  const recipeData = await response.json()
  return recipeData
}


export default function Recipes() {
const [recipes, setRecipes] = useState<Recipe[]>([])
  const [title, setTitle] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');


  getRecipes().then((fetchedRecipes) => {
    setRecipes(fetchedRecipes.recipes)
  }) .catch((err) => {
    console.log(err)
  })

  console.log(recipes)


const handleRecipeClick = (recipe: any) => {
  // Pass the recipe data in the router state
  router.push({
    pathname: `/recipes/${recipe.id}`,
    query: { recipeId: recipe.id },
  }, undefined, { shallow: true });
};


const handleAddRecipe = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, 'recipes'), {
      title,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      instructions: instructions.split('.').map(instruction => instruction.trim()),
      createdAt: serverTimestamp(),
    });
    alert('Recipe added successfully!');
    setTitle('');
    setIngredients('');
    setInstructions('');
  } catch (error) {
    console.error('Error adding recipe: ', error);
    alert('Error adding recipe.');
  }
};

  return (
    <section className="text-center">
      <h1 className="text-2xl">Recipes</h1>
      {/* TODO - add recipe details page, pass the route */}
<ul className="flex flex-wrap justify-around w-[90%] mx-auto">
      {recipes.map((recipe, idx) => {
          return (
            <li key={idx} className="p-3 text-center w-[calc((100%/2)-2rem)] md:w-[calc((100%/3)-2rem)] m-4">
              <Link   href={{
                pathname: `/recipes/${recipe.recipeId}`,
                query: { ...recipe }
              }}>
              <RecipeCard recipeName={recipe.recipeName} />
              </Link>
            </li>
          )
      })}
      </ul>
      <form onSubmit={handleAddRecipe}>
      <div>
        <label htmlFor="title">Recipe Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        ></textarea>
      </div>
        <button type="submit">Add Recipe</button>

      </form>
    </section>
  )
}
