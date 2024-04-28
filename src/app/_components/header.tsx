"use client"
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
const Header = () => {
    const pathname = usePathname();
    const getTitle = () => {
        if (pathname === "/") {
            return "Home";
        }
        else {
            const word = pathname.substring(pathname.lastIndexOf("/") + 1);
            return word.charAt(0).toUpperCase() + word.slice(1);
        }

    }
    return(
        <header className="fixed top-0 right-0 z-[99997] w-[calc(100%-16rem)] h-16 flex items-center justify-between">
            <h1 className="ml-10 text-lg">{getTitle()}</h1> 
            <CgProfile className="text-4xl mr-10" />  
        </header>
    )
}

export default Header;