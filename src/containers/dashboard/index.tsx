import { useQuery } from 'react-query';
import { getRestuarantsCount } from '@/services/dashboard';
import { Card, CardHeader, CardBody, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink} from '@chakra-ui/react'
import { FaHome } from "react-icons/fa"
import { Loader } from '@/components/loader';

export function Dashboard() {
    const { isLoading, data: numberOfRestuarants } = useQuery(`dashboard`, () => getRestuarantsCount());

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Card padding={'10px'}>
                <Breadcrumb>
                    <BreadcrumbItem>                        
                            <BreadcrumbLink href="/" ><FaHome /></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>                        
                            <BreadcrumbLink href="/dashboard" >Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Card>
            <Card
                marginTop={'20px'}
                width={{xl: '25%', lg: '25%', md: '50%', sm: '100%'}}
            >
                <CardHeader>
                    Number of restuarants                
                </CardHeader>
                <CardBody>
                    <Text>{numberOfRestuarants}</Text>
                </CardBody>
            </Card>
        </>
    )
}

export default Dashboard;