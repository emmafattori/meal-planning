"use client";
import { RecipeCard } from "@/components/recipe-card/recipe-card";
import { addDoc, collection, db } from "../../lib/firebase-config";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import { getDocs, serverTimestamp } from "firebase/firestore";
import Modal from "@/components/modal/modal";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export interface Recipe {
  recipeId: string;
 recipeName: string;
 ingredients: string[];
 instructions: string[];   
}

export interface ApiResponse {
  hits: Recipe[]
}

export default function Recipes() {
const [recipes, setRecipes] = useState<Recipe[]>([])
const [openModal, setOpenModal] = useState<boolean>(false)

useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const fetchedRecipes: Recipe[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          recipeId: doc.id, // Firestore auto-generated ID (string)
          recipeName: data.title, // assuming the field in Firestore is "title"
          ingredients: data.ingredients || [],
          instructions: data.instructions || [],
        };
      });
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  fetchRecipes();
}, []);

  return (
    <section className="text-center relative my-6">
      <Button className="w-fit px-4 py-2 fixed bottom-0 right-0 m-10" onClick={() => setOpenModal(true)}>
          <CirclePlus />
          Add Recipe
        </Button>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Recipes</h1>
      <ul className="flex flex-wrap justify-around w-[90%] mx-auto">
      {recipes.map((recipe, idx) => {
          return (
            <li key={idx} className="p-3 text-center w-[calc((100%/2)-2rem)] md:w-[calc((100%/3)-2rem)] m-4">
             <Link href={`/recipes/${recipe.recipeId}`}>
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
