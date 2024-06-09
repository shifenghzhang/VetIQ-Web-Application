"use client"
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { useSidebar } from "../_contexts/sidebarContext";
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
    
    const {isCollapsed} = useSidebar();

    const headerClass = isCollapsed
        ? "fixed top-0 right-0 z-[99997] w-[calc(100%-5rem)] h-16 flex items-center justify-between transition-all duration-500 bg-white"
        : "fixed top-0 right-0 z-[99997] w-[calc(100%-16rem)] h-16 flex items-center justify-between transition-all duration-500 bg-white"
    return(
        <header className={headerClass}>
            <h1 className="ml-10 text-lg">{getTitle()}</h1> 
            <CgProfile className="text-4xl mr-10" />  
        </header>
    )
}

export default Header;