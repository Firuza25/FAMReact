import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterPart from '../Components/Footer/FooterPart';
import '@testing-library/jest-dom';


beforeAll(() => {
  global.matchMedia = global.matchMedia || function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
});

describe('FooterPart Component', () => {
  test('renders the footer with correct year and social media links', async () => {
    render(<FooterPart />);

    const yearText = screen.getByText(`© ${new Date().getFullYear()} NextEvent`);
    expect(yearText).toBeInTheDocument();

    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
    
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
  });
});