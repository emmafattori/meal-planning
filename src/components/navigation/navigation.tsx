import Image from 'next/image';

export const Navigation = () => {
    console.log('Navigation rendered');

    return (
        <nav className="flex justify-between">
        <div>
            <Image src={'https://placehold.co/300x200'} alt={''} width={300} height={200} />
        </div>
        <ul className="flex">
            <li><a href="">Lorem</a></li>
            <li><a href="">Recipes</a></li>
            <li><a href="">Community</a></li>
            <li><a href="">Resources</a></li>
            <li><a href="">Contact</a></li>

        </ul>
    </nav>
    )
}