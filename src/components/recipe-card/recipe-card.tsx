'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
export interface Recipe{
    recipeName: string;
}



export const RecipeCard = (recipe:Recipe) => {
return (
    <div className="">
          <Card>
          <CardHeader>
          <CardTitle>{recipe.recipeName}</CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
    </div>
)
}