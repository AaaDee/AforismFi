import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText('AforismFi');
  expect(linkElement).toBeInTheDocument();
});