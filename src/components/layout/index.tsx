import { useState } from "react";

import { Header } from "@/components/header";
import { MainContent } from "@/components/main-content";
import { SideNavigation } from "@/components/side-navigation";
import { ILayoutData } from "@/types/components/layout";

import "./style.scss"

export function Layout() {
    const [layoutData, setLayoutData] = useState<ILayoutData>({
        isSideNavOpened: true,
        expandedMenus: []
    });

    function toggleSideNavigation() {
        setLayoutData((prevState) => ({
            ...prevState,
            isSideNavOpened: !prevState.isSideNavOpened
        }))
    }

    function toggleMenuExpansion(expandedMenus: Array<string>, menuKey: string,) {
        const isMenuAlreadyExpanded = expandedMenus.find((menu: string) => menu === menuKey)
        
        if (isMenuAlreadyExpanded) {
            return expandedMenus.filter((menu: string) => menu !== menuKey);
        }

        return [...expandedMenus, menuKey];
    }

    function handleMenuExpansion(menuKey: string) {
        setLayoutData((prevState) => ({
            ...prevState,
            expandedMenus: toggleMenuExpansion(prevState.expandedMenus, menuKey)
        }))
    }

    function isMenuExpanded(menuKey: string) {
        const { expandedMenus }  = layoutData;
        
        return expandedMenus.includes(menuKey) ? true : false;
    }

    const { isSideNavOpened } = layoutData

    return (
        <>
            <Header
                toggleSideNavigation={toggleSideNavigation} 
            />
            <SideNavigation
                isSideNavOpened={isSideNavOpened}
                isMenuExpanded={isMenuExpanded}
                handleMenuExpansion={handleMenuExpansion}
            />
            <MainContent
                isSideNavOpened={isSideNavOpened}
            />
        </>
    )
}