"use client";
import { APPNAV_ITEMS } from "./APPBAR_ITEMS";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSidebar } from "../_contexts/sidebarContext";
import Image
 from "next/image";
const Appbar = () => {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const toggleSubMenu = (initial: boolean) => {
        setOpenMenu(!initial);
    }

    const {isCollapsed, setIsCollapsed} = useSidebar();

    const toggleAppbarCollapseHandler = () => {
        setIsCollapsed(!isCollapsed);
    }

    useEffect(() => {
        if (isCollapsed) {
            setOpenMenu(false);  // Close the submenu when the sidebar is collapsed
        }
    }, [isCollapsed]);
    
    const sidebarBaseClass = "fixed text-black bg-customSkyBlue h-full shadow-lg shadow-gray-900/200 transition ease-in-out duration-500 transition-all"
    const sidebarClasses = isCollapsed 
        ? `${sidebarBaseClass} w-[5rem]`  // width when collapsed
        : `${sidebarBaseClass} w-[16rem]`; // normal width
        
    const buttonBaseClass = "fixed z-50 top-[4rem] w-[1.5rem] h-[1.5rem] border border-gray-300 flex justify-center items-center cursor-pointer translate-x-2/4 bg-white rounded-full duration-500 transition-all"
    const buttonClasses = isCollapsed
        ? `${buttonBaseClass} left-[3.5rem]`
        : `${buttonBaseClass} left-[14.5rem]`
    
    return(
        <div>
            <button className= {buttonClasses}
                onClick={toggleAppbarCollapseHandler}>
                    
                {isCollapsed ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
            </button>
            <aside className={sidebarClasses}>
                <div className="flex items-center justify-center py-5 px-3.5 mt-4">
                    <Image src="/images/VetIQ_Logo.png" alt="Logo" width={110} height={145} />
                </div>
                <nav className="flex flex-col gap-2 transition duration-300 ml-4 mt-10 mr-4">
                    {
                        APPNAV_ITEMS.map((item) => {
                            const isActive = pathname === item.path;
                            const itemClass = isActive
                            ? "flex items-center gap-4 p-4 bg-customBlack text-white rounded-xl transition duration-200 ease-in-out cursor-pointer"
                            : "flex items-center gap-4 p-4 text-black rounded-xl transition duration-200 ease-in-out cursor-pointer"
                            return item.submenu ? (
                                <div key={item.title} >
                                    <span onClick={() => toggleSubMenu(openMenu)} className={itemClass}>
                                        {item.icon && React.cloneElement(item.icon, { className: "text-2xl" })}
                                        {!isCollapsed && <span>{item.title}</span>}
                                        {
                                            !isCollapsed && (openMenu ? <IoIosArrowDown /> : <IoIosArrowForward />)
                                        }
                                    </span>
                                    {openMenu && (
                                        <div className="ml-14">
                                                                                                                                
                                            {item.subMenuItems?.map(subitem => (
                                                
                                                <Link href={subitem.path} key={subitem.title}>
                                                    <span className={pathname === subitem.path
                                                    ? "flex items-center gap-4 p-2 mb-2 pl-4 bg-customBlack text-white rounded-xl transition duration-200 ease-in-out"
                                                    : "flex items-center gap-4 p-2 mb-2 pl-4 text-black rounded-xl transition duration-200 ease-in-out"
                                                    }>
                                                        {!isCollapsed && <span>{subitem.title}</span>}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>                                        
                                    )}                                
                                </div>
                            ) : (
                                <Link href={item.path} key={item.title}>
                                        <span className={itemClass}>
                                            {item.icon && React.cloneElement(item.icon, { className: "text-2xl" })}
                                            {!isCollapsed && <span>{item.title}</span>}
                                        </span>
                                </Link>
                            )
                                                
                        })
                    }

                </nav>
            </aside>

        </div>
        
    );
}

export default Appbar; 