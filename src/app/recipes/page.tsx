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
      <h1 className="text-2xl">Recipes</h1>
      {/* TODO - add recipe details page, pass the route */}
<ul className="flex flex-wrap justify-around w-[90%] mx-auto">
      {recipes.map((recipe, idx) => {
          return (
            <li key={idx} className="p-3 text-center shadow-lg rounded-lg w-[calc((100%/2)-2rem)] md:w-[calc((100%/3)-2rem)] m-4">
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
