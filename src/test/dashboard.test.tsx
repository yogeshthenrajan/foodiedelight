import { render, screen } from '@testing-library/react';
import { Dashboard } from '@/containers/dashboard'; // Assuming your component file path
import { expect, test, vitest } from 'vitest';

vitest.mock('react-query', () => ({
    useQuery: vitest.fn(() => ({ isLoading: false, data: 10 })) // Example mock data
}));

test('Dashboard renders restaurant count', () => {
    render(<Dashboard />);

    expect(screen.getByText('Number of restuarants')).toBeInTheDocument();

    expect(screen.getByText('10')).toBeInTheDocument();
});
