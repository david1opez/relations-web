import { render, screen, fireEvent } from '@testing-library/react';
import CallComponent from '@/components/callItem/CallItem';
import { calcDuration, parseDate } from '@/utils/dateUtils';

// Mock de las funciones de utilidad
jest.mock('@/utils/dateUtils', () => ({
  calcDuration: jest.fn().mockReturnValue('1 hora'),
  parseDate: jest.fn().mockReturnValue('01/01/2024')
}));

describe('CallComponent', () => {
  const mockCall = {
    callID: '123',
    title: 'Test Call',
    attendees: ['John Doe', 'Jane Smith'],
    startTime: 1704124800000,
    endTime: 1704128400000,
    summary: 'Test summary'
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders call title', () => {
    render(<CallComponent call={mockCall} onClick={mockOnClick} />);
    expect(screen.getByText('Test Call')).toBeInTheDocument();
  });

  it('renders attendees', () => {
    render(<CallComponent call={mockCall} onClick={mockOnClick} />);
    expect(screen.getByText('John Doe, Jane Smith')).toBeInTheDocument();
  });

  it('renders date and duration', () => {
    render(<CallComponent call={mockCall} onClick={mockOnClick} />);
    expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('1 hora')).toBeInTheDocument();
  });

  it('renders phone icon', () => {
    render(<CallComponent call={mockCall} onClick={mockOnClick} />);
    const icon = screen.getByRole('img', { name: 'phone' });
    expect(icon).toBeInTheDocument();
  });

  it('calls onClick when details button is clicked', () => {
    render(<CallComponent call={mockCall} onClick={mockOnClick} />);
    const button = screen.getByText('Ver detalles');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledWith('123');
  });

  it('shows "Sin asistentes" when attendees is undefined', () => {
    const callWithoutAttendees = { ...mockCall, attendees: undefined };
    render(<CallComponent call={callWithoutAttendees} onClick={mockOnClick} />);
    expect(screen.getByText('Sin asistentes')).toBeInTheDocument();
  });
}); 