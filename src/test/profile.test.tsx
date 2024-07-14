
import { render, screen } from '@testing-library/react';
import { Profile } from '@/containers/profile';
import { vitest, expect, test } from 'vitest';

vitest.mock('@/hooks/use-auth', () => ({
  useAuth: vitest.fn(() => ({ userId: 123 }))
}));


test('Profile renders breadcrumb with profile link', () => {
  render(<Profile />);

  const profileLink = screen.getByRole('link', { name: /Profile/i });
  
  expect(profileLink).toHaveAttribute('href', '/profile');
});

test('Profile renders user ID', () => {
  render(<Profile />);
  
  expect(screen.getByText('UserID: 123')).toBeInTheDocument();
});