import Image from 'next/image';

export const Navigation = () => {
    console.log('Navigation rendered');

    return (
        <nav className="flex items-center justify-between w-full h-16 bg-yellow-400 px-4">
        <div className="relative w-[8%] h-full">
        </div>
        <ul className="flex">
            <li><a href="/">Home</a></li>
            <li><a href="/recipes">Recipes</a></li>
            <li><a href="">Community</a></li>
            <li><a href="">Resources</a></li>
            <li><a href="">Contact</a></li>

        </ul>
    </nav>
    )
}