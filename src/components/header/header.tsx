import Image from 'next/image';


export const Header = () => {
    return (
        <header className="h-screen" >
            <nav className="flex">
                <div>
                    <Image src={'https://placehold.co/300x200'} alt={''} />
                </div>
                <ul>
                    <li><a href="">Lorem</a></li>
                    <li><a href="">Recipes</a></li>
                    <li><a href="">Community</a></li>
                    <li><a href="">Resources</a></li>
                    <li><a href="">Contact</a></li>

                </ul>
            </nav>
        </header>
    )
}