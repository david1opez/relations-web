import { render, screen, fireEvent } from '@testing-library/react';
import AssignProjectPopup from '../../components/CallComponent/AssignProjectPopup';

describe('AssignProjectPopup', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Call',
    attendees: ['John Doe', 'Jane Smith'],
    date: '01/01/2024',
    duration: '1 hora'
  };

  beforeEach(() => {
    mockProps.onClose.mockClear();
  });

  it('does not render when isOpen is false', () => {
    render(<AssignProjectPopup {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Test Call')).not.toBeInTheDocument();
  });

  it('renders call title', () => {
    render(<AssignProjectPopup {...mockProps} />);
    expect(screen.getByText('Test Call')).toBeInTheDocument();
  });

  it('renders attendees', () => {
    render(<AssignProjectPopup {...mockProps} />);
    expect(screen.getByText('Asistentes:')).toBeInTheDocument();
    expect(screen.getByText('John Doe, Jane Smith')).toBeInTheDocument();
  });

  it('renders date and duration', () => {
    render(<AssignProjectPopup {...mockProps} />);
    expect(screen.getByText('Fecha:')).toBeInTheDocument();
    expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('Duración:')).toBeInTheDocument();
    expect(screen.getByText('1 hora')).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    render(<AssignProjectPopup {...mockProps} />);
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking overlay', () => {
    render(<AssignProjectPopup {...mockProps} />);
    const overlay = screen.getByRole('presentation');
    fireEvent.click(overlay);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('does not call onClose when clicking modal content', () => {
    render(<AssignProjectPopup {...mockProps} />);
    const modalContent = screen.getByText('Test Call').closest('div');
    fireEvent.click(modalContent!);
    expect(mockProps.onClose).not.toHaveBeenCalled();
  });

  it('renders project selection dropdown', () => {
    render(<AssignProjectPopup {...mockProps} />);
    expect(screen.getByLabelText('Proyecto a asignar:')).toBeInTheDocument();
    expect(screen.getByText('Seleccionar proyecto...')).toBeInTheDocument();
  });

  it('renders description textarea', () => {
    render(<AssignProjectPopup {...mockProps} />);
    expect(screen.getByLabelText('Descripción de la llamada:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe una descripción...')).toBeInTheDocument();
  });

  it('renders assign button', () => {
    render(<AssignProjectPopup {...mockProps} />);
    expect(screen.getByText('Asignar a proyecto')).toBeInTheDocument();
  });
}); 