"use client"
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { useSidebar } from "../_contexts/sidebarContext";
import LoginCard from '../login/page';

const Header = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const getTitle = () => {
    if (pathname === "/") {
      return "Home";
    } else {
      const word = pathname.substring(pathname.lastIndexOf("/") + 1);
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  };

  const { isCollapsed } = useSidebar();

  const headerClass = isCollapsed
    ? "fixed top-0 right-0 z-[99997] w-[calc(100%-5rem)] h-16 flex items-center justify-between transition-all duration-500"
    : "fixed top-0 right-0 z-[99997] w-[calc(100%-16rem)] h-16 flex items-center justify-between transition-all duration-500";

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLoginClick = () => {
    setShowLoginCard(true);
    setShowMenu(false);
  };

  const handleLoginClose = () => {
    setShowLoginCard(false);
  };

  return (
    <header className={headerClass}>
      <h1 className="ml-10 text-lg">{getTitle()}</h1>
      <div className="relative">
        <CgProfile className="text-4xl mr-10 cursor-pointer" onClick={toggleMenu} />
        {showMenu && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a
              href="#"
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
              onClick={handleLoginClick}
            >
              Login
            </a>
          </div>
        )}
      </div>
      {showLoginCard && <LoginCard onClose={handleLoginClose} />}
    </header>
  );
};

export default Header;