import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/input/Input';

describe('Input Component', () => {
  it('renders input with label', () => {
    const label = 'Test Label';
    render(<Input label={label} value="" onChange={() => {}} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('displays initial value', () => {
    const value = 'test value';
    render(<Input label="Test" value={value} onChange={() => {}} />);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = jest.fn();
    render(<Input label="Test" value="" onChange={handleChange} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('renders with correct input type', () => {
    render(<Input label="Test" value="" onChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('type', 'text');
  });
}); 