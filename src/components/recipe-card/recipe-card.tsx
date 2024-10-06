
export interface Recipe{
    recipeName: string;
}



export const RecipeCard = (recipe:Recipe) => {
return (
    <div className="">
        <h2 className="text-purple-700">{recipe.recipeName}</h2>
    </div>
)
}