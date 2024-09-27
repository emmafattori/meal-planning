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
      {/* TODO - add recipe details page, pass the route */}
<ul>
      {recipes.map((recipe, idx) => {
          return (
            <li key={idx}>
              <h3>Name: {recipe.recipeName}</h3>
              <ul>
              {recipe.ingredients.map((ing, idx) => {
                return (
                  <li key={`ing-${idx}`}>{ing}</li>
                )
              })}
              </ul>
              <p>Instructions: {recipe.instructions}</p>
            </li>
          )
      })}
      </ul>
    </section>
  )
}
