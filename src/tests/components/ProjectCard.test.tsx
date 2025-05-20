import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../../components/projectCard/ProjectCard';

describe('ProjectCard Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders project title and status', () => {
    render(<ProjectCard onClick={mockOnClick} />);
    expect(screen.getByText('Plataforma eCommerce')).toBeInTheDocument();
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard onClick={mockOnClick} />);
    expect(screen.getByText(/Desarrollo de una plataforma de comercio electrónico/)).toBeInTheDocument();
  });

  it('renders client metadata', () => {
    render(<ProjectCard onClick={mockOnClick} />);
    expect(screen.getByText('Cliente:')).toBeInTheDocument();
    expect(screen.getByText('Sunlight Logistics')).toBeInTheDocument();
  });

  it('renders project metadata', () => {
    render(<ProjectCard onClick={mockOnClick} />);
    expect(screen.getByText('Miembros:')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();
    expect(screen.getByText('Inicio:')).toBeInTheDocument();
    expect(screen.getByText('12/10/2023')).toBeInTheDocument();
    expect(screen.getByText('Entrega:')).toBeInTheDocument();
  });

  it('calls onClick when details button is clicked', () => {
    render(<ProjectCard onClick={mockOnClick} />);
    const detailsButton = screen.getByText('Ver detalles');
    fireEvent.click(detailsButton);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders options menu', () => {
    render(<ProjectCard onClick={mockOnClick} />);
    // Verificar que el OptionsMenu está presente
    const optionsMenu = document.querySelector('.optionsMenu');
    expect(optionsMenu).toBeInTheDocument();
  });

  it('renders all metadata items with correct icons', () => {
    render(<ProjectCard onClick={mockOnClick} />);
    
    // Verificar que los íconos están presentes
    expect(screen.getByRole('img', { name: 'user' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'users' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'calendar' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'clock' })).toBeInTheDocument();
  });
}); 