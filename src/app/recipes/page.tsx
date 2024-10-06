"use client";
import { RecipeCard } from "@/components/recipe-card/recipe-card";
import { useState } from "react";
export interface Recipe {
 recipeName: string;
 ingredients: string[];
 instructions: string[];   
}

export interface ApiResponse {
  hits: Recipe[]
}

export const getRecipes = async () => {
  const response = await fetch('/data/recipes.json')
  if (!response.ok) {
    throw new Error("Failed to fetch")
  }
  const recipeData = await response.json()
  return recipeData
}


export default function Recipes() {
const [recipes, setRecipes] = useState<Recipe[]>([])



  getRecipes().then((fetchedRecipes) => {
    setRecipes(fetchedRecipes.recipes)
  }) .catch((err) => {
    console.log(err)
  })

  console.log(recipes)

  return (
    <section className="text-center">
      <h1>Recipes</h1>
      {/* TODO - add recipe details page, pass the route */}
<ul className="w-full flex flex-wrap justify-around">
      {recipes.map((recipe, idx) => {
          return (
            <li key={idx} className="p-3 text-center shadow-lg m-3 rounded-lg">
              <a>
              <RecipeCard recipeName={recipe.recipeName} />
              </a>
            </li>
          )
      })}
      </ul>
    </section>
  )
}
