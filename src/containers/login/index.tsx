import { useForm } from "react-hook-form";
import {
    Box, Flex, FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Image,
    HStack,
    Text,
    Button
} from "@chakra-ui/react"
import Swal from 'sweetalert2'
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEnvelope, FaLock, FaGreaterThan } from "react-icons/fa";

import { loginFormSchema } from "@/types/form-schema/login";
import { useAuth } from "@/hooks";
import loginBackgroundSVG from '@/assets/svg/login.svg';
import { getUser } from "@/services/auth";

export function Login() {
    const { login } = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(loginFormSchema)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function handleOnSubmit(values: any) {
        const { email, password } = values;

        const user = await getUser(email, password);

        if (user && login) {
            return login(user);
        } else {
            Swal.fire({
                title: 'Error :(',
                text: 'Invalid credentials !',
                icon: 'error'
            })
        }
    }

    return (
        <Flex
            as="div"
            position={'relative'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'100vh'}
            width={'100vw'}
            bg={"secondary"}
        >
            <Box
                as="div"
                bg={"white"}
                width={{ sm: '90%', md: '60%', lg: '40%', xl: '30%' }}
                padding={'50px'}
                borderRadius={'8px'}
                boxShadow={"0px 1px 6px -2px"}
            >
                <Box
                    as="div"
                    display={"flex"}
                    alignItems={'center'}
                    flexDirection={"column"}
                >
                    <Image
                        src={loginBackgroundSVG}
                        width={'200px'}
                        height={'auto'}
                    />
                    <Box
                        as={'span'}
                        marginTop={'10px'}
                        color={"secondary"}
                    >
                        FoodieDelight
                    </Box>
                </Box>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Box
                        as="div"
                        marginTop={'25px'}
                    >
                        <FormControl isInvalid={errors.email ? true : false}>
                            <FormLabel>
                                <HStack spacing={3}>
                                    <FaEnvelope />
                                    <Text>Email ID</Text>
                                </HStack>
                            </FormLabel>

                            <Input
                                id='email'
                                placeholder='Enter your email id...'
                                {...register('email')}
                            />
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                    </Box>

                    <Box
                        as="div"
                        marginTop={"20px"}
                    >
                        <FormControl isInvalid={errors.password ? true : false}>
                            <FormLabel>
                                <HStack spacing={3}>
                                    <FaLock />
                                    <Text>Password</Text>
                                </HStack>
                            </FormLabel>

                            <Input
                                type="password"
                                id='password'
                                placeholder='Enter your password...'
                                {...register('password')}
                            />
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>
                    </Box>

                    <Box
                        as="div"
                        marginTop={"20px"}
                    >
                        <FormControl>
                            <Button
                                as={"button"}
                                type="submit"
                                bg="secondary"
                                color={"white"}
                                aria-label="Login"
                                isLoading={isSubmitting}
                            >
                                <HStack spacing={3}>
                                    <FaGreaterThan />
                                    <Text>Login</Text>
                                </HStack>
                            </Button>
                        </FormControl>
                    </Box>
                </form>
            </Box>
        </Flex>
    )
}

export default Login