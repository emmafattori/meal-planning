import { db } from "@/lib/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export const Modal = () => {

    const [title, setTitle] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');



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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Add A Recipe</h2>
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
        </div>
        </div>
    );
}

export default Modal;

