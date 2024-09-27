export const Header = () => {
    return (
        <header className="h-screen" >
            <section className="flex justify-center align-middle">
                <div className="flex flex-col text-center">

                <h1 className="text-6xl mb-4">What&apos;s For Dinner</h1>
                <h3 className="text-2xl text-gray-500">Meal Planning for Dummies</h3>
                <div className="flex mx-auto">
                    <a href="/recipes" className="x-2 my-6">Recipes</a>
                    <a href="/plan" className="mx-2 my-6">Get a Plan</a>
                </div>
                </div>
            </section>
        </header>
    )
}