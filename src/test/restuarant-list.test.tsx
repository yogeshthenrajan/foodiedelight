import { render, screen } from '@testing-library/react';
import { expect, test, vitest } from 'vitest';
import RestuarantList from '@/containers/restuarants/list';

test('renders restaurants list with data', async () => {
    vitest.mock('react-query', () => ({
        useQuery: (queryKey: string) => {
            if (queryKey[0] === 'restuarants-count') {
                return { isLoading: false, data: 10 };
            } else if (queryKey[0] === 'restuarants-list') {
                const mockRestaurants = [
                    { name: 'Restaurant A', description: 'Description A', cuisine: 'Cuisine A' },
                    { name: 'Restaurant B', description: 'Description B', cuisine: 'Cuisine B' },
                ];

                return { isLoading: false, data: mockRestaurants };
            } else if (queryKey[0] === `cusinies`) {
                const mockCuisines = [{ id: 1, name: 'Cuisine 1' }, { id: 2, name: 'Cuisine 2' }];

                return { isLoading: false, data: mockCuisines };
            }

            return { isLoading: false, data: [] };
        },
        useMutation: vitest.fn(),
    }));

    await render(<RestuarantList />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Cuisine')).toBeInTheDocument();    
})