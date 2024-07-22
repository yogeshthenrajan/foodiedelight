import { Outlet } from "react-router-dom";

import { Container, useMediaQuery } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

interface IMainContentProps {
    isSideNavOpened: boolean;
}

export function MainContent({ isSideNavOpened }: IMainContentProps) {
    const [isTabView] = useMediaQuery("(max-width: 768px)")

    return (
        <Container 
            position={"relative"}
            as={"main"}
            top={'60px'}
            marginLeft={isSideNavOpened && !isTabView ? '200px': '0'}
            width={isSideNavOpened && !isTabView ? 'calc(100% - 200px)' : '100%'}
            maxWidth={isSideNavOpened && !isTabView ? 'calc(100% - 200px)' : '100%'}
            height={'100vh'}
            overflowX={'hidden'}
            overflowY={'auto'}
            padding={'20px'}
            bg={"#fff"}
        >
            <Box
                as="section"
                padding={'20px'}
            >
                <Outlet />
            </Box>
        </Container>
    )
}