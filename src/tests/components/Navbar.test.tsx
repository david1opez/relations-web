import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/navbar/Navbar';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock de Login
jest.mock('@/utils/GetUser', () => ({
  Login: jest.fn(),
}));

describe('Navbar Component', () => {
  it('renders logo', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', './images/logo.svg');
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument();
    expect(screen.getByText('Accesos y permisos')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<Navbar />);
    expect(screen.getByText('Empezar a analizar')).toBeInTheDocument();
  });

  it('handles login button click', () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
    }));

    render(<Navbar />);
    fireEvent.click(screen.getByText('Empezar a analizar'));
    
    expect(require('@/utils/GetUser').Login).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/inicio');
  });
}); 