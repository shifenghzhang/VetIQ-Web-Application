import {BsHouseDoor} from "react-icons/bs"
import { BsQuestionCircle } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

type AppNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: AppNavItem[];
};

export const APPNAV_ITEMS: AppNavItem[]=[
    {
        title: "Home",
        path: "/",
        icon: <BsHouseDoor size={20} />
    },
    {
        title: "Analytics",
        path: "/analytics",
        icon: <TbDeviceDesktopAnalytics size={20} />,
        submenu: true,
        subMenuItems: [{title: "Client", path: "/analytics/client"}, {title: "Patient", path: "/analytics/patient"}, {title: "Report", path: "/analytics/report"}]
    },
    {
        title: "Help",
        path: "/help",
        icon: <BsQuestionCircle size={20} />,
        submenu: true,
        subMenuItems: [{title: "Contact Us", path: "/help/Contact US"}, {title: "FAQs", path: "/help/FAQs"}, {title: "Resource Library", path: "/help/Resource Library"}]
    },
    {
        title: "Feedback",
        path: "/feedback",
        icon: <BsEnvelope size={20} />
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <IoSettingsOutline size={20} />
    }
    
]
    
