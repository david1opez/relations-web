import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../../components/dialog/Dialog';

describe('Dialog Component', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Test Dialog',
    message: 'Test Message'
  };

  beforeEach(() => {
    mockProps.onClose.mockClear();
    mockProps.onConfirm.mockClear();
  });

  it('does not render when isOpen is false', () => {
    render(<Dialog {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
  });

  it('renders title and message', () => {
    render(<Dialog {...mockProps} />);
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders JSX message', () => {
    const jsxMessage = <div>JSX Message</div>;
    render(<Dialog {...mockProps} message={jsxMessage} />);
    expect(screen.getByText('JSX Message')).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<Dialog {...mockProps} />);
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<Dialog {...mockProps} />);
    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);
    expect(mockProps.onConfirm).toHaveBeenCalled();
  });

  it('renders buttons with correct classes', () => {
    render(<Dialog {...mockProps} />);
    const cancelButton = screen.getByText('Cancelar');
    const confirmButton = screen.getByText('Confirmar');
    expect(cancelButton).toHaveClass('cancelButton');
    expect(confirmButton).toHaveClass('confirmButton');
  });

  it('renders title with correct class', () => {
    render(<Dialog {...mockProps} />);
    const title = screen.getByText('Test Dialog');
    expect(title).toHaveClass('title');
  });

  it('renders message with correct class', () => {
    render(<Dialog {...mockProps} />);
    const message = screen.getByText('Test Message');
    expect(message).toHaveClass('message');
  });
}); 