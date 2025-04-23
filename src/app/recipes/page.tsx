"use client";
import { RecipeCard } from "@/components/recipe-card/recipe-card";
import { addDoc, collection, db } from "../../lib/firebase-config";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import Modal from "@/components/modal/modal";

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
const [openModal, setOpenModal] = useState<boolean>(false)

  getRecipes().then((fetchedRecipes) => {
    setRecipes(fetchedRecipes.recipes)
  }) .catch((err) => {
    console.log(err)
  })

  return (
    <section className="text-center relative">
      <button className="bg-black rounded-full text-white p-2 absolute top-5 right-5" onClick={() => setOpenModal(true)}>Add Recipe</button>
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
      {openModal && (
        <Modal onClose={() => setOpenModal(false)} />
      )}

    </section>
  )
}
