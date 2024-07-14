import { Link } from 'react-router-dom';
import { FaRegUserCircle, FaBars } from "react-icons/fa"
import { Box, Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { IHeaderProps } from "@/types"
import { useAuth } from '@/hooks';
import { moduleKeys } from '@/constants/auth';

export function Header({ toggleSideNavigation }: IHeaderProps) {
    const { hasAccessRights, rights, logout } = useAuth();

    return (
        <Flex
            as={'header'}
            align="center"
            justify="space-between"
            padding="20px"
            bg="white"
            boxShadow="md"
            zIndex="1000"
            position="fixed"
            width="100%"
            height={'60px'}
        >
            <Box 
                cursor={'pointer'}
                flexBasis={'10%'}
                color={"secondary"}
            >
                FoodieDelight
            </Box>
            <Flex
                as={'div'}
                flexBasis={'90%'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Box 
                    cursor={'pointer'}
                    flexBasis={'50%'}
                    marginLeft={'20px'}
                >
                    <FaBars onClick={toggleSideNavigation} color={"primary"} />
                </Box>

                <Flex 
                    cursor={'pointer'}
                    flexBasis={'50%'}
                    textAlign={'end'}
                    alignItems={'center'}
                    justifyContent={'end'}
                >
                    <Menu>
                        <MenuButton>
                            <FaRegUserCircle color={"primary"}/>
                        </MenuButton>
                        <MenuList>
                            {hasAccessRights && hasAccessRights(moduleKeys.profile, rights) ? (<MenuItem>
                                <Link to="/profile">
                                    Profile
                                </Link>
                            </MenuItem>) : null}
                            <MenuItem>
                                <Link to="javascript:void(0)" onClick={logout}>
                                    Logout
                                </Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Flex>
    )
}