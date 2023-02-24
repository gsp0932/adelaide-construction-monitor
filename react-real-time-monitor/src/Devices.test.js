import { render, screen } from '@testing-library/react';
import Devices from './pages/Devices';

test('renders learn react link', () => {
  render(<Devices />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
