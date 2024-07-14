import { extendTheme } from "@chakra-ui/react";
import '@fontsource/roboto'

/**
 * Creating global common theme for app.
 */
export const CustomizedTheme = extendTheme({
    fonts: {
        body: `'Roboto', sans-serif`
    },
    colors: {
        primary: `#FE724C`,
        secondary: `lightcoral`,
        dark: `#272D2F`,
        light: `#D7D7D7`
    },
    components: {
        Link: {
            baseStyle: {
                _hover: {
                    textDecoration: 'none',
                },
            }
        }
    }
})

