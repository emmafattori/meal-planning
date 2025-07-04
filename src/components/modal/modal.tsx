import { db } from "@/lib/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export interface ModalProps {
  onClose: () => void
}

export const Modal = ( {onClose}: ModalProps ) => {

    const [title, setTitle] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');


    const formSchema = z.object({
      recipeTitle: z.string(),
      recipeInstructions:z.string(),
      recipeIngredients:z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        recipeTitle: "",
        recipeInstructions: '',
        recipeIngredients: '',
      },
    })

   async function onSubmit(values: z.infer<typeof formSchema>) {
       
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
        onClose();
      } catch (error) {
        console.error('Error adding recipe: ', error);
        alert('Error adding recipe.');
      }
      console.log(values)
    }
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <Button variant="outline" size="icon" className="absolute right-0 top-0" onClick={onClose}>
          <X />
        </Button>
          <h2 className="text-2xl font-bold">Add A Recipe</h2>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="recipeTitle"
          render={({ field }) => (
            <>
              <FormDescription>
                Add a new recipe to your library
              </FormDescription>
              <FormItem>
              <FormLabel>Recipe Title</FormLabel>
              <FormControl>
                <Input placeholder="Baked salmon" {...field}               onChange={(e) => setTitle(e.target.value)} required value={title} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Recipe Ingredients</FormLabel>
              <FormControl>
                <Input placeholder="1 lb of salmon" {...field}               onChange={(e) => setIngredients(e.target.value)} required value={ingredients} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Recipe Instructions</FormLabel>
              <FormControl>
                <Input placeholder="Preheat oven to 350 degrees F" {...field} onChange={(e) => setInstructions(e.target.value)} required value={instructions} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
            </>
            
      
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </div>
      </div>
    );
}

export default Modal;

