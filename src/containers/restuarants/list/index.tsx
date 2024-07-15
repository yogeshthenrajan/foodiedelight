import { Loader } from '@/components/loader';
import { getCuisines } from '@/services/cuisine';
import { getRestuarantsCount } from '@/services/dashboard';
import { deleteRestuarant, getRestuarants } from '@/services/restuarant';
import { Cuisine } from '@/types/schema/cuisine';
import { Restaurant } from '@/types/schema/restaurant';
import { Card, CardBody, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, 
    Box,
    Flex,
    Input,
    Button,
} from '@chakra-ui/react'
import { useDeferredValue, useState } from 'react';
import { FaHome, FaSearch, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export function RestuarantList() {
    const [page, setPage] = useState(1);
    const [filterText, setFilterText] = useState('');
    const filterKeyword = useDeferredValue(filterText);

    const { isLoading: isRestaurantsCountLoading, data: restuarantsCount, refetch: refetchRestaurantsCount } = useQuery(['restuarants-count', filterKeyword], ({ queryKey }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, restaurantName] = queryKey;

        return getRestuarantsCount(restaurantName)
    })    

    const { isLoading: isRestuarantsLoading, data: restuarants, refetch } = useQuery(['restuarants-list', page, filterKeyword], ({ queryKey }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, page, restaurantName] = queryKey;

        return getRestuarants(Number(page), restaurantName.toString());
    })
    
    const { isLoading: isCuisinesLoading, data: cuisineData } = useQuery(`cusinies`, () => getCuisines());

    const deleteRestuarantData = useMutation((id) => deleteRestuarant(id), {
        onSuccess: function () {
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Restuarant deleted :)'
            }).then(() => {
                refetchRestaurantsCount();
                refetch();
            });
        },
        onError: function () {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to delete the restuarant :('
            })
        }
    })

    function getCuisineLabel(cuisineId: string) {        
        return cuisineData?.data?.find((cuisine: Cuisine) => String(cuisine.id) === String(cuisineId))?.name ?? "";
    }

    async function handleOnRestuarantRemove(restuarantId: string) {
        Swal.fire({
            title: 'Confirmation',
            text: 'Do you want to delete the restuarant?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              deleteRestuarantData.mutate(restuarantId as any)
            }
        })
    }

    const handleOnPrevPage = () => {
        setPage((prevState) => {
            if (prevState === 1) return 1;

            return prevState - 1;
        })
    }

    const handleOnNextPage = () => {
        setPage((prevState) => {
            if (prevState === restuarantsCount) return prevState;

            return prevState + 1;
        })
    }

    if (isRestaurantsCountLoading || isRestuarantsLoading || isCuisinesLoading) return <Loader />

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
                        <BreadcrumbLink href="/restuarants" >List</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Card>
            <Card
                marginTop={'20px'}
                width={"100%"}
            >
                <CardBody>
                <Flex
                    as='div'
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                >
                    <FaSearch />
                    <Input
                        marginLeft={"10px"}
                        width={'200px'}
                        placeholder={'Restuarant name'}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </Flex>
                <TableContainer>
                    <Table>
                        <TableCaption>List of restuarants - {page * 10} of {restuarantsCount}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Description</Th>
                                <Th>Cuisine</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                restuarants?.data?.map((restuarant: Restaurant) => (
                                    <Tr key={restuarant.id}>
                                        <Td>{restuarant.name}</Td>
                                        <Td>{restuarant.description ?? '-'}</Td>
                                        <Td>{getCuisineLabel(restuarant.cuisine)}</Td>
                                        <Td>
                                            <Flex
                                                gap={"10px"}
                                            >
                                                <Box
                                                    as='span'
                                                >
                                                    <Link to={`/restuarants/edit/${restuarant.id}`}>
                                                        <FaPencil />
                                                    </Link>
                                                </Box>
                                                <Box
                                                    as='span'
                                                >
                                                    <Link 
                                                        to="javascript:void(0)"
                                                        onClick={() => handleOnRestuarantRemove(restuarant.id ?? '')}
                                                    >
                                                        <FaTrash color='red' />
                                                    </Link>
                                                </Box>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <Flex
                    as='div'
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    marginTop={"20px"}
                >
                    <Button
                        isDisabled={page === 1 ? true : false}
                        onClick={() => handleOnPrevPage()}
                    >
                        Prev
                    </Button>
                    <Button
                        marginLeft={"20px"}
                        isDisabled={Math.ceil((restuarantsCount ?? 0)/10) === page ? true : false}
                        onClick={() => handleOnNextPage()}
                    >
                        Next
                    </Button>
                </Flex>
                </CardBody>
            </Card>
        </>
    )
}

export default RestuarantList;