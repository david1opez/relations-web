import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectAssignDialog from '@/components/projectAssignDialog/ProjectAssignDialog';
import { getProjects } from '@/utils/UserManagement';

// Mock de las utilidades
jest.mock('@/utils/UserManagement', () => ({
  getProjects: jest.fn(),
  assignProjectToUser: jest.fn(),
  removeProjectFromUser: jest.fn(),
}));

describe('ProjectAssignDialog Component', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    userId: 1,
    currentProjects: [],
  };

  const mockProjects = [
    { projectID: 1, name: 'Proyecto 1' },
    { projectID: 2, name: 'Proyecto 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getProjects as jest.Mock).mockResolvedValue(mockProjects);
  });

  it('renders dialog when isOpen is true', () => {
    render(<ProjectAssignDialog {...mockProps} />);
    expect(screen.getByText('Asignar Proyectos')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ProjectAssignDialog {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Asignar Proyectos')).not.toBeInTheDocument();
  });

  it('loads projects when dialog is opened', async () => {
    render(<ProjectAssignDialog {...mockProps} />);
    await waitFor(() => {
      expect(getProjects).toHaveBeenCalled();
    });
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<ProjectAssignDialog {...mockProps} />);
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls onConfirm with assignments when confirm button is clicked', async () => {
    render(<ProjectAssignDialog {...mockProps} />);
    await waitFor(() => {
      expect(getProjects).toHaveBeenCalled();
    });
    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);
    expect(mockProps.onConfirm).toHaveBeenCalled();
  });

  it('shows loading state while fetching projects', async () => {
    (getProjects as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<ProjectAssignDialog {...mockProps} />);
    expect(screen.getByText('Cargando proyectos...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Cargando proyectos...')).not.toBeInTheDocument();
    });
  });
}); 