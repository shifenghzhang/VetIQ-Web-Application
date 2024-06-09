"use client";
import { ReactNode } from "react";
import { useSidebar } from "../_contexts/sidebarContext";

const PageWrapper = ({children}: {children: ReactNode}) => {
    const { isCollapsed } = useSidebar();
    const pageWrapperClass = isCollapsed
    ? "flex-grow text-black p-2 mt-16 pl-[7.6rem] pr-[2.5rem] transition-all duration-500" 
    : "flex-grow text-black p-2 mt-16 pl-[18.6rem] pr-[2.5rem] transition-all duration-500"
    return(
        <div className={pageWrapperClass}
        style={{
            opacity: 1,
            backgroundImage:  'radial-gradient(rgba(0,146,226,1) 0.5px, transparent 0.5px), radial-gradient(rgba(0,146,226,1) 0.5px, #ffffff 0.5px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0,10px 10px'
          }}>
            {children}
        </div>
    )
}

export default PageWrapper;