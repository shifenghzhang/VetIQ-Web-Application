export type AppNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: AppNavItem[];
};

export type Article = {
    id: number;
    title: string;
    summary: string | string[];
};

