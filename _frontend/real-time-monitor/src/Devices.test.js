import { render, screen } from '@testing-library/react';
import Devices from './pages/AllDevices';

test('renders learn react link', () => {
  render(<Devices />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
