/* eslint-disable @typescript-eslint/no-explicit-any */

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, GridItem, Card, CardBody, Box, FormControl, FormLabel, HStack, Text, Input, FormErrorMessage, Button, Select, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa6';
import { FaTrash, FaHome } from 'react-icons/fa';
import { getCuisines } from '@/services/cuisine';
import { getFoodTypes } from '@/services/food-type';
import { useMemo } from 'react';
import Swal from 'sweetalert2';
import { Cuisine } from '@/types/schema/cuisine';
import { FoodType } from '@/types/schema/food-type';
import { restuarantFormSchema } from '@/types/form-schema/restuarants';
import { createRestuarant } from '@/services/restuarant';
import { v4 as uuidv4 } from 'uuid';
import { Loader } from '@/components/loader';
import { IOptions } from '@/types';

export function RestuarantCreate() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        reset
    } = useForm({
        resolver: yupResolver(restuarantFormSchema),
    })

    const { fields: menuItems, append, remove } = useFieldArray({
        control,
        name: "menuItems"
    });

    const { isLoading: isCuisinesLoading, error: isCuisineError, data: cuisineData } = useQuery(`cusinies`, () => getCuisines());

    const { isLoading: isFoodTypeLoading, error: isFoodTypeError, data: foodTypeData } = useQuery(`food-type`, () => getFoodTypes());

    const cuisineOptions = useMemo(() => {
        return cuisineData?.data.map((cuisine: Cuisine) => ({ id: cuisine.id, value: cuisine.name }))
    }, [cuisineData])

    const foodTypeOptions = useMemo(() => {
        return foodTypeData?.data.map((foodType: FoodType) => ({ id: foodType.id, value: foodType.name }))
    }, [foodTypeData])

    const createNewRestuarant = useMutation(
        (formData: any) => createRestuarant({ ...formData, id: uuidv4(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()}),
        {
            onSuccess: function () {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'New restuarant created :)'
                })

                reset();
            },
            onError: function () {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed to create a new restuarant :('
                })
            }
        }
    )

    function handleOnAddMenuClick() {
        append({
            menu: {
                name: '',
                description: '',
                cuisine: '',
                foodType: '',
                price: 0,
                tags: ''
            }
        });
    }

    function handleOnRemoveMenuClick(index: number) {
        remove(index);
    }

    async function handleOnSubmit(formValues: any) {
        createNewRestuarant.mutate(formValues);
    }

    if (isCuisinesLoading || isFoodTypeLoading) return <Loader />

    if (isCuisineError || isFoodTypeError) {
        Swal.fire({
            title: 'Error :(',
            text: 'Error while fetching data !',
            icon: 'error'
        })
    }

    return (
        <>
            <Card padding={'10px'}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" ><FaHome /></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/restuarants" >Restuarants</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/restuarants/create" >Create</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Card>
            <Card marginTop={'20px'}>
                <CardBody>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <Grid marginBottom={'20px'} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
                            <GridItem>
                                <FormControl isInvalid={errors.name ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Restuarant Name</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='name'
                                        placeholder='Enter a restuarant name...'
                                        {...register('name')}
                                    />
                                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.description ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Description</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='description'
                                        placeholder='Enter the description...'
                                        {...register('description')}
                                    />
                                    <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.cuisine ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Cuisine</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Select
                                        id='cuisine'
                                        placeholder='Select cuisine'
                                        {...register('cuisine')}
                                    >
                                        {
                                            cuisineOptions.map((cusinie: IOptions) => <option value={cusinie.id}>{cusinie.value}</option>)
                                        }
                                    </Select>
                                    <FormErrorMessage>{errors.cuisine && errors.cuisine.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>
                        <hr />
                        <Grid marginTop={"20px"} marginBottom={"20px"} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
                            <GridItem>
                                <FormControl isInvalid={errors.location?.address?.streetName ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Street Name</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='location.address.streetName'
                                        placeholder='Enter a street name...'
                                        {...register('location.address.streetName')}
                                    />
                                    <FormErrorMessage>{errors.location?.address?.streetName && errors.location?.address?.streetName?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.location?.address?.city ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>City</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='location.address.city'
                                        placeholder='Enter the city...'
                                        {...register('location.address.city')}
                                    />
                                    <FormErrorMessage>{errors.location?.address?.city && errors.location?.address?.city?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.location?.address?.state ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>State</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='location.address.state'
                                        placeholder='Enter the state...'
                                        {...register('location.address.state')}
                                    />
                                    <FormErrorMessage>{errors.location?.address?.state && errors.location?.address?.state?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl isInvalid={errors.location?.address?.country ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Country Name</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='location.address.country'
                                        placeholder='Enter a country name...'
                                        {...register('location.address.country')}
                                    />
                                    <FormErrorMessage>{errors.location?.address?.country && errors.location?.address?.country?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.location?.address?.zipcode ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Zipcode</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='location.address.zipcode'
                                        placeholder='Enter the zipcode...'
                                        {...register('location.address.zipcode')}
                                    />
                                    <FormErrorMessage>{errors.location?.address?.zipcode && errors.location?.address?.zipcode?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>
                        <hr />

                        <Grid marginTop={"20px"} marginBottom={"20px"} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
                            <GridItem>
                                <FormControl isInvalid={errors.location?.latitude ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Latitude</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='location.latitude'
                                        placeholder='Enter a Latitude...'
                                        {...register('location.latitude')}
                                    />
                                    <FormErrorMessage>{errors.location?.latitude && errors.location?.latitude?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.location?.longitude ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Longitude</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='location.longitude'
                                        placeholder='Enter the longitude...'
                                        {...register('location.longitude')}
                                    />
                                    <FormErrorMessage>{errors.location?.longitude && errors.location?.longitude?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>

                        <hr />

                        <Grid marginTop={"20px"} marginBottom={"20px"} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
                            <GridItem>
                                <FormControl isInvalid={errors.contacts?.primary?.email ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Primary Email ID</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='contacts.primary.email'
                                        placeholder='Enter a primary email id...'
                                        {...register('contacts.primary.email')}
                                    />
                                    <FormErrorMessage>{errors.contacts?.primary?.email && errors.contacts?.primary?.email?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.contacts?.primary?.mobile ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Primary Mobile Number</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='contacts.primary.mobile'
                                        placeholder='Enter the primary mobile number...'
                                        {...register('contacts.primary.mobile')}
                                    />
                                    <FormErrorMessage>{errors.contacts?.primary?.mobile && errors.contacts?.primary?.mobile?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.contacts?.secondary?.email ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Secondary Email ID</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='contacts.secondary.email'
                                        placeholder='Enter a secondary email id...'
                                        {...register('contacts.secondary.email')}
                                    />
                                    <FormErrorMessage>{errors.contacts?.secondary?.email && errors.contacts?.secondary?.email?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.contacts?.secondary?.mobile ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Secondary Mobile Number</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='contacts.secondary.mobile'
                                        placeholder='Enter the secondary mobile number...'
                                        {...register('contacts.secondary.mobile')}
                                    />
                                    <FormErrorMessage>{errors.contacts?.secondary?.mobile && errors.contacts?.secondary?.mobile?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.contacts?.website ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Website</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='contacts.website'
                                        placeholder='Enter the website url...'
                                        {...register('contacts.website')}
                                    />
                                    <FormErrorMessage>{errors.contacts?.website && errors.contacts?.website?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>

                        <hr />

                        <Grid marginTop={"20px"} marginBottom={"20px"} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
                            <GridItem>
                                <FormControl isInvalid={errors.status ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Status</Text>
                                        </HStack>
                                    </FormLabel>
                                    <Select
                                        id='status'
                                        placeholder='Select status'
                                        {...register('status')}
                                    >
                                        <option value="true" selected>Enable</option>
                                        <option value="false">Disable</option>
                                    </Select>
                                    <FormErrorMessage>{errors.status && errors.status.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.tags ? true : false}>
                                    <FormLabel>
                                        <HStack spacing={3}>
                                            <Text>Tags</Text>
                                        </HStack>
                                    </FormLabel>

                                    <Input
                                        id='tags'
                                        placeholder='Ex. spicy, veg'
                                        {...register('tags')}
                                    />
                                    <FormErrorMessage>{errors.tags && errors.tags.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>

                        <hr />
                        {
                            menuItems.map((_, index: number) => (
                                <>
                                    <Grid marginTop={"20px"} marginBottom={"20px"} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
                                        <GridItem>
                                            <FormControl isInvalid={errors.menuItems && errors.menuItems[index]?.menu?.name ? true : false}>
                                                <FormLabel>
                                                    <HStack spacing={3}>
                                                        <Text>Name</Text>
                                                    </HStack>
                                                </FormLabel>

                                                <Input
                                                    id={`menuItems.${index}.name`}
                                                    placeholder='Enter food name...'
                                                    {...register(`menuItems.${index}.menu.name`)}
                                                />
                                                <FormErrorMessage>{errors.menuItems && errors.menuItems[index]?.menu?.name?.message}</FormErrorMessage>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem>
                                            <FormControl isInvalid={errors.menuItems && errors.menuItems[index]?.menu?.description ? true : false}>
                                                <FormLabel>
                                                    <HStack spacing={3}>
                                                        <Text>Description</Text>
                                                    </HStack>
                                                </FormLabel>

                                                <Input
                                                    id={`menuItems.${index}.menu.description`}
                                                    placeholder='Enter description...'
                                                    {...register(`menuItems.${index}.menu.description`)}
                                                />
                                                <FormErrorMessage>{errors.menuItems && errors.menuItems[index]?.menu?.description?.message}</FormErrorMessage>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem>
                                            <FormControl isInvalid={errors.menuItems && errors.menuItems[index]?.menu?.cuisine ? true : false}>
                                                <FormLabel>
                                                    <HStack spacing={3}>
                                                        <Text>Cuisine</Text>
                                                    </HStack>
                                                </FormLabel>

                                                <Select
                                                    id='menuItems.${index}.cuisine'
                                                    placeholder='Select cuisine'
                                                    {...register(`menuItems.${index}.menu.cuisine`)}
                                                >
                                                    {
                                                        cuisineOptions.map((cusinie: IOptions) => <option value={cusinie.id}>{cusinie.value}</option>)
                                                    }
                                                </Select>
                                                <FormErrorMessage>{errors.menuItems && errors.menuItems[index]?.menu?.cuisine?.message}</FormErrorMessage>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem>
                                            <FormControl isInvalid={errors.menuItems && errors.menuItems[index]?.menu?.foodType ? true : false}>
                                                <FormLabel>
                                                    <HStack spacing={3}>
                                                        <Text>Food Type</Text>
                                                    </HStack>
                                                </FormLabel>

                                                <Select
                                                    id='menuItems.${index}.foodType'
                                                    placeholder='Select food type'
                                                    {...register(`menuItems.${index}.menu.foodType`)}
                                                >
                                                    {
                                                        foodTypeOptions.map((foodType: IOptions) => <option value={foodType.id}>{foodType.value}</option>)
                                                    }
                                                </Select>
                                                <FormErrorMessage>{errors.menuItems && errors.menuItems[index]?.menu?.foodType?.message}</FormErrorMessage>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem>
                                            <FormControl isInvalid={errors.menuItems && errors.menuItems[index]?.menu?.price ? true : false}>
                                                <FormLabel>
                                                    <HStack spacing={3}>
                                                        <Text>Price</Text>
                                                    </HStack>
                                                </FormLabel>

                                                <Input
                                                    type='number'
                                                    id={`menuItems.${index}.price`}
                                                    placeholder='Enter food price...'
                                                    {...register(`menuItems.${index}.menu.price`)}
                                                />
                                                <FormErrorMessage>{errors.menuItems && errors.menuItems[index]?.menu?.price?.message}</FormErrorMessage>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem>
                                            <FormControl isInvalid={errors.menuItems && errors.menuItems[index]?.menu?.tags ? true : false}>
                                                <FormLabel>
                                                    <HStack spacing={3}>
                                                        <Text>Tags</Text>
                                                    </HStack>
                                                </FormLabel>

                                                <Input
                                                    id={`menuItems.${index}.tags`}
                                                    placeholder='Ex. spicy, veg'
                                                    {...register(`menuItems.${index}.menu.tags`)}
                                                />
                                                <FormErrorMessage>{errors.menuItems && errors.menuItems[index]?.menu?.tags?.message}</FormErrorMessage>
                                            </FormControl>
                                        </GridItem>
                                    </Grid>
                                    <Box
                                        as='div'
                                        textAlign={"end"}
                                    >
                                        <Button
                                            type='button'
                                            bg={"light"}
                                            onClick={() => handleOnRemoveMenuClick(index)}
                                        >
                                            <FaTrash />
                                            Remove menu
                                        </Button>
                                    </Box>
                                    <hr />
                                </>
                            ))
                        }

                        <Box
                            as="div"
                            textAlign={"end"}
                            marginTop={"20px"}
                        >
                            <Button
                                type='button'
                                color={"white"}
                                bg={"secondary"}
                                onClick={handleOnAddMenuClick}
                            >
                                <HStack spacing={3}>
                                    <FaPlus />
                                    <Text color={'white'}>Add menu</Text>
                                </HStack>
                            </Button>
                        </Box>

                        <Box
                            as="div"
                            marginTop={"20px"}
                        >
                            <FormControl>
                                <Button
                                    type="submit"
                                    bg="secondary"
                                    color={"light"}
                                    aria-label="Login"
                                    isLoading={isSubmitting || createNewRestuarant.isLoading}
                                >
                                    <HStack spacing={3}>
                                        <FaPlus />
                                        <Text color={'white'}>Create</Text>
                                    </HStack>
                                </Button>
                            </FormControl>
                        </Box>
                    </form>
                </CardBody>
            </Card>
        </>
    )
}

export default RestuarantCreate;