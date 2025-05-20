import { render, screen, fireEvent } from '@testing-library/react';
import CallDetailsPopup from '@/components/CallComponent/CallDetailsPopup';

describe('CallDetailsPopup Component', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Call',
    attendees: ['John Doe', 'Jane Smith'],
    date: '01/01/2024',
    duration: '1 hora',
    transcript: '',
    chapters: [
      {
        title: 'Chapter 1',
        start_time: '00:00',
        paragraphs: [
          { time: '00:00', text: 'First paragraph' },
          { time: '00:30', text: 'Second paragraph' },
        ],
      },
    ],
    summary: 'Test summary',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders call details correctly', () => {
    render(<CallDetailsPopup {...mockProps} />);
    expect(screen.getByText('Test Call')).toBeInTheDocument();
    expect(screen.getByText('John Doe, Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('1 hora')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<CallDetailsPopup {...mockProps} />);
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking overlay', () => {
    render(<CallDetailsPopup {...mockProps} />);
    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('shows summary tab by default', () => {
    render(<CallDetailsPopup {...mockProps} />);
    expect(screen.getByText('Test summary')).toBeInTheDocument();
  });

  it('shows transcription when clicking transcription tab', () => {
    render(<CallDetailsPopup {...mockProps} />);
    const transcriptionTab = screen.getByText('Transcripción');
    fireEvent.click(transcriptionTab);
    expect(screen.getByText('Transcripción:')).toBeInTheDocument();
    expect(screen.getAllByText('Chapter 1')[0]).toBeInTheDocument();
    expect(screen.getByText(/First paragraph/)).toBeInTheDocument();
    expect(screen.getByText(/Second paragraph/)).toBeInTheDocument();
  });

  it('shows no summary message when summary is empty', () => {
    render(<CallDetailsPopup {...mockProps} summary="" />);
    expect(screen.getByText('No hay resumen disponible.')).toBeInTheDocument();
  });
}); 