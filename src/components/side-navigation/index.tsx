import { Link } from 'react-router-dom';
import { FaHome, FaUtensils, FaChevronDown, FaChevronUp, FaPlusSquare, FaListAlt } from 'react-icons/fa';
import { Box, Flex, Collapse, List, ListIcon, ListItem } from "@chakra-ui/react"
import { ISideNavigationProps } from '@/types';
import { useAuth } from '@/hooks';
import { moduleKeys } from '@/constants/auth';

export function SideNavigation({ isSideNavOpened, handleMenuExpansion, isMenuExpanded }: ISideNavigationProps) {
    const { hasAccessRights, rights } = useAuth();

    return (
        <>
            <Box 
                as="nav"              
                position={{ base: 'fixed' }}
                left={{ base: isSideNavOpened ? '0' : '-100%'}}
                top="0px"
                width={{ lg: '200px', md: '200px', sm: '250px'  }}
                height="100vh"
                bg="white"
                padding="1rem"
                boxShadow="md"
                overflowY="auto"
                transition="left 0.2s"
                zIndex={999}
            >   
                <List 
                    spacing={4}
                    marginTop={'60px'}
                >
                    {hasAccessRights && hasAccessRights(moduleKeys.dashboard, rights) ? (<ListItem>
                        <ListIcon as={FaHome} color={"primary"}/>
                        <Link to="/dashboard">Dashboard</Link>
                    </ListItem>) : null}
                    
                    {hasAccessRights && hasAccessRights(moduleKeys.restuarants, rights) ? (<ListItem
                        cursor={'pointer'}
                        onClick={() => handleMenuExpansion(`restuarant`)}
                    >
                        <Flex
                            alignItems={'center'}
                        >
                            <ListIcon as={FaUtensils} color={"primary"}/>
                            <Link to="javascript:void(0)">Restuarant</Link>
                            <ListIcon as={isMenuExpanded(`restuarant`) ? FaChevronUp : FaChevronDown} marginLeft="auto" paddingLeft={'5px'} />
                        </Flex>
                    </ListItem>) : null}

                    <Collapse in={isMenuExpanded(`restuarant`)} animateOpacity>
                        <List pl={8} spacing={4}>
                            {hasAccessRights && hasAccessRights(moduleKeys['restuarants-create'], rights) ? (<ListItem>
                                <ListIcon as={FaPlusSquare} color={"primary"} />
                                <Link to="/restuarants/create">Create</Link>
                            </ListItem>) : null}
                            {hasAccessRights && hasAccessRights(moduleKeys['restuarants-list'], rights) ? (<ListItem>
                                <ListIcon as={FaListAlt} color={"primary"}/>
                                <Link to="/restuarants">Manage</Link>
                            </ListItem>) : null}
                        </List>
                    </Collapse>

                </List>
            </Box>
        </>
    )
}