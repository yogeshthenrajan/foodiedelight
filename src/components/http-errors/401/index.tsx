import { Flex, Text, Image } from "@chakra-ui/react";

import UnAuthorisedImage from '@/assets/svg/401.svg';

export function Error401() {
    return (
        <Flex
            width={"100vw"}
            height={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
        >
            <Image
                src={UnAuthorisedImage}
                width={"20%"}
            />        
            <Text marginTop={"20px"} cursor={"pointer"} onClick={() => window.location.replace('/login') } > Click here to go login. </Text>
        </Flex>
    )
}

export default Error401;