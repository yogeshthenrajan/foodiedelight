import { Box, Flex, Spinner } from "@chakra-ui/react";

export function Loader({ styles = {} }) {
    return (
        <Flex
            as="div"
            alignItems={"center"}
            justifyContent={"center"}
            zIndex={1000000}
            height={"100vh"}
            width={"100vw"}
            overflow={"hidden"}
            {...styles}
        >
            <Spinner color="primary"/><Box as="span" marginLeft={"10px"}>Loading...</Box>
        </Flex>
    )
}