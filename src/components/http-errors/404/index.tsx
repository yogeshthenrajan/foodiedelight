import { Flex, Image, Text } from "@chakra-ui/react";

import PageNotFoundImage from '@/assets/svg/404.svg';

export function Error404() {
    return (
        <Flex
            width={"100vw"}
            height={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
        >
            <Image
                src={PageNotFoundImage}
                width={"20%"}
                alt="Page not found"
            />        
            <Text marginTop={"20px"} cursor={"pointer"} onClick={() => window.location.replace('/login') } >Click here to go login.</Text>
        </Flex>
    )
}

export default Error404;