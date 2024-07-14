import { Component, ErrorInfo, ReactNode } from "react";

import { Flex, Image, Text } from "@chakra-ui/react";
import { IErrorBoundaryState, IErrorBoundaryProps } from "@/types/components/error-boundary";

import ErrorImage from '@/assets/svg/error.svg';

export class ErrorBoundary extends Component<IErrorBoundaryProps> {
    constructor(props: IErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(`Error occured`, {error, errorInfo})
    }

    render(): ReactNode {
        const { hasError, error } = this.state as IErrorBoundaryState;
        
        if (hasError) {
            return (
                <Flex
                    width={"100vw"}
                    height={"100vh"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                >
                    <Image
                        src={ErrorImage}
                        width={"20%"}
                    />
                    <Text marginTop={"20px"}> Error: { JSON.stringify(error) } </Text>
                    <Text marginTop={"20px"} cursor={"pointer"} onClick={() => window.location.reload() } > Click here to refresh the page. </Text>
                </Flex>
            )
        }

        return this.props.children;
    }
}
