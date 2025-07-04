import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Navigation } from "../navigation/navigation"


export const Header = () => {
    return (
        <header className="h-screen flex justify-center items-center">
            <Navigation />
            <section className="flex justify-center align-middle">
                <div className="flex flex-col text-center">

                <h1 className="scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance mb-4">What&apos;s For Dinner</h1>
                <h3 className="text-2xl text-gray-500">Meal Planning for Dummies</h3>
                <div className="flex mx-auto my-5">
                    <Button asChild className="mx-2">
                        <Link href="/recipes">Recipes</Link>
                    </Button>
                    <Button asChild className="mx-2">
                        <Link href="/recipes">Make a plan</Link>
                    </Button>
                    {/* <a href="/recipes" className="x-2 my-6">Recipes</a>
                    <a href="/plan" className="mx-2 my-6">Get a Plan</a> */}
                </div>
                </div>
            </section>
        </header>
    )
}