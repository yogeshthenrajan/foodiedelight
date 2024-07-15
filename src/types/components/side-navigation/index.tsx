export interface ISideNavigationProps {
    isSideNavOpened: boolean;
    handleMenuExpansion: (menuKey: string) => void;
    isMenuExpanded: (menuKey: string) => boolean
}