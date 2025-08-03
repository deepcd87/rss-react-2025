import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeProvider';
import AboutPage from './AboutPage';

describe('AboutPage Component', () => {
  it('renders about information correctly', () => {
    render(
      <ThemeProvider>
        <AboutPage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole('heading', { name: /About Pokémon App/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /The Project/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /About Me/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Acknowledgments/i })
    ).toBeInTheDocument();

    const aboutMeSection = screen.getByRole('heading', {
      name: /About Me/i,
    }).parentElement;
    expect(aboutMeSection).toHaveTextContent("Hello! I'm Denis");

    const rsSchoolLink = screen.getByRole('link', {
      name: /Visit RS School React Course/i,
    });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );

    const logo = screen.getByAltText('RS School Logo');
    expect(logo).toBeInTheDocument();
  });
});
