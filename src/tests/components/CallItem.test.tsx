import { render, screen, fireEvent } from '@testing-library/react';
import CallItem from '../../components/callItem/CallItem';

// Mock de las utilidades de fecha
jest.mock('@/utils/dateUtils', () => ({
  calcDuration: jest.fn().mockReturnValue('1 hora'),
  parseDate: jest.fn().mockReturnValue('01/01/2024'),
}));

describe('CallItem Component', () => {
  const mockCall = {
    callID: '123',
    title: 'Test Call',
    startTime: 1704124800000, // 2024-01-01T10:00:00
    endTime: 1704128400000,   // 2024-01-01T11:00:00
    attendees: ['John Doe', 'Jane Smith'],
    summary: 'Test summary'
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders call title', () => {
    render(<CallItem call={mockCall} onClick={mockOnClick} />);
    expect(screen.getByText('Test Call')).toBeInTheDocument();
  });

  it('renders attendees', () => {
    render(<CallItem call={mockCall} onClick={mockOnClick} />);
    expect(screen.getByText('Asistentes:')).toBeInTheDocument();
    expect(screen.getByText('John Doe, Jane Smith')).toBeInTheDocument();
  });

  it('renders date and duration', () => {
    render(<CallItem call={mockCall} onClick={mockOnClick} />);
    expect(screen.getByText('Fecha:')).toBeInTheDocument();
    expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('Duración:')).toBeInTheDocument();
    expect(screen.getByText('1 hora')).toBeInTheDocument();
  });

  it('renders phone icon', () => {
    render(<CallItem call={mockCall} onClick={mockOnClick} />);
    const phoneIcon = screen.getByRole('img', { name: 'phone' });
    expect(phoneIcon).toBeInTheDocument();
    expect(phoneIcon).toHaveStyle({ color: 'var(--light-gray)' });
  });

  it('calls onClick when details button is clicked', () => {
    render(<CallItem call={mockCall} onClick={mockOnClick} />);
    const detailsButton = screen.getByText('Ver detalles');
    fireEvent.click(detailsButton);
    expect(mockOnClick).toHaveBeenCalledWith('123');
  });

  it('shows "Sin asistentes" when attendees is undefined', () => {
    const callWithoutAttendees = { ...mockCall, attendees: undefined };
    render(<CallItem call={callWithoutAttendees} onClick={mockOnClick} />);
    expect(screen.getByText('Sin asistentes')).toBeInTheDocument();
  });

  it('renders all metadata items with correct icons', () => {
    render(<CallItem call={mockCall} onClick={mockOnClick} />);
    
    expect(screen.getByRole('img', { name: 'users' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'calendar' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'clock' })).toBeInTheDocument();
  });

  it('applies correct styles to metadata items', () => {
    render(<CallItem call={mockCall} onClick={mockOnClick} />);
    const durationMetadata = screen.getByText('Duración:').closest('div');
    expect(durationMetadata).toHaveClass('metadataMargin');
  });
}); 