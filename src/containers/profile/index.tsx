import { useAuth } from '@/hooks';
import { Card, CardHeader, CardBody, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FaHome } from 'react-icons/fa';

export function Profile() {
    const { userId } = useAuth();

    return (
        <>
            <Card padding={'10px'}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" ><FaHome /></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/profile" >Profile</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Card>
            <Card
                marginTop={'20px'}
                width={'100%'}
            >
                <CardHeader>
                    Profile
                </CardHeader>
                <CardBody>
                    UserID: { userId } 
                </CardBody>
            </Card>
        </>
    )
}

export default Profile;