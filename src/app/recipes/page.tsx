"use client";
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
  console.log(recipeData)
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
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      This is the recipes pages
<ul>
      {recipes.map((recipe, idx) => {
          return (
            <li key={idx}>
              <h3>{recipe.recipeName}</h3>
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
            </li>
          )
      })}
      </ul>
    </section>
  )
}
