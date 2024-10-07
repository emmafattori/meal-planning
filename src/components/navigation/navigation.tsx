import Image from 'next/image';

export const Navigation = () => {
    console.log('Navigation rendered');

    return (
        <nav className="flex items-center justify-between w-full h-16 bg-[#D3FFE9] px-4">
        <div className="relative w-[8%] h-full">
            
              <Image
     src={'/fork-and-knife.png'}
      alt="Logo"
      layout="fill"
    //   width={500}
    //   height={500}
    //   objectFit='contain'
      className="w-full"  // Ensure the image scales within its container
    />
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