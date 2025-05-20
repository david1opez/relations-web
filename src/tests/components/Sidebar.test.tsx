import { render, screen, fireEvent, act } from '@testing-library/react';
import Sidebar from '../../components/sidebar/Sidebar';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    route: 'inicio',
  }),
}));

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock de GetUser
jest.mock('@/utils/GetUser', () => ({
  GetUser: jest.fn(),
}));

describe('Sidebar Component', () => {
  const mockOnPageChange = jest.fn();
  const mockUser = {
    name: 'Test User',
    role: 'admin',
    profilePicture: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (require('@/utils/GetUser').GetUser as jest.Mock).mockResolvedValue(mockUser);
    localStorage.clear();
  });

  it('renders logo', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    await act(async () => {
      await Promise.resolve();
    });
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders user information when loaded', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('renders navigation items', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Llamadas')).toBeInTheDocument();
    expect(screen.getByText('Personas')).toBeInTheDocument();
  });

  it('handles page change', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    await act(async () => {
      await Promise.resolve();
    });

    const proyectosButton = screen.getByText('Proyectos');
    fireEvent.click(proyectosButton);

    expect(mockOnPageChange).toHaveBeenCalledWith('Proyectos');
  });

  it('shows loading state initially', () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    expect(screen.getByTestId('activity-indicator')).toBeInTheDocument();
  });

  it('handles logout', async () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
    }));

    render(<Sidebar onPageChange={mockOnPageChange} />);
    await act(async () => {
      await Promise.resolve();
    });

    const logoutButton = screen.getByText('Cerrar Sesión');
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('redirects to login when user is not authenticated', async () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
    }));

    (require('@/utils/GetUser').GetUser as jest.Mock).mockResolvedValue(null);

    render(<Sidebar onPageChange={mockOnPageChange} />);
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockPush).toHaveBeenCalledWith('/?login=true');
  });

  it('shows user initial when no profile picture', async () => {
    render(<Sidebar onPageChange={mockOnPageChange} />);
    await act(async () => {
      await Promise.resolve();
    });

    const initialElement = screen.getByText('T');
    expect(initialElement).toBeInTheDocument();
  });
}); 