
export interface Recipe{
    recipeName: string;
}



export const RecipeCard = (recipe:Recipe) => {
return (
    <div className="">
        <h2 className="">{recipe.recipeName}</h2>
    </div>
)
}