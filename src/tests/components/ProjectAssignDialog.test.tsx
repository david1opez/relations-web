import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectAssignDialog from '@/components/projectAssignDialog/ProjectAssignDialog';
import { getProjects } from '@/utils/UserManagement';

// Mock de las funciones de utilidad
jest.mock('@/utils/UserManagement', () => ({
  getProjects: jest.fn(),
  assignProjectToUser: jest.fn(),
  removeProjectFromUser: jest.fn()
}));

describe('ProjectAssignDialog', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    userId: 1,
    currentProjects: []
  };

  const mockProjects = [
    { projectID: 1, name: 'Project 1' },
    { projectID: 2, name: 'Project 2' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getProjects as jest.Mock).mockResolvedValue(mockProjects);
  });

  it('renders dialog when isOpen is true', async () => {
    render(<ProjectAssignDialog {...mockProps} />);
    await waitFor(() => {
      expect(screen.getByText('Asignar Proyectos')).toBeInTheDocument();
    });
  });

  it('does not render when isOpen is false', () => {
    render(<ProjectAssignDialog {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Asignar Proyectos')).not.toBeInTheDocument();
  });

  it('loads projects when opened', async () => {
    render(<ProjectAssignDialog {...mockProps} />);
    await waitFor(() => {
      expect(getProjects).toHaveBeenCalled();
    });
  });

  it('calls onClose when clicking cancel button', async () => {
    render(<ProjectAssignDialog {...mockProps} />);
    await waitFor(() => {
      const cancelButton = screen.getByText('Cancelar');
      fireEvent.click(cancelButton);
      expect(mockProps.onClose).toHaveBeenCalled();
    });
  });

  it('calls onConfirm with assignments when clicking confirm button', async () => {
    render(<ProjectAssignDialog {...mockProps} />);
    await waitFor(() => {
      const confirmButton = screen.getByText('Confirmar');
      fireEvent.click(confirmButton);
      expect(mockProps.onConfirm).toHaveBeenCalled();
    });
  });

  it('shows loading state while fetching projects', () => {
    render(<ProjectAssignDialog {...mockProps} />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
}); 