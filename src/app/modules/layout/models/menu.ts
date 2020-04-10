import { MenuLink } from "./menuLink";

export class Menu {
    menuMatIcon: string;
    menuName: string;
    menuLinks: Array<MenuLink>;

    constructor(menuName: string, menuMatIcon: string, menuLinks: Array<MenuLink>) {
        this.menuName = menuName;
        this.menuMatIcon = menuMatIcon;
        this.menuLinks = menuLinks;
    }
}