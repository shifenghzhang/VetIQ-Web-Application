export type AppNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: AppNavItem[];
};

export interface Article {
    id: number;
    title: string;
    summary: string;
}
