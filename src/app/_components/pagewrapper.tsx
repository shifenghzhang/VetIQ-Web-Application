"use client";
import { ReactNode } from "react";
import { useSidebar } from "../_contexts/sidebarContext";

const PageWrapper = ({children}: {children: ReactNode}) => {
    const { isCollapsed } = useSidebar();
    const pageWrapperClass = isCollapsed
    ? "flex-grow text-black p-2 mt-16 pl-[5.6rem] transition-all duration-500" 
    : "flex-grow text-black p-2 mt-16 pl-[16.6rem] transition-all duration-500"
    return(
        <div className={pageWrapperClass}>
            {children}
        </div>
    )
}

export default PageWrapper;