import Image from 'next/image';

export const Navigation = () => {
    console.log('Navigation rendered');

    return (
        <nav className="flex items-center justify-center w-full h-16 bg-yellow-400 px-4">
        <ul className="flex w-[30%] justify-center">
            <li className="text-black mx-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 after:ease-out relative inline-block hover:after:w-full"><a href="/">Home</a></li>
            <li className="text-black mx-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 after:ease-out relative inline-block hover:after:w-full"><a href="/recipes">Recipes</a></li>
            <li className="text-black mx-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 after:ease-out relative inline-block hover:after:w-full"><a href="">Contact</a></li>

        </ul>
    </nav>
    )
}