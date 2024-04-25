"use client";
import { APPNAV_ITEMS } from "./APPBAR_ITEMS";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";


const Appbar = () => {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const toggleSubMenu = (initial: boolean) => {
        setOpenMenu(!initial);
    }
    
    return(
        <aside className="fixed text-black z-50 h-full shadow-lg shadow-gray-900/200 transition duration-300 ease-in-out w-[16rem]">
            <div className="flex items-center justify-center py-5 px-3.5">
                <h3 className="text-2xl">Vet IQ</h3>
            </div>
            <nav className="flex flex-col gap-2 transition duration-300 ml-4 mt-10 mr-4">
                {
                    APPNAV_ITEMS.map((item) => {
                        const isActive = pathname === item.path;
                        const itemClass = isActive
                        ? "flex items-center gap-4 p-4 bg-[rgb(187,221,225)] rounded-md transition duration-200 ease-in-out cursor-pointer"
                        : "flex items-center gap-4 p-4  rounded-md transition duration-200 ease-in-out cursor-pointer"
                        return item.submenu ? (
                            <div key={item.title}>
                                <span onClick={() => toggleSubMenu(openMenu)} className={itemClass}>
                                    {item.icon}
                                    {item.title}
                                    {openMenu ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                </span>
                                {openMenu && (
                                    <div className="ml-14">
                                        
                                        
                                    
                                        {item.subMenuItems?.map(subitem => (
                                            
                                            <Link href={subitem.path} key={subitem.title}>
                                                <span className={pathname === subitem.path
                                                ? "flex items-center gap-4 p-2 mb-2 bg-[rgb(187,221,225)] rounded-md transition duration-200 ease-in-out"
                                                : "flex items-center gap-4 p-2 mb-2  rounded-md transition duration-200 ease-in-out"
                                                }>
                                                    {subitem.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>                                        
                                )}                                
                            </div>
                        ) : (
                            <Link href={item.path} key={item.title}>
                                    <span className={itemClass}>
                                        {item.icon}
                                        {item.title}
                                    </span>
                            </Link>
                        )
                                            
                    })
                }

            </nav>
        </aside>
    );
}

export default Appbar; 