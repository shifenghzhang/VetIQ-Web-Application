"use client";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { useSidebar } from "../_contexts/sidebarContext";
import LoginCard from '../login/page';
import { useLoginCard } from "../_contexts/logincardContext";
import { useAuth } from "../_contexts/authProvider";

const Header = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const { showLoginCard, setShowLoginCard } = useLoginCard();
  const { user, logout } = useAuth(); // Get user and logout from useAuth

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
    ? "fixed top-0 right-0 z-[99997] w-[calc(100%-5rem)] h-16 flex items-center justify-between transition-all duration-500 bg-white"
    : "fixed top-0 right-0 z-[99997] w-[calc(100%-16rem)] h-16 flex items-center justify-between transition-all duration-500 bg-white";

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLoginClick = () => {
    setShowLoginCard(true);
  };

  return (
    <header className={headerClass}>
      <h1 className="ml-10 text-lg">{getTitle()}</h1>
      <div className="relative">
        <CgProfile className="text-4xl mr-10 cursor-pointer" onClick={handleLoginClick} />
        {user && (
          <div className="absolute top-full flex-col">
            <span className="text-sm cursor-pointer" onClick={logout}>Logout</span>
          </div>
        )}
      </div>
      {showLoginCard && <LoginCard />}
    </header>
  );
};

export default Header;

