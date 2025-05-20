import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '@/components/sidebar/Sidebar';
import { GetUser } from '@/utils/GetUser';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: () => ({ route: 'inicio' })
}));

// Mock the GetUser utility
jest.mock('@/utils/GetUser', () => ({
  GetUser: jest.fn()
}));

describe('Sidebar Component', () => {
  const mockOnPageChange = jest.fn();
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (GetUser as jest.Mock).mockResolvedValue({
      name: 'Test User',
      role: 'admin',
      profilePicture: null
    });
  });

  it('renders logo', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    const logo = await screen.findByRole('img', { name: 'Logo' });
    expect(logo).toBeInTheDocument();
  });

  it('renders user information', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    const userName = await screen.findByText('Test User');
    const userRole = await screen.findByText('admin');
    expect(userName).toBeInTheDocument();
    expect(userRole).toBeInTheDocument();
  });

  it('renders navigation items', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    expect(await screen.findByText('Inicio')).toBeInTheDocument();
    expect(await screen.findByText('Proyectos')).toBeInTheDocument();
    expect(await screen.findByText('Llamadas')).toBeInTheDocument();
    expect(await screen.findByText('Personas')).toBeInTheDocument();
  });

  it('handles page change', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    const inicioButton = await screen.findByText('Inicio');
    fireEvent.click(inicioButton);
    expect(mockOnPageChange).toHaveBeenCalledWith('Inicio');
  });

  it('handles logout', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    const optionsMenu = await screen.findByRole('img', { name: 'three-dots' });
    fireEvent.click(optionsMenu);
    const logoutButton = await screen.findByText('Cerrar Sesión');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('user')).toBeNull();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
}); 