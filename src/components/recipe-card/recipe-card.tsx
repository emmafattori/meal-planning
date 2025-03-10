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
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
    </div>
)
}